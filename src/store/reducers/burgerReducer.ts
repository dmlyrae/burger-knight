import { PayloadAction } from '@reduxjs/toolkit';
import { IBurgerIngredients, TCard } from '../../types/cards';
import { burgerActionsTypes, burgerReducerActions } from '../actions/burgerActions'

type getTotalPrice = {
	(ingredients: IBurgerIngredients['cards']): number,
}

const getTotalPrice:getTotalPrice = (burgerIngredients) => burgerIngredients.reduce((result,currentIngredient) => {
			return result + currentIngredient.price
		}, 0)

interface IInitialState {
	burgerIngredients: TCard[];
	totalPrice: number;
} 

export const initialState:IInitialState = {
	burgerIngredients: [],
	totalPrice: 0,
}

type TBurgerConstructorTypes = keyof typeof burgerActionsTypes;

interface TBurgerConstructorActions {
	type: TBurgerConstructorTypes,
	payload: {dragIndex:number, dropIndex:number} | number; 
}

export const burgerConstructorReducer = (state = initialState, action: burgerReducerActions) => {
	switch (action.type) {
		case burgerActionsTypes.CHANGE_ORDER_INGREDIENTS: {
			const {dragIndex, dropIndex} = action.payload;
			const dragElement = {...state.burgerIngredients[dragIndex]}
			if (dragElement.type === "bun") return state;
			const burgerIngredients = [...state.burgerIngredients];
			burgerIngredients.splice(dragIndex, 1);
			burgerIngredients.splice(dropIndex, 0, dragElement);
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
			let burgerIngredients:TCard[] = [];
			const {bun,sauce,main} = action.payload.reduce((result:{bun:TCard[], sauce: TCard[], main: TCard[]},ingredient) => {
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