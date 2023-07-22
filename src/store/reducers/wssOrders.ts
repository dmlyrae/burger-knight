import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'
import { wssActionsNames } from "../../utils/data"
import { IOrder } from '../../types/orders'

export type TSockets = {
	wsConnection: boolean;
	wsConnectionAuth: boolean;
	orders: Array<IOrder>;
	ordersAuth: Array<IOrder>;
	total: number | null;
	totalToday: number | null;
}

export type TMessage = {
	total: number;
	totalToday: number;
	orders: Array<IOrder>;
}

export const initialState: TSockets = {
	wsConnection: false,
	orders: [],
	ordersAuth: [],
	total: null,
	totalToday: null,
	wsConnectionAuth: false,
}

export const wsInit = createAction(wssActionsNames.INIT)
export const wsSendAuthMessage = createAction<string>(wssActionsNames.SEND_AUTH_MESSAGE)
export const wsSendMessage = createAction<string>(wssActionsNames.SEND_MESSAGE)
export const wsAuthInit = createAction(wssActionsNames.AUTH_INIT)

const wssOrdersSlice = createSlice({
	name: 'wssOrders',
	initialState,
	reducers: {

		wsConnectionSuccess: (state: TSockets) => {
			state.wsConnection = true;
		},

		wsConnectionError: (state: TSockets) => {
			state.wsConnection = false;
		},

		wsConnectionClosed: (state: TSockets) => {
			state.wsConnection = false;
		},

		wsMessage: (state: TSockets, action: PayloadAction<TMessage>) => {
			const { total, totalToday, orders } = action.payload;
			//console.log('wsGetMessage', action.payload)
			state.total = total;
			state.totalToday = totalToday;
			state.orders = orders;
		},

		wsConnectionSuccessAuth: (state: TSockets) => {
			state.wsConnectionAuth = true;
		},

		wsConnectionErrorAuth: (state: TSockets) => {
			state.wsConnectionAuth = false;
		},

		wsConnectionClosedAuth: (state: TSockets) => {
			state.wsConnectionAuth = false;
		},

		wsMessageAuth: (state: TSockets, action: PayloadAction<TMessage>) => {
			const { orders } = action.payload;
			state.ordersAuth = orders;
		},

	},
})

export default wssOrdersSlice.reducer;

export interface ISocketActions {
	wsInit: ActionCreatorWithoutPayload<string>;
	wsSendMessage: ActionCreatorWithPayload<string, string>;
	onOpen: ActionCreatorWithoutPayload<string>;
	onClose: ActionCreatorWithoutPayload<string>;
	onError: ActionCreatorWithoutPayload<string>;
	onMessage: ActionCreatorWithPayload<any, string>;
}

export const wsActions: ISocketActions = {
	wsInit,
	onOpen: wssOrdersSlice.actions.wsConnectionSuccess,
	onClose: wssOrdersSlice.actions.wsConnectionClosed,
	onError: wssOrdersSlice.actions.wsConnectionError,
	onMessage: wssOrdersSlice.actions.wsMessage,
	wsSendMessage,
};

export const wsActionsAuth: ISocketActions = {
	wsInit: wsAuthInit,
	wsSendMessage: wsSendAuthMessage,
	onOpen: wssOrdersSlice.actions.wsConnectionSuccessAuth,
	onClose: wssOrdersSlice.actions.wsConnectionClosedAuth,
	onError: wssOrdersSlice.actions.wsConnectionErrorAuth,
	onMessage: wssOrdersSlice.actions.wsMessageAuth,
}