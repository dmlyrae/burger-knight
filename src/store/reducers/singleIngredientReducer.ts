import { PayloadAction } from "@reduxjs/toolkit";
import { TCard } from "../../types/cards"
import { singleIngredientActionsTypes } from "../actions/singleIngredientActions"


type TIngredientDetails = {
  ingredientDetails: TCard | null;
  ingredientDetailsModalWindow: boolean;
}

const initialState:TIngredientDetails = {
  ingredientDetails: null,
  ingredientDetailsModalWindow: false,
}

export const singleIngredientReducer = (state = initialState, action:PayloadAction<any>) => {
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