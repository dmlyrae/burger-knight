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

		if (type === wssActionsNames.INIT || type === wssActionsNames.AUTH_INIT) {
			socket = accessToken ? new WebSocket(`${wsUrl}?token=${accessToken.split(' ')[1]}`) : new WebSocket(`${wsUrl}`);
		}

		if (socket) {
			socket.onopen = () => {
				dispatch(onOpen());
			}
			socket.onerror = () => {
				dispatch(onError());
			}
			socket.onmessage = async (event) => {
				const { data } = event;
				const { success, ...restParsedData } = JSON.parse(data);
				dispatch(onMessage(JSON.parse(data)));
			}
			socket.onclose = () => {
				dispatch(onClose());
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