import { TCard } from "../../types/cards"
import { TSingleIngredientActions, singleIngredientActionsTypes } from "../actions/singleIngredientActions"


type TIngredientDetails = {
	ingredientDetails: TCard | null;
	ingredientDetailsModalWindow: boolean;
}

export const initialState:TIngredientDetails = {
	ingredientDetails: null,
	ingredientDetailsModalWindow: false,
}

export const singleIngredientReducer = (state = initialState, action:TSingleIngredientActions) => {
	switch (action.type) {
		case singleIngredientActionsTypes.SET_INGREDIENT: {
			return {
				...state,
				ingredientDetails: action.payload,
				ingredientDetailsModalWindow: Boolean(action.payload),
			}
		}
		case singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW: {
			if (state.ingredientDetailsModalWindow) {
				return {
					ingredientDetails: null,
					ingredientDetailsModalWindow: false,
				}
			}
			return {
				...state,
				ingredientDetailsModalWindow: true,
			}
		}
		case singleIngredientActionsTypes.CLEAR_INGREDIENT: {
			console.log('clear ingredient')
			return {
				ingredientDetails: null,
				ingredientDetailsModalWindow: false,
			}
		}
		default: {
			return state
		}
	}
} 