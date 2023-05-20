export const singleIngredientActionsTypes = {
    'SET_INGREDIENT': 'SET_INGREDIENT', 
    'INGREDIENT_TOGGLE_WINDOW': 'INGREDIENT_TOGGLE_WINDOW', 
    'CLEAR_INGREDIENT': 'CLEAR_INGREDIENT', 
}

export function setIngredient(ingredient) {
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