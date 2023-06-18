import { apiUrl } from "./data"

const checkResponse = (response) => {
	if (response.ok) return response.json()
	return response.json().then(() => {
		//Promise.reject(`Error: ${response.status}.`);
		throw Error('Response error: ' + response.status)
	})
}

const validateResponse = (res) => {
	if (res.success) return res.data ?? res;
	throw Error('Bad response.')
	//Promise.reject(`Bad Response.`);
}

const request = (action, options) => {
	return fetch(`${apiUrl}/${action}`, options)
		.then(checkResponse)
		.then(validateResponse)
}

export const registrationRequest = (registrationData) => request('auth/register', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(registrationData)
})

export const authRequest = (authData) => request('auth/login', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(authData)
})

export const logoutRequest = (refreshToken) => request('auth/logout', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		token: refreshToken
	})
})

export const refreshTokenRequest = (refreshToken) => request('auth/token', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		token: refreshToken
	})
})

export const userGetRequest = (token) => request('auth/user', {
	headers: {
		'Authorization': token,
	}
});

export const userPatchRequest = (patchData, token) => request('auth/token', {
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	},
	body: JSON.stringify(patchData)
})

export const passwordRestoreRequest = (password, token) => request('password-reset/reset', {
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

export const passwordForgotRequest = (email) => request('password-reset', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		email
	})
})


export const sendOrderRequest = (order, token) => request('orders', {
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': token,
	},
	body: JSON.stringify(order)
})

export const getIngredients = () => request('ingredients');