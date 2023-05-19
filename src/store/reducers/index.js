import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { singleIngredientReducer } from "./singleIngredientReducer";


export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    singleIngredient: singleIngredientReducer,
})