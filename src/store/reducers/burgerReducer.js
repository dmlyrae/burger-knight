import { burgerActionsTypes } from '../actions/burgerActions'

const getTotalPrice = (burgerIngredients) => burgerIngredients.reduce((result,currentIngredient) => {
			return result + currentIngredient.price
		}, 0)

export const initialState = {
	burgerIngredients: [],
	totalPrice: 0,
}

export const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case burgerActionsTypes.CHANGE_ORDER_INGREDIENTS: {
			const {dragIndex, dropIndex} = action.payload;
			const dragElement = {...state.burgerIngredients[dragIndex]}
			let burgerIngredients;
			if (dragIndex > dropIndex )	 {
				burgerIngredients = state.burgerIngredients
					.slice(0, dropIndex + 1) 
					.concat(state.burgerIngredients.slice(dropIndex,dragIndex))
					.concat(state.burgerIngredients.slice(dragIndex + 1))
				burgerIngredients[dropIndex] = dragElement
			} else {
				burgerIngredients = state.burgerIngredients
					.slice(0, dragIndex) 
					.concat(state.burgerIngredients.slice(dragIndex + 1,dropIndex))
					.concat([dragElement])
					.concat(state.burgerIngredients.slice(dropIndex))
			}
			return {
				...state,
				burgerIngredients
			}
		}
		case burgerActionsTypes.ADD_INGREDIENT: {
			const newIngredient = action.payload
			newIngredient.id = state.burgerIngredients.length;
			const innerburgerIngredients = state.burgerIngredients.filter(ingredient => ingredient.type !== 'bun')
			const bun = state.burgerIngredients.find(ingredient => ingredient.type === 'bun')
			const burgerIngredients = (newIngredient.type === 'bun' ?  
					[newIngredient, ...innerburgerIngredients, newIngredient] 
					: bun ?
						[bun, ...innerburgerIngredients, newIngredient, bun] 
						:
						[...innerburgerIngredients, newIngredient])
			return {
				...state,
				burgerIngredients,
				totalPrice: getTotalPrice(burgerIngredients),
			}
		}
		case burgerActionsTypes.REMOVE_INGREDIENT: {
			const burgerIngredients = state.burgerIngredients
				.filter((_,i) => i !== action.payload)
			return {
				...state,
				burgerIngredients,
				totalPrice: getTotalPrice(burgerIngredients),
			}
		}
		case burgerActionsTypes.CLEAR_BURGER: {
			return {
				...state,
				burgerIngredients: [],
				totalPrice: 0,
			}
		}
		case burgerActionsTypes.CREATE_RANDOM_BURGER: {
			if (!Array.isArray(action.payload)) return state;
			let burgerIngredients = [];
			const {bun,sauce,main} = action.payload.reduce((result,ingredient) => {
				result[ingredient.type].push(ingredient);
				return result
			}, {bun:[], sauce: [], main: []})
			for(let i = 0; i < 3; i++) {
				burgerIngredients.push(
					main[Math.floor(Math.random() * main.length)]
				)
				burgerIngredients.push(
					sauce[Math.floor(Math.random() * sauce.length)]
				)
			}
			const bunElement = bun[Math.floor(Math.random() * bun.length)]
			burgerIngredients.unshift(bunElement)
			burgerIngredients.push(bunElement)
			return {
				...state,
				burgerIngredients,
				totalPrice: getTotalPrice(burgerIngredients),
			}
		}
		default:{
			return state;
			//throw new Error(`Wrong type of action: ${action.type}`);
		}
	}
}