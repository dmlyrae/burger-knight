import { AnyAction, MiddlewareAPI } from "@reduxjs/toolkit"
import { wssActionsNames, wssAllUrl, wssUrl } from "../../utils/data"
import { ISocketActions } from "../reducers/wssOrders"
import { refreshTokenAction } from "../actions/userActions"

const delay = 300;

type socketQueue = {
	lastRequest: number;
	getInterval: () => number;
}
const socketQueue:socketQueue = {
	lastRequest: Date.now() - delay,
	getInterval: function() {
		const now = Date.now();
		const interval = delay - (now - this.lastRequest); 
		return interval < 0 ? 0 : interval;
	},
}

export const socketMiddleware = (wssActions: ISocketActions , auth: boolean) => {
  return (store: MiddlewareAPI) => {

	let socket: WebSocket | null = null

	return (next: (i: AnyAction) => void) => (action: AnyAction) => {
		const { dispatch } = store;
		const { type, payload } = action;
		const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wssActions;


		if (type === wssActionsNames.INIT) {
			socket = new WebSocket(wssAllUrl);
		} 

		const accessToken = sessionStorage.getItem('token');

		if (type === wssActionsNames.AUTH_INIT && accessToken) {
			socket = new WebSocket(`${wssUrl}?token=${accessToken.split(' ')[1]}`);
		} 

		if (socket) {
			socket.onopen = () => {
				dispatch(onOpen())
			}
			socket.onclose = () => {
				dispatch(onClose())
			}
			socket.onerror = () => {
				dispatch(onError("Connection Error"))
			}
			socket.onmessage = async (event) => {
				const { data } = event;
				const { success, ...restData } = JSON.parse(data);
				if (!success) {
					const refreshToken = localStorage.getItem('token');
					if (refreshToken) {
						refreshTokenAction(refreshToken)(dispatch)
					}
				} else {
					dispatch(onMessage(JSON.parse(data)));
				}
			}
			if (type === wssActionsNames.SEND_MESSAGE) {
				const message = accessToken ? { ...payload, token: accessToken } : { ...payload };
				const now = Date.now();
				if (now - socketQueue.lastRequest < delay) {
					socket.send(JSON.stringify(message));
				} else {
					const interval = socketQueue.getInterval();
					(function(interval:number,msg:string){
						const timerId = setTimeout(function(){
							clearTimeout(timerId);
							socket?.send(JSON.stringify(msg))	
						}, interval)
					})(interval,message);
					socketQueue.lastRequest = now;
				}
			}
		}

		next(action);
	}
  	}
}