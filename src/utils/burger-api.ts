import { RequestOptions } from "https"
import { apiUrl as defaultApiUrl } from "./data"
import { TCard } from "../types/cards"
import { IUserRegistrationRequest, IUserRequest } from "../store/reducers/userReducer"



/*			baseUrl,
			getIngredients: `${baseUrl}`,
			checkoutOrder: `${baseUrl}/orders`,
			registration: `${baseUrl}/auth/register`,
			login: `${baseUrl}/auth/login`,
			logout: `${baseUrl}/auth/logout`,
			token: `${baseUrl}/auth/token`,
			user: `${baseUrl}/auth/user`,
			forgotPassword: `${baseUrl}/password-reset`,
			resetPassword: `${baseUrl}/password-reset/reset`,
*/

class BurgerApi {

	private _apiUrl: string;

	constructor(apiUrl = defaultApiUrl) {
		this._apiUrl = apiUrl;
	}

	private checkResponse = (response:Response) => {
		if (response.ok) return response.json()
		return response.json().then(() => {
			throw Error('Response error: ' + response.status)
		})
	}

	private validateResponse = (res:{success: boolean, data: any}) => {
		if (res.success) return res.data ?? res;
		throw Error('Bad response.')
	}

	private request = (action:string, options?:RequestInit) => {
		return fetch(`${this._apiUrl}/${action}`, options)
			.then(this.checkResponse)
			.then(this.validateResponse)
	}

	checkUser = (token:string) => this.request('auth/user', {
		method: 'GET',
		headers: {
			'Authorization': token,
		},
	})

	registrationRequest = (registrationData:IUserRegistrationRequest) => this.request('auth/register', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(registrationData)
	})

	authRequest = (authData:{email:string, password:string }) => this.request('auth/login', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(authData)
	})

	logoutRequest = (refreshToken:string) => this.request('auth/logout', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: refreshToken
		})
	})

	refreshTokenRequest = (refreshToken:string) => this.request('auth/token', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: refreshToken
		})
	})

	userGetRequest = (token:string) => {
		return this.request('auth/user', {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'appliection/json',
				'Authorization': token,
			}
	})};

	userPatchRequest = (patchData:IUserRequest, token:string) => this.request('auth/token', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		},
		body: JSON.stringify(patchData)
	})

	passwordRestoreRequest = (password:string, token:string) => this.request('password-reset/reset', {
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

	passwordForgotRequest = (email:string) => this.request('password-reset', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email
		})
	})

	sendOrderRequest = (order:{ingredients: string[]}, token:string) => this.request('orders', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token,
		},
		body: JSON.stringify(order)
	})

	getIngredients = () => this.request('ingredients');

}

export default new BurgerApi();