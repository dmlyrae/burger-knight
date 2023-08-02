import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";
import { singleIngredientReducer } from "./singleIngredientReducer";
import { userReducer } from "./userReducer";
import wssOrders from "./wssOrders";
import singleOrderReducer from "./singleOrderReducer";

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	singleIngredient: singleIngredientReducer,
	user: userReducer,
	wssOrders: wssOrders, 
	singleOrder: singleOrderReducer,
})

export type RootState = ReturnType<typeof rootReducer>