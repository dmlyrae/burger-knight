import { burgerActionsTypes } from '../actions/burgerActions'

const getTotalPrice = (ingredients) => ingredients.reduce((result,currentIngredient) => {
			return result + currentIngredient.price
		}, 0)

export const burgerInitialState = {
	ingredients: [],
	total: 0,
	orderDetails: {
		name: '',
		order: {
			number: 0,
		},
		ingredients: [],
		error: false,
	},
}

const burgerReducer = (state, action) => {
  switch (action.type) {
	case burgerActionsTypes.ADD_INGREDIENT: {
		const newIngredient = action.payload
		const innerIngredients = state.ingredients.filter(ingredient => ingredient.type !== 'bun')
		const bun = state.ingredients.find(ingredient => ingredient.type === 'bun')
		const ingredients = newIngredient.type === 'bun' ?  
				[newIngredient, ...innerIngredients, newIngredient] 
				: bun ?
					[bun, ...innerIngredients, newIngredient, bun] 
					:
					[...innerIngredients, newIngredient]
		return {
			...state,
			ingredients,
			totalPrice: getTotalPrice(ingredients),
		}
	}
	case burgerActionsTypes.REMOVE_INGREDIENT: {
		const ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload)
		return {
			...state,
			ingredients,
			totalPrice: getTotalPrice(ingredients),
		}
	}
	case burgerActionsTypes.SET_INGREDIENTS_LIST: {
		if (!Array.isArray(action.payload)) return state;
		const innerIngredients = action.payload.filter(ingredient => ingredient.type !== 'bun')
		const bun = action.payload.find(ingredient => ingredient.type === 'bun')
		const ingredients = bun ?  [bun, ...innerIngredients, bun] : innerIngredients
		return {
			...state,
			ingredients,
			totalPrice: getTotalPrice(ingredients),
		}
	}
	case burgerActionsTypes.FILL_ORDER: 
		return { 
			...state,
			orderDetails: {
				...state.orderDetails,
				name: action.payload.name,
				order: action.payload.order,
				ingredients: state.ingredients.reduce((list, ingredient) => [...list, ingredient._id], []),
				error: action.payload.error ?? false,
			}
		}
	default:
	  throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export default burgerReducer;