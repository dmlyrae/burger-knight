export const burgerActionsTypes = {
    'ADD_INGREDIENT': 'ADD_INGREDIENT', 
    'REMOVE_INGREDIENT': 'REMOVE_INGREDIENT', 
    'CREATE_RANDOM_BURGER': 'CREATE_RANDOM_BURGER', 
    'CLEAR_BURGER': 'CLEAR_BURGER',
    'CHANGE_ORDER_INGREDIENTS': 'CHANGE_ORDER_INGREDIENTS', 
}

export function addIngredient(addedIngredient) {
  return {
    type: burgerActionsTypes.ADD_INGREDIENT,
    payload: addedIngredient
  }
}

export function changeOrderIngredients(dragIndex,dropIndex) {
  return {
    type: burgerActionsTypes.CHANGE_ORDER_INGREDIENTS,
    payload: {
      dragIndex,
      dropIndex
    }
  }
}

export function removeIngredientAction(ingredientId) {
  return {
    type: burgerActionsTypes.REMOVE_INGREDIENT,
    payload: ingredientId
  }
} 

export function clearBurger() {
  return {
    type: burgerActionsTypes.CLEAR_BURGER,
  }
} 

export function createRandomBurger(ingredientsList) {
  return {
    type: burgerActionsTypes.CREATE_RANDOM_BURGER,
    payload: ingredientsList
  }
} 