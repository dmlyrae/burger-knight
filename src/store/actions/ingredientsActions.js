import { getIngredients } from "../../utils/burger-api"

export const ingredientsActionsTypes = {
    'FETCH_INGREDIENTS_REQUEST': 'FETCH_INGREDIENTS_REQUEST',
    'FETCH_INGREDIENTS_ERROR': 'FETCH_INGREDIENTS_ERROR',
    'FETCH_INGREDIENTS_SUCCESS': 'FETCH_INGREDIENTS_SUCCESS',
}

export function fetchIngredients() {
  return async function(dispatch) {
    dispatch({
        type: ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST
    })
    try {
      const data = await getIngredients();
      dispatch({
          type: ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS,
          payload: data,
      })
    } catch (e) {
        dispatch({
          type: ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR,
          payload: e.message,
        })
    }
  }
} 