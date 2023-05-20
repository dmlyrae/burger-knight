import { ingredientsActionsTypes } from "../actions/ingredientsActions";

const initialState = {
  ingredientsLoading: false,
  ingredientsError: false,
  ingredients: [],
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ingredientsActionsTypes.FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsLoading: true,
        ingredientsError: false,
      }
    }
    case ingredientsActionsTypes.FETCH_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingredients: action.payload, 
        ingredientsLoading: false,
      }
    }
    case ingredientsActionsTypes.FETCH_INGREDIENTS_ERROR: {
      return { 
        initialState, 
        ingredientsError: action.payload, 
        ingredientsLoading: false,
      }
    }
    default: {
      return state
    }
  }
} 