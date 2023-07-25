import { Action, PayloadAction } from "@reduxjs/toolkit";
import { TIngredientsActions, ingredientsActionsTypes } from "../actions/ingredientsActions";
import { TCard } from "../../types/cards";

interface IInitialState {
  ingredientsLoading: boolean,
  ingredientsError: boolean | string,
  ingredients: TCard[],
}

const initialState:IInitialState = {
  ingredientsLoading: false,
  ingredientsError: false,
  ingredients: [],
}

export const ingredientsReducer = (state:IInitialState = initialState, action:TIngredientsActions):IInitialState => {
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
        ...state, 
        ingredientsError: action.payload, 
        ingredientsLoading: false,
      }
    }
    default: {
      return state
    }
  }
} 