import { TUser, TUserResponse } from "../store/actions/userActions";
import { TCard } from "../types/cards";
import { v4 as uuid } from "uuid"
import { IOrder } from "../types/orders";

export const apiUrl = "https://norma.nomoreparties.space/api";
export const wssUrl = "wss://norma.nomoreparties.space/orders";
export const wssAllUrl = "wss://norma.nomoreparties.space/orders/all"; 
export const maxIngredientsInList = 4;

export enum wssActionsNames {
	INIT = 'INIT',
	AUTH_INIT = 'AUTH_INIT',
	SEND_MESSAGE = 'SEND_MESSAGE',
	SEND_AUTH_MESSAGE = 'SEND_AUTH_MESSAGE',
}


export const createTesUser = (username: string):TUser => ({
	name: username,
	email: `${username}@testmail.com`,
})

export const createTestUserResponse = (username: string):TUserResponse => ({
	accessToken: uuid(),
	refreshToken: uuid(), 
	user: createTesUser(username),
	message: "",
	success: true,
})

export const defaultData:TCard[]  = [
	{
		_id: uuid(),
		name: "Краторная булка N-200i",
		type: "bun",
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: "https://code.s3.yandex.net/react/code/bun-02.png",
		image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
		image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
		__v: 0,
		key: "",
	},
	{
		_id: uuid(),
		name: "Говяжий метеорит (отбивная)",
		type: "main",
		proteins: 800,
		fat: 800,
		carbohydrates: 300,
		calories: 2674,
		price: 3000,
		image: "https://code.s3.yandex.net/react/code/meat-04.png",
		image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
		image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
		__v: 0,
		key: "",
	},
];

let p,f,c;

export const createDefaultIngredient = (type: "bun" | "sauce" | "main"):TCard => ({
	_id: uuid(),
	"name": type,
	"type": type,
	"proteins": (p = Math.ceil(Math.random() * 100), p),
	"fat": (f = Math.ceil(Math.random() * (100 - p)), f),
	"carbohydrates": (c = Math.floor(100 - p - f), c),
	"calories": p * 100 + f * 900 + c * 400,
	"price": p * 100 + f * 1 + c * 50,
	"image": `https://code.s3.yandex.net/react/code/${type}-02.png`,
	"image_mobile": `https://code.s3.yandex.net/react/code/${type}-02-mobile.png`,
	"image_large": `https://code.s3.yandex.net/react/code/${type}-02-large.png`,
	"__v": 0,
	key: ""
})


export const defaultBun:TCard = {
	_id: uuid(),
	"name": "bun/булка",
	"type": "bun",
	"proteins": 1,
	"fat": 98,
	"carbohydrates": 1,
	"calories": 899,
	"price": 1000,
	"image": "https://code.s3.yandex.net/react/code/bun-02.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
	"__v": 0,
	key: ""
}

export const defaultMain:TCard = {
	_id: uuid(),
	"name": "main/котлета",
	"type": "main",
	"proteins": 98,
	"fat": 1,
	"carbohydrates": 1,
	"calories": 100,
	"price": 100,
	"image": "https://code.s3.yandex.net/react/code/meat-01.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
	"__v": 0,
	key: ""
}

export const defaultSauce:TCard = {
	_id: uuid(),
	"name": "sauce/приправа",
	"type": "main",
	"proteins": 1,
	"fat": 1,
	"carbohydrates": 98,
	"calories": 100,
	"price": 10,
	"image": "https://code.s3.yandex.net/react/code/meat-01.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
	"__v": 0,
	key: ""
}

let totalToday;

export const getTestOrdersResponse = (length: number):{success: boolean, orders: IOrder[], totalToday: number, total: number} => {
	const startNumber = Math.floor(Math.random() * 1000) + 12000;
	return {
		success: true,
		orders: Array.from({length}, (_,i) => ({
			ingredients: [
				uuid().slice(0, 24),
				uuid().slice(0, 24),
				uuid().slice(0, 24),
				uuid().slice(0, 24),
			],
			_id: "1",
			status: "done",
			number: startNumber + i,
			createdAt: (new Date(new Date().setDate(new Date().getDate() - 5))).toISOString(),
			updatedAt: (new Date(new Date().setDate(new Date().getDate() - 4))).toISOString(),
			name: uuid()
		})),
		totalToday: (totalToday = Math.floor(Math.random() * length), totalToday),
		total: length,
	}
}