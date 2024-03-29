import { TCard } from "../../types/cards"

export const burgerActionsTypes = {
    'ADD_INGREDIENT': 'ADD_INGREDIENT', 
    'REMOVE_INGREDIENT': 'REMOVE_INGREDIENT', 
    'CREATE_RANDOM_BURGER': 'CREATE_RANDOM_BURGER', 
    'CLEAR_BURGER': 'CLEAR_BURGER',
    'CHANGE_ORDER_INGREDIENTS': 'CHANGE_ORDER_INGREDIENTS', 
} as const;

export function addIngredient(addedIngredient:TCard) {
  return {
    type: burgerActionsTypes.ADD_INGREDIENT,
    payload: addedIngredient
  }
}

export function changeOrderIngredients(dragIndex:number,dropIndex:number) {
  return {
    type: burgerActionsTypes.CHANGE_ORDER_INGREDIENTS,
    payload: {
      dragIndex,
      dropIndex
    }
  }
}

export function removeIngredientAction(ingredientId:number) {
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

export function createRandomBurger(ingredientsList:TCard[]) {
  return {
    type: burgerActionsTypes.CREATE_RANDOM_BURGER,
    payload: ingredientsList
  }
} 

export type burgerReducerActions = ReturnType<typeof createRandomBurger> |
  ReturnType<typeof createRandomBurger> |
  ReturnType<typeof clearBurger> |
  ReturnType<typeof removeIngredientAction> |
  ReturnType<typeof changeOrderIngredients> |
  ReturnType<typeof addIngredient>;

