import { TCard } from "../../types/cards"

export const singleIngredientActionsTypes = {
		'SET_INGREDIENT': 'SET_INGREDIENT', 
		'INGREDIENT_TOGGLE_WINDOW': 'INGREDIENT_TOGGLE_WINDOW', 
		'CLEAR_INGREDIENT': 'CLEAR_INGREDIENT', 
} as const;

export function setIngredient(ingredient:TCard) {
	return {
		type: singleIngredientActionsTypes.SET_INGREDIENT,
		payload: ingredient
	}
}
export function ingredientToggleWindow() {
	return {
		type: singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW
	}
}

export function clearCurrentIngredient() {
	return {
		type: singleIngredientActionsTypes.CLEAR_INGREDIENT,
	}
}

export type TSingleIngredientActions = 
	ReturnType<typeof ingredientToggleWindow> |
	ReturnType<typeof clearCurrentIngredient> | 
	{
		type: typeof singleIngredientActionsTypes.SET_INGREDIENT;
		payload: TCard;
	};