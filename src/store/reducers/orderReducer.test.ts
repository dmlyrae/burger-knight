import { PayloadAction } from "@reduxjs/toolkit"
import { getTestOrdersResponse } from "../../utils/data"
import { TOrderActions, orderActionsTypes } from "../actions/orderActions"
import { orderReducer, initialState, TOrderDetails  } from "./orderReducer"
import { v4 as uuid } from "uuid"


describe(`${orderReducer.name} tests`, () => {

	it(`${orderReducer.name} default state test`, () => {
		expect(
			orderReducer(initialState, {} as TOrderActions)
		).toBe(initialState)
	})

	it(orderActionsTypes.SEND_ORDER_REQUEST, () => {
		expect(
			orderReducer(initialState, {
				type: orderActionsTypes.SEND_ORDER_REQUEST,
			})
		).toEqual({
			...initialState,
		   orderSend: true, 
		})
	})

	it(orderActionsTypes.SEND_ORDER_ERROR, () => {
		expect(
			orderReducer(initialState, {
				type: orderActionsTypes.SEND_ORDER_ERROR,
				payload: "test error message",
			})
		).toEqual({
			...initialState,
			orderSend: false,
			orderSendError: "test error message"
		})
	})

	it(orderActionsTypes.SEND_ORDER_SUCCESS, () => {

		const orderSendResponse:TOrderDetails = {
			name: uuid(),
			order: getTestOrdersResponse(1)["orders"][0]
		}

		expect(
			orderReducer(initialState, {
				type: orderActionsTypes.SEND_ORDER_SUCCESS,
				payload: orderSendResponse,
			})
		).toEqual({
			...initialState,
			orderDetails: {
				...initialState.orderDetails,
				...orderSendResponse,
			},
			orderSend: false,
			orderSendError: false,
			orderModalOpen: true,
		})
	})

	it(orderActionsTypes.TOGGLE_ORDER_MODAL, () => {
		expect(
			orderReducer({...initialState, orderModalOpen: true}, {
				type: orderActionsTypes.TOGGLE_ORDER_MODAL
			})
		).toEqual({
			...initialState,
			orderModalOpen: false,
		})
	})

})