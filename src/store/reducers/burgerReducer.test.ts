import { createDefaultIngredient } from "../../utils/data"
import { burgerConstructorReducer, initialState } from "./burgerReducer"
import { burgerActionsTypes, burgerReducerActions } from '../actions/burgerActions';

describe('burgerConstructorIngredients reducer', () => {
 
	it('default state', () => {
		expect(
			burgerConstructorReducer(undefined, {} as burgerReducerActions)
		).toEqual(initialState);
	})

	it("add bun", () => {
		const bun = createDefaultIngredient("bun") 

		expect(
			burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.ADD_INGREDIENT,
				payload: bun,
			})['burgerIngredients'][0]
		).toEqual(bun)

		expect(
			burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.ADD_INGREDIENT,
				payload: bun,
			})['burgerIngredients'].at(-1)
		).toEqual(bun)

	})

	it("add sauce/main", () => {

		const sauce = createDefaultIngredient("sauce") 
		const state = burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.ADD_INGREDIENT,
				payload: sauce,
			});
		expect(state.burgerIngredients).toContainEqual(sauce)
		expect(state.totalPrice).toBe( state.burgerIngredients.reduce( (sum, ingredient) => (sum + ingredient.price), 0 ))

	})


	it("clear", () => {
		const bun = createDefaultIngredient("bun");
		const sauce = createDefaultIngredient("sauce");
		const initialState = {
			burgerIngredients: [bun, sauce, bun],
			totalPrice: bun.price * 2 + sauce.price,
		}	
		expect(burgerConstructorReducer(initialState, {
			type: burgerActionsTypes.CLEAR_BURGER,
		})).toEqual({
			burgerIngredients: [],
			totalPrice: 0,
		})
	})

	it("remove ingredient", () => {

		const type = ["sauce", "bun", "main"][Math.floor(Math.random() * 3)] as "sauce"|"bun"|"main";
		const addedIngredient = createDefaultIngredient(type);

		const index = burgerConstructorReducer(initialState, {
			type: burgerActionsTypes.ADD_INGREDIENT,
			payload: addedIngredient,
		}).burgerIngredients.findIndex( ingredient => ingredient._id === addedIngredient._id )

		expect(
			burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.REMOVE_INGREDIENT,
				payload: index
			})
		).not.toContainEqual(addedIngredient)

	})

	it("change order", () => {
		const bun = createDefaultIngredient("bun");
		const sauce = createDefaultIngredient("sauce");
		const main = createDefaultIngredient("sauce");
		const initialState = {
			burgerIngredients: [bun, sauce, main, bun],
			totalPrice: bun.price * 2 + sauce.price + main.price,
		}	
		expect(
			burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.CHANGE_ORDER_INGREDIENTS,
				payload: {
					dragIndex: 1,
					dropIndex: 2,
				}
			})["burgerIngredients"]
		).toEqual([ bun, main, sauce, bun ])

		expect(
			burgerConstructorReducer(initialState, {
				type: burgerActionsTypes.CHANGE_ORDER_INGREDIENTS,
				payload: {
					dragIndex: 0,
					dropIndex: 2,
				}
			})["burgerIngredients"]
		).toEqual([ bun, sauce, main, bun ])

	})

});