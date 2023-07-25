import { Action, ActionCreator } from "redux";
import { TCard } from "../../types/cards";
import { TDispatchAction, errorMessage, typedAction } from "../../types/commonTypes";
import burgerApi from "../../utils/burger-api";
import { burgerActionsTypes } from "./burgerActions";
import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { TOrderDetails } from "../reducers/orderReducer";

export const orderActionsTypes = {
	'SEND_ORDER_REQUEST': 'SEND_ORDER_REQUEST', 
	'SEND_ORDER_ERROR': 'SEND_ORDER_ERROR', 
	'SEND_ORDER_SUCCESS': 'SEND_ORDER_SUCCESS', 
	'CLEAR_ORDER': 'CLEAR_ORDER', 
	'TOGGLE_ORDER_MODAL': 'TOGGLE_ORDER_MODAL',
} as const;

interface ISendOrderAction {
	(arg0:TCard[], arg1:string): TDispatchAction;
}
export const sendOrderAction:ISendOrderAction = function(order, token) {
  return async function(dispatch) {
	dispatch(typedAction(orderActionsTypes.SEND_ORDER_REQUEST))
	try {
		const data = await burgerApi.sendOrderRequest({
				ingredients: order.map((ingredient) => ingredient._id),
			}, 
			token
		)
		dispatch(typedAction(burgerActionsTypes.CLEAR_BURGER))
		dispatch({
			type: orderActionsTypes.SEND_ORDER_SUCCESS,
			payload: data,
		})
	} catch (e:unknown | Error) {
		dispatch({
		  type: orderActionsTypes.SEND_ORDER_ERROR,
		  payload: errorMessage(e)
		})
	}
  }
} 

interface IToggleOrderModal {
	(): PayloadAction<undefined, keyof typeof orderActionsTypes>
}
export const toggleOrderModal:IToggleOrderModal = function() {
	return typedAction(orderActionsTypes.TOGGLE_ORDER_MODAL)
}

interface IClearOrder {
	(): PayloadAction<undefined, keyof typeof orderActionsTypes>
}
export const clearOrder:IClearOrder = function() {
	return typedAction(orderActionsTypes.CLEAR_ORDER)
}

export type TOrderActions = {
	type: typeof orderActionsTypes.SEND_ORDER_REQUEST;
} | {
	type: typeof orderActionsTypes.SEND_ORDER_ERROR;
	payload: string;
} | {
	type: typeof orderActionsTypes.CLEAR_ORDER;
} | {
	type: typeof orderActionsTypes.SEND_ORDER_SUCCESS;
	payload: TOrderDetails;
} | {
	type: typeof orderActionsTypes.TOGGLE_ORDER_MODAL;
}
