import { Dispatch } from "react"
import { getIngredients } from "../../utils/burger-api"
import { Action, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from ".."
import { errorMessage, typedAction } from "../../types/commonTypes"

export const ingredientsActionsTypes = {
	'FETCH_INGREDIENTS_REQUEST': 'FETCH_INGREDIENTS_REQUEST',
	'FETCH_INGREDIENTS_ERROR': 'FETCH_INGREDIENTS_ERROR',
	'FETCH_INGREDIENTS_SUCCESS': 'FETCH_INGREDIENTS_SUCCESS',
}

interface IFetchIngredients {
	(): (dispatch: AppDispatch) => Promise<void>
}

export const fetchIngredients:IFetchIngredients = function() {
	return async function(dispatch:AppDispatch) {
		dispatch(typedAction( ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST ))
		try {
			const data = await getIngredients();
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