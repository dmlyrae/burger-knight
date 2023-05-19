import { singleIngredientActionsTypes } from "../actions/singleIngredientActions"

const initialState = {
  ingredientDetails: null,
  ingredientDetailsModalWindow: false,
}

export const singleIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case singleIngredientActionsTypes.SET_INGREDIENT: {
      return {
        ...state,
        ingredientDetails: action.payload,
      }
    }
    case singleIngredientActionsTypes.INGREDIENT_TOGGLE_WINDOW: {
      if (state.ingredientDetailsModalWindow) {
        return {
          ingredientDetails: undefined,
          ingredientDetailsModalWindow: false,
        }
      }
      return {
        ...state,
        ingredientDetailsModalWindow: true,
      }
    }
    case singleIngredientActionsTypes.CLEAR_INGREDIENT: {
      return {
        ...state,
        ingredientDetails: undefined
      }
    }
    default: {
      return state
    }
  }
} 