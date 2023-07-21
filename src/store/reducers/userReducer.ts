import { act } from "react-dom/test-utils"
import { userActionsTypes } from "../actions/userActions"
import { PayloadAction } from "@reduxjs/toolkit"
import { Without } from "../../types/commonTypes"

type TInitialState = {
	accessToken: string;
	refreshToken: string;
	code: string;
	passwordRestoreStep: number;
	loginRequest: boolean;
	loginError: string;
	login: string;
	email: string;
	username: string;
	isAuth: boolean;
	passwordRestoreRequest: boolean,
	passwordRestoreError: string;
	passwordForgotRequest: boolean;
	passwordForgotError: string;
	registrationRequest: boolean;
	registrationError: string;
	userGetRequest: boolean;
	userPatchRequest: boolean;
	userGetError: string;
	userPatchError: string;
	error: string;
	forgotPasswordError: string;
	restorePasswordError: string;
}

export interface IUserRequest {
	user: {
		email: string,
		name: string,
	}
}
export interface IUserRegistrationRequest {
	email: string,
	name: string,
	password: string;
}

export interface IAuthRequest extends IUserRequest {
	accessToken: string;
	refreshToken: string;
}
export type TRefreshRequest = Without<IUserRequest, IAuthRequest>;

const initialState:TInitialState = {
	accessToken: '',
	refreshToken: '',
	code: '',
	passwordRestoreStep: 0,
	loginRequest: false,
	loginError: '',
	login: '',
	email: '',
	username: '',
	isAuth: false,
	passwordRestoreRequest: false,
	passwordRestoreError: '',
	passwordForgotRequest: false,
	passwordForgotError: '',
	registrationRequest: false,
	registrationError: '',
	userGetRequest: false,
	userPatchRequest: false,
	userGetError: '',
	userPatchError: '',
	error: '',
	forgotPasswordError: '',
	restorePasswordError: ''
}

export const userReducer = (state = initialState, action:PayloadAction<any>):TInitialState => {
	switch (action.type) {
		case userActionsTypes.USER_GET_REQUEST: {
			return {
				...state,
				userGetRequest: true,
			}
		}
		case userActionsTypes.USER_GET_SUCCESS: {
			const { user } = action.payload as IUserRequest;
			return {
				...state,
				userGetRequest: false,
				username: user.name, 
				email: user.email, 
			}
		}
		case userActionsTypes.USER_GET_ERROR: {
			return {
				...state,
				userGetRequest: false,
				userGetError: action.payload
			}
		}
		case userActionsTypes.USER_PATCH_REQUEST: {
			return {
				...state,
				userPatchRequest: true,
			}
		}
		case userActionsTypes.USER_PATCH_SUCCESS: {
			const { user } = action.payload as IUserRequest;
			return {
				...state,
				userPatchRequest: false,
				username: user.name, 
				email: user.email, 
			}
		}
		case userActionsTypes.USER_PATCH_ERROR: {
			return {
				...state,
				userPatchRequest: false,
				userPatchError: action.payload
			}
		}
		case userActionsTypes.REGISTRATION_REQUEST: {
			return {
				...state,
				registrationRequest: true,
			}
		}
		case userActionsTypes.REGISTRATION_SUCCESS: {
			const { accessToken, refreshToken, user } = action.payload as IAuthRequest;
			if (!accessToken || !refreshToken) return state;
			localStorage.setItem('token', refreshToken);
			return {
				...state,
				registrationRequest: false,
				accessToken,
				refreshToken,
				username: user.name,
				email: user.email,
				isAuth: true,
			}
		}
		case userActionsTypes.REGISTRATION_ERROR: {
			return {
				...state,
				registrationRequest: false,
				registrationError: action.payload,
			}
		}
		case userActionsTypes.SET_EMAIL: {
			return {
				...state,
				email: action.payload,
			} 
		}
		case userActionsTypes.SET_USERNAME: {
			return {
				...state,
				username: action.payload,
			} 
		}
		case userActionsTypes.LOGOUT: {
			localStorage.removeItem('token')
			sessionStorage.removeItem('token')
			return {
				...state,
				accessToken: '',
				refreshToken: '',
				isAuth: false,
			} 
		}
		case userActionsTypes.LOGIN_REQUEST: {
			return {
				...state,
			} 
		}
		case userActionsTypes.LOGIN_SUCCESS: {
			const { refreshToken, accessToken, user } = action.payload as IAuthRequest;
			if (!accessToken || !refreshToken) return state;
			localStorage.setItem('token', refreshToken)
			sessionStorage.setItem('token', accessToken)
			return {
				...state,
				accessToken,
				refreshToken,
				username: user.name,
				email: user.email,
				isAuth: true,
				loginRequest: false,
			} 
		}
		case userActionsTypes.LOGIN_ERROR: {
			return {
				...state,
				loginRequest: false,
				loginError: action.payload,
			} 
		}
		case userActionsTypes.LOGIN_ERROR: {
			return {
				...state,
				error: action.payload
			} 
		}
		case userActionsTypes.RESTORE_PASSWORD_REQUEST: {
			return {
				...state,
				passwordRestoreRequest: true
			} 
		}
		case userActionsTypes.RESTORE_PASSWORD_SUCCESS: {
			return {
				...state,
				passwordRestoreRequest: false,
				passwordRestoreStep: 0,
				code: '',
			} 
		}
		case userActionsTypes.RESTORE_PASSWORD_ERROR: {
			return {
				...state,
				restorePasswordError: action.payload,
			} 
		}
		case userActionsTypes.FORGOT_PASSWORD_REQUEST: {
			return {
				...state,
				passwordForgotRequest: true,
			} 
		}
		case userActionsTypes.FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				passwordForgotRequest: false,
				passwordRestoreStep: 1,
			} 
		}
		case userActionsTypes.FORGOT_PASSWORD_ERROR: {
			return {
				...state,
				forgotPasswordError: action.payload,
			} 
		}
		case userActionsTypes.REFRESH_TOKEN: {
			const { refreshToken, accessToken } = action.payload as TRefreshRequest;
			sessionStorage.setItem('token', accessToken);
			localStorage.setItem('token', refreshToken);
			return {
				...state,
				accessToken,
				refreshToken,
				isAuth: true,
			} 
		}
		case userActionsTypes.SET_CODE: {
			return {
				...state,
				code: action.payload,
			}
		}
		default: {
			return state;
		}
	}
}