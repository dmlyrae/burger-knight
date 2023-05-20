import { orderActionsTypes } from "../actions/orderActions"

const initialState = {
  orderSend: false,
  orderSendError: false,
	orderDetails: {
		name: '',
		order: {
			number: 0,
		},
	},
  orderModalOpen: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActionsTypes.TOGGLE_ORDER_MODAL: {
      return {
        ...state,
        orderModalOpen: !state.orderModalOpen,
      } 
    }
    case orderActionsTypes.SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderSend: true,
        orderSendError: false,
        orderModalOpen: false,
      }
    }
    case orderActionsTypes.SEND_ORDER_SUCCESS: {
      return { 
        ...state, 
        orderDetails: {
          ...state.orderDetails,
          number: action.payload,
          name: action.payload.name,
          order: action.payload.order,
        },
        orderSend: false,
        orderSendError: false,
        orderModalOpen: true,
      }
    }
    case orderActionsTypes.SEND_ORDER_ERROR: {
      return { 
        ...state,
        orderSend: false,
        orderSendError: action.payload,
      }
    }
    default: {
      return state
    }
  }
} 