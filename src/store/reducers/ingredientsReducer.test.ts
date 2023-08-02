import { ingredientsReducer, initialState } from "./ingredientsReducer"
import { TIngredientsActions, ingredientsActionsTypes } from "../actions/ingredientsActions";
import { createDefaultIngredient } from "../../utils/data";

describe(`${ingredientsReducer.name} tests`, () => {

	it(`${ingredientsReducer.name} default state test`, () => {
		expect(
			ingredientsReducer(initialState, {} as TIngredientsActions)
		).toBe(initialState)
	})

	it(ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST, () => {
		expect(
			ingredientsReducer(initialState, {
				type: ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST,
				payload: undefined,
			})
		).toEqual({
			...initialState,
		   ingredientsLoading: true, 
		})
	})

	it(ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR, () => {
		expect(
			ingredientsReducer(initialState, {
				type: ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR,
				payload: "test error message",
			})
		).toEqual({
			...initialState,
			ingredientsLoading: false,
			ingredientsError: "test error message"
		})
	})

	it(ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS, () => {
		const ingredientsResponse = Array(5)
			.fill(undefined)
			.map(() => createDefaultIngredient("sauce") )
			.concat(createDefaultIngredient("bun"))

		expect(
			ingredientsReducer(initialState, {
				type: ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS,
				payload: ingredientsResponse,
			})
		).toEqual({
			...initialState,
			ingredientsLoading: false, 
			ingredients: ingredientsResponse,
		})
	})

})