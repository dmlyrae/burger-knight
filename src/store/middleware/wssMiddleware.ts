import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';
import { wssActionsNames } from '../../utils/data';
import { getCookie } from '../../utils/cookie';
import { ISocketActions } from '../reducers/socketReducer';

export const socketMiddleware = (wsUrl: string, wssActions: ISocketActions , auth: boolean) => {
  return (store: MiddlewareAPI) => {

	let socket: WebSocket | null = null

	return (next: (i: AnyAction) => void) => (action: AnyAction) => {
		const { dispatch } = store;
		const { type, payload } = action;
		const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wssActions;

		const accessToken = sessionStorage.getItem('token');
		//const refreshToken = localStorage.getItem('token');

		if (type === wssActionsNames.INIT) {
			socket = new WebSocket(`wss://norma.nomoreparties.space/orders/all`);
		} 

		if (type === wssActionsNames.AUTH_INIT && accessToken) {
			socket = new WebSocket(`${wsUrl}?token=${accessToken.split(' ')[1]}`);
		} 

		if (socket) {
			socket.onopen = () => {
				dispatch(onOpen())
			}
			socket.onclose = () => {
				dispatch(onClose())
			}
			socket.onerror = () => {
				dispatch(onError())
			}
			socket.onmessage = async (event) => {
				const { data } = event;
				const { success, ...restData } = JSON.parse(data);
				//console.log('restData', restData)
				dispatch(onMessage(JSON.parse(data)));
			}
			if (type === wssActionsNames.SEND_MESSAGE) {
				const message = accessToken ? { ...payload, token: accessToken } : { ...payload };
				socket.send(JSON.stringify(message));
			}
		}

		next(action);
	}
  	}
}