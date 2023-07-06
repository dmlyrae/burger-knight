import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { singleIngredientReducer } from "./singleIngredientReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    singleIngredient: singleIngredientReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>