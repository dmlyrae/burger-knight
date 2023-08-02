import { PayloadAction } from "@reduxjs/toolkit"
import reducer, { singleOrderSlice } from "./singleOrderReducer"
import { getTestOrdersResponse } from "../../utils/data"

describe(`${reducer.name} tests`, () => {

	it(`${reducer.name} default state test`, () => {
		expect(reducer(undefined, {} as PayloadAction)).toEqual(
			{order: null}
		)
	})

    const order = getTestOrdersResponse(1)["orders"][0];

	it(singleOrderSlice.actions.openOrder.name, () => {
		expect(reducer({order: null}, singleOrderSlice.actions.openOrder(order)))
        .toEqual({order})
	})

	it(singleOrderSlice.actions.closeOrder.name, () => {
		expect(reducer({order}, singleOrderSlice.actions.closeOrder()))
        .toEqual({order: null})
	})

})