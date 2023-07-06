import { RequestOptions } from "https"
import { apiUrl } from "./data"
import { TCard } from "../types/cards"
import { IUserRegistrationRequest, IUserRequest } from "../store/reducers/userReducer"

const checkResponse = (response:Response) => {
	if (response.ok) return response.json()
	return response.json().then(() => {
		throw Error('Response error: ' + response.status)
	})
}

const validateResponse = (res:{success: boolean, data: any}) => {
	if (res.success) return res.data ?? res;
	throw Error('Bad response.')
}

const request = (action:string, options?:RequestInit) => {
	return fetch(`${apiUrl}/${action}`, options)
		.then(checkResponse)
		.then(validateResponse)
}

export const registrationRequest = (registrationData:IUserRegistrationRequest) => request('auth/register', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(registrationData)
})

export const authRequest = (authData:{email:string, password:string }) => request('auth/login', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(authData)
})

export const logoutRequest = (refreshToken:string) => request('auth/logout', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		token: refreshToken
	})
})

export const refreshTokenRequest = (refreshToken:string) => request('auth/token', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		token: refreshToken
	})
})

export const userGetRequest = (token:string) => request('auth/user', {
	headers: {
		'Authorization': token,
	}
});

export const userPatchRequest = (patchData:IUserRequest, token:string) => request('auth/token', {
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	},
	body: JSON.stringify(patchData)
})

export const passwordRestoreRequest = (password:string, token:string) => request('password-reset/reset', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		password,
		token
	})
})

export const passwordForgotRequest = (email:string) => request('password-reset', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		email
	})
})


export const sendOrderRequest = (order:{ingredients: string[]}, token:string) => request('orders', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	},
	body: JSON.stringify(order)
})

export const getIngredients = () => request('ingredients');