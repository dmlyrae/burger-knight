import { sendOrderRequest } from "../../utils/burger-api";
import { burgerActionsTypes } from "./burgerActions";

export const orderActionsTypes = {
	'SEND_ORDER_REQUEST': 'SEND_ORDER_REQUEST', 
	'SEND_ORDER_ERROR': 'SEND_ORDER_ERROR', 
	'SEND_ORDER_SUCCESS': 'SEND_ORDER_SUCCESS', 
	'CLEAR_ORDER': 'CLEAR_ORDER', 
	'TOGGLE_ORDER_MODAL': 'TOGGLE_ORDER_MODAL',
}

export function sendOrderAction(order, token) {
  return async function(dispatch) {
	dispatch({
		type: orderActionsTypes.SEND_ORDER_REQUEST
	})
	try {
		const data = await sendOrderRequest({
				ingredients: order.map((ingredient) => ingredient._id),
			}, 
			token
		)
		dispatch({ 
			type: burgerActionsTypes.CLEAR_BURGER 
		})
		dispatch({
			type: orderActionsTypes.SEND_ORDER_SUCCESS,
			payload: data,
		})
	} catch (e) {
		dispatch({
		  type: orderActionsTypes.SEND_ORDER_ERROR,
		  payload: e.message
		})
	}
  }
} 

export function toggleOrderModal() {
	return {
		type: orderActionsTypes.TOGGLE_ORDER_MODAL
	}
}

export function clearOrder() {
	return {
		type: orderActionsTypes.CLEAR_ORDER
	}
}