import { TSingleIngredientActions, singleIngredientActionsTypes } from "../actions/singleIngredientActions"
import { singleIngredientReducer, initialState  } from "./singleIngredientReducer"
import { createDefaultIngredient } from "../../utils/data"

describe(`${singleIngredientReducer.name} test`, () => {

	const ingredient = createDefaultIngredient("main");

	it(`${singleIngredientReducer.name} default state test`, () => {
		expect(singleIngredientReducer(undefined, {} as TSingleIngredientActions))
			.toEqual(
				initialState
			)
	})

	it(singleIngredientActionsTypes.SET_INGREDIENT, () => {
		expect(
			singleIngredientReducer(initialState, {
				type: singleIngredientActionsTypes.SET_INGREDIENT,
				payload: ingredient,
			})
		).toEqual({
			ingredientDetails: ingredient,
			ingredientDetailsModalWindow: true,
		})
	})


	it(singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW, () => {

		const stateClose = {
			ingredientDetails: ingredient,
			ingredientDetailsModalWindow: false,
		}

		const stateOpen = {
			ingredientDetails: ingredient,
			ingredientDetailsModalWindow: true,
		}

		expect(
			singleIngredientReducer(stateClose, {
				type: singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW,
			})
		).toEqual({
			...stateClose,
			ingredientDetailsModalWindow: true,
		})

		expect(
			singleIngredientReducer(stateOpen, {
				type: singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW,
			})
		).toEqual({
			ingredientDetailsModalWindow: false,
			ingredientDetails: null,
		})
	})
	it(singleIngredientActionsTypes.CLEAR_INGREDIENT, () => {
		const state = {
			ingredientDetailsModalWindow: true,
			ingredientDetails: ingredient,
		} 
		expect(
			singleIngredientReducer(state, {
				type: singleIngredientActionsTypes.CLEAR_INGREDIENT
			})
		).toEqual({
			ingredientDetails: null,
			ingredientDetailsModalWindow: false,
		})

	})
})