import burgerApi from "../../utils/burger-api"
import { AppDispatch } from ".."
import { errorMessage, typedAction } from "../../types/commonTypes"
import { TCard } from "../../types/cards"

export const ingredientsActionsTypes = {
	'FETCH_INGREDIENTS_REQUEST': 'FETCH_INGREDIENTS_REQUEST',
	'FETCH_INGREDIENTS_ERROR': 'FETCH_INGREDIENTS_ERROR',
	'FETCH_INGREDIENTS_SUCCESS': 'FETCH_INGREDIENTS_SUCCESS',
} as const;

interface IFetchIngredients {
	(): (dispatch: AppDispatch) => Promise<void>
}
export const fetchIngredients:IFetchIngredients = function() {
	return async function(dispatch:AppDispatch) {
		dispatch(typedAction( ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST ))
		try {
			const data = await burgerApi.getIngredients();
			dispatch({
					type: ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS,
					payload: data,
			})
		} catch (e:unknown | Error) {
			dispatch({
				type: ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR,
				payload: errorMessage(e),
			})
		}
	}
}

export type TIngredientsActions = {
	type: typeof ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR;
	payload: string;
} | {
	type: typeof ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS;
	payload: TCard[];
} | {
	type: typeof ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST;
	payload: undefined;
}
