import { PayloadAction } from "@reduxjs/toolkit"
import { orderActionsTypes } from "../actions/orderActions"
import { TCard } from "../../types/cards";


type TInitialState = {
  orderSend: boolean,
  orderSendError: boolean,
	orderDetails: TOrderDetails,
  orderModalOpen: boolean,
}

export type TOrderDetails = {
  name: string;
  order: {
    number: number,
  }
}

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

export const orderReducer = (state = initialState, action: PayloadAction<any>):TInitialState => {
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
      const payload = action.payload as TOrderDetails;
      if (!payload.name) return state;
      return { 
        ...state, 
        orderDetails: {
          ...state.orderDetails,
          ...payload,
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