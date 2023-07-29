import { PayloadAction } from "@reduxjs/toolkit"
import wssSlice, { TWSActionsTypes, initialState } from "./wssOrders"
import { wsActions, wsActionsAuth } from "./wssOrders"
import { v4 as uuid } from "uuid"
import { getTestOrdersResponse } from "../../utils/data";

describe(`${wssSlice.name} state tests`, () => {

	it(`${wssSlice.name} default state test`, () => {
		expect(wssSlice(undefined, {} as PayloadAction)).toEqual(
			initialState
		)
	})

	it('open ws-connection with token', () => {
		expect(wssSlice(initialState, wsActionsAuth.onOpen)).toEqual({
			...initialState,
			wsConnection: false,
			wsConnectionAuth: true,
		})
	})

	it('open ws-connection', () => {
		expect(wssSlice(initialState, wsActions.onOpen)).toEqual({
			...initialState,
			wsConnection: true,
			wsConnectionAuth: false,
		})
	})

	it('onError', () => {
		const errorMessage = uuid()
		expect(wssSlice(initialState, wsActions.onError(errorMessage)))
		.toEqual({
			...initialState,
			errorMessage
		})
	})

	it('onMessage without auth', () => {
		const orderResponse = getTestOrdersResponse(12);
		const state = {
			...initialState,
			wsConnected: true,
			wsConnectedAuth: false,
		}
		expect(wssSlice(state, wsActions.onMessage(orderResponse)))
		.toEqual({
			...state,
			orders: orderResponse.orders,
			total: orderResponse.total,
			totalToday: orderResponse.totalToday,
		})
	})

	it('onMessage with auth', () => {
		const orderResponse = getTestOrdersResponse(12);
		const state = {
			...initialState,
			wsConnected: true,
			wsConnectedAuth: true,
		}
		expect(wssSlice(state, wsActionsAuth.onMessage(orderResponse)))
		.toEqual({
			...state,
			ordersAuth: orderResponse.orders,
		})
	})

	it("onClose", () => {
		expect(wssSlice(initialState, wsActions.onClose()))
		.toEqual({
			...initialState,
			wsConnection: false,
		})
	})

	it("onClose", () => {
		expect(wssSlice(initialState, wsActions.onClose()))
		.toEqual({
			...initialState,
			wsConnection: false,
		})
	})

});