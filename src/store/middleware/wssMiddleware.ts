import { AnyAction, MiddlewareAPI } from "@reduxjs/toolkit"
import { wssActionsNames, wssAllUrl, wssUrl } from "../../utils/data"
import { ISocketActions } from "../reducers/wssOrders"
import { refreshTokenAction } from "../actions/userActions"

const delay = 300;

type socketQueue = {
	lastRequest: number;
	getInterval: () => number;
}

export const socketMiddleware = function (wssActions: ISocketActions, auth: boolean) {
	
	const socketQueue:socketQueue = {
		lastRequest: Date.now() - delay,
		getInterval: function() {
			const now = Date.now();
			const interval = delay - (now - this.lastRequest); 
			return interval < 0 ? 0 : interval;
		}
	}

	let socket: WebSocket | null = null;

	return function (store: MiddlewareAPI) {

		return (next: (i: AnyAction) => void) => (action: AnyAction) => {
			const { dispatch: storeDispatch } = store;
			const { type, payload } = action;
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wssActions;

			if (type === wssActionsNames.INIT && !auth) {
				socket = new WebSocket(wssAllUrl);
			} 

			const accessToken = sessionStorage.getItem('token');

			if (type === wssActionsNames.AUTH_INIT && accessToken && auth) {
				socket = new WebSocket(`${wssUrl}?token=${accessToken.split(' ')[1]}`);
			} 

			if (socket) {
				socket.onopen = () => {
					storeDispatch(onOpen())
				}
				socket.onclose = () => {
					storeDispatch(onClose())
				}
				socket.onerror = () => {
					storeDispatch(onError("Connection Error"))
				}
				socket.onmessage = async (event) => {
					const { data } = event;
					const { success, ...restData } = JSON.parse(data);
					if (!success) {
						const refreshToken = localStorage.getItem('token');
						if (refreshToken) {
							refreshTokenAction(refreshToken)(storeDispatch)
						}
					} else {
						if (auth) {
							storeDispatch(onMessage(JSON.parse(data)))
						} else {
							storeDispatch(onMessage(JSON.parse(data)))
						}
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

