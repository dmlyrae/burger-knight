import { sendOrderFetch } from "../../utils/burger-api";

export const orderActionsTypes = {
    'SEND_ORDER_REQUEST': 'SEND_ORDER_REQUEST', 
    'SEND_ORDER_ERROR': 'SEND_ORDER_ERROR', 
    'SEND_ORDER_SUCCESS': 'SEND_ORDER_SUCCESS', 
    'CLEAR_ORDER': 'CLEAR_ORDER', 
    'TOGGLE_ORDER_MODAL': 'TOGGLE_ORDER_MODAL',
}

export function sendOrderAction(order) {
  return async function(dispatch) {
    dispatch({
        type: orderActionsTypes.SEND_ORDER_REQUEST
    })
    const {data, error} = await sendOrderFetch({
        ingredients: order.map((ingredient) => ingredient._id)
    });
    if (error) {
        dispatch({
          type: orderActionsTypes.SEND_ORDER_ERROR,
          payload: error
        })
        return;
    }
    dispatch({
        type: orderActionsTypes.SEND_ORDER_SUCCESS,
        payload: data,
    })
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