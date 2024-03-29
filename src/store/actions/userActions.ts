import burgerApi from "../../utils/burger-api"
import { TDispatchAction, errorMessage, typedAction } from "../../types/commonTypes"
import { IUserRegistrationRequest, IUserRequest } from "../reducers/userReducer"

export type TUser = {
	email: string;
	name: string;
}
export type TUserResponse = {
	accessToken: string; 
	refreshToken: string; 
	user: TUser; 
	message?: string;
	success?: boolean
};

export const userActionsTypes = {
	'REGISTRATION_REQUEST': 'REGISTRATION_REQUEST',
	'REGISTRATION_SUCCESS': 'REGISTRATION_SUCCESS',
	'REGISTRATION_ERROR': 'REGISTRATION_ERROR',
	'REFRESH_TOKEN': 'REFRESH_TOKEN', 
	'RESTORE_PASSWORD_REQUEST': 'RESTORE_PASSWORD_REQUEST',
	'RESTORE_PASSWORD_SUCCESS': 'RESTORE_PASSWORD_SUCCESS',
	'RESTORE_PASSWORD_ERROR': 'RESTORE_PASSWORD_ERROR',
	'FORGOT_PASSWORD_REQUEST': 'FORGOT_PASSWORD_REQUEST',
	'FORGOT_PASSWORD_SUCCESS': 'FORGOT_PASSWORD_SUCCESS',
	'FORGOT_PASSWORD_ERROR': 'FORGOT_PASSWORD_ERROR',
	'LOGOUT': 'LOGOUT', 
	'LOGIN_REQUEST': 'LOGIN_REQUEST', 
	'LOGIN_SUCCESS': 'LOGIN_SUCCESS', 
	'LOGIN_ERROR': 'LOGIN_ERROR', 
	'COMMON_USER_ERROR': 'COMMON_USER_ERROR',
	'SET_USERNAME': 'SET_USERNAME',
	'SET_EMAIL': 'SET_EMAIL',
	'SET_CODE': 'SET_CODE',
	'USER_GET_REQUEST': 'USER_GET_REQUEST',
	'USER_GET_SUCCESS': 'USER_GET_SUCCESS',
	'USER_GET_ERROR': 'USER_GET_ERROR',
	'USER_PATCH_REQUEST': 'USER_PATCH_REQUEST',
	'USER_PATCH_SUCCESS': 'USER_PATCH_SUCCESS',
	'USER_PATCH_ERROR': 'USER_PATCH_ERROR',
} as const;

export function setUsername(username:string) {
	return {
		type: userActionsTypes.SET_USERNAME,
		payload: username
	}
}

export function setEmail(email:string) {
	return {
		type: userActionsTypes.SET_EMAIL,
		payload: email
	}
}

interface IUserGetAction {
	(arg0:string) : TDispatchAction;
}
export const userGetAction:IUserGetAction = function(token:string) {
	return async function(dispatch) {
		try {
			dispatch(typedAction(userActionsTypes.USER_GET_REQUEST));
			const data = await burgerApi.userGetRequest(token);
			dispatch({
				type: userActionsTypes.USER_GET_SUCCESS,
				payload: data,
			})
		} catch (e) {
			dispatch({
				type: userActionsTypes.USER_GET_ERROR,
		  		payload: errorMessage(e)
			})
		}
	}
}

interface IUserPatchAction {
	(arg0:IUserRequest, arg1:string): TDispatchAction; 
}
export const userPatchAction:IUserPatchAction = function(patchData, token) {
	return async function(dispatch) {
		try {
			dispatch(typedAction(userActionsTypes.USER_PATCH_REQUEST));
			const data = await burgerApi.userPatchRequest(patchData, token);
			dispatch({
				type: userActionsTypes.USER_PATCH_SUCCESS,
				payload: data,
			})
		} catch (e:unknown | Error) {
			dispatch({
				type: userActionsTypes.USER_PATCH_ERROR,
		  		payload: errorMessage(e)
			})
		}
	}
}

interface IRegistrationAction {
	(arg0:IUserRegistrationRequest): TDispatchAction
}
export const registrationAction:IRegistrationAction = function(registrationData) {
	return async function(dispatch) {
		try {
			dispatch(typedAction( userActionsTypes.REGISTRATION_REQUEST));
			const data = await burgerApi.registrationRequest(registrationData);
			dispatch({
				type: userActionsTypes.REGISTRATION_SUCCESS,
				payload: data,
			})
		} catch (e:unknown | Error) {
			dispatch({
				type: userActionsTypes.REGISTRATION_ERROR,
		  		payload: errorMessage(e)
			})
		}
	}
}

interface IPasswordRestoreAction {
	(arg0: string, arg1: string): TDispatchAction;
}
export const passwordRestoreAction:IPasswordRestoreAction = function( password, code ) {
	return async function(dispatch) {
		try {
			dispatch(typedAction(userActionsTypes.RESTORE_PASSWORD_REQUEST));
			const data = await burgerApi.passwordRestoreRequest(password, code)
			dispatch({
				type: userActionsTypes.RESTORE_PASSWORD_SUCCESS,
				payload: data
			})
		} catch (e:Error | unknown) {
			const errorMessage:string = e instanceof Error ? e.message : typeof e === "string" ? e : String(e);
			dispatch({
				type: userActionsTypes.RESTORE_PASSWORD_ERROR,
				payload: errorMessage 
			})
		}
	}
}

interface IPasswordForgotAction {
	(arg0: string): TDispatchAction;
}
export const passwordForgotAction:IPasswordForgotAction = function(email) {
	return async function(dispatch) {
		try {
			dispatch(typedAction(userActionsTypes.FORGOT_PASSWORD_REQUEST))
			const data = await burgerApi.passwordForgotRequest(email)
			dispatch(typedAction(userActionsTypes.FORGOT_PASSWORD_SUCCESS))
		} catch (e:unknown | Error) {
			dispatch({
				type: userActionsTypes.FORGOT_PASSWORD_ERROR,
		  		payload: errorMessage(e)
			})
		}
	}
}

interface IRefreshTokenAction {
	(arg0: string): TDispatchAction;
}
export const refreshTokenAction:IRefreshTokenAction = function(refreshToken) {
	return async function (dispatch) {
		const token = refreshToken ?? localStorage.getItem('token');
		if (!token) return;
		try {
			const data = await burgerApi.refreshTokenRequest(token);
			dispatch({
				type: userActionsTypes.REFRESH_TOKEN,
				payload: data
			})
		} catch (e:unknown | Error) {
			dispatch({
				type: userActionsTypes.COMMON_USER_ERROR,
		  		payload: errorMessage(e)
			})
		}
	}
}

interface IGetUser {
	(token?: string):TDispatchAction;
}
export const checkUserByToken:IGetUser = function(token) {
	return async function (dispatch) {
		const refreshToken = localStorage.getItem('token')
		let accessToken = sessionStorage.getItem('token')
		try {
			dispatch({ type: userActionsTypes.LOGIN_REQUEST })
			let data = accessToken ? await burgerApi.userGetRequest(accessToken) : {success: false};
			if (!data?.success && refreshToken) {
				const refreshData = await burgerApi.refreshTokenRequest(refreshToken);
				if (!refreshData?.accessToken) {
					throw Error(refreshData?.message ?? 'Login error.');
				}
				dispatch({
					type: userActionsTypes.REFRESH_TOKEN,
					payload: refreshData
				})
				accessToken = refreshData.accessToken;
				if (accessToken) {
					data = await burgerApi.userGetRequest(accessToken);
				} else {
					throw Error('Error');
				}
			}
			dispatch({
				type: userActionsTypes.LOGIN_SUCCESS,
				payload: {
					...data,
					accessToken,
					refreshToken
				},
			})
		} catch(e:unknown | Error) {
			dispatch({
				type: userActionsTypes.LOGIN_ERROR,
				payload: errorMessage(e)
			})
		}
	}
}

interface ILogoutAction {
	(arg0: string): TDispatchAction;
}
export const logoutAction:ILogoutAction = function(refreshToken) {
  return async function(dispatch) {
	try {
		const data = await burgerApi.logoutRequest(refreshToken);
		dispatch({
			type: userActionsTypes.LOGOUT,
			payload: data,
		})
	} catch (e:unknown | Error) {
		dispatch({
		  type: userActionsTypes.COMMON_USER_ERROR,
		  payload: errorMessage(e)
		})
	}
  }
}

interface ILoginAction {
	(arg0: {email:string, password:string }): TDispatchAction;
}
export const loginAction:ILoginAction = function(loginData) {
  return async function(dispatch) {
	dispatch(typedAction(userActionsTypes.LOGIN_REQUEST ))
	try {
		const data = await burgerApi.authRequest(loginData);
		dispatch({
			type: userActionsTypes.LOGIN_SUCCESS,
			payload: data,
		})
	} catch (e:unknown | Error) {
		dispatch({
		  type: userActionsTypes.LOGIN_ERROR,
		  payload: errorMessage(e)
		})
	}
  }
}

export function setCode(code:string) {
	return {
		type: userActionsTypes.SET_CODE,
		payload: code
	} 
}

export type TUserReducerActions = ReturnType<typeof setCode> |
	{
		type: typeof userActionsTypes.LOGIN_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.FORGOT_PASSWORD_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.REGISTRATION_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.USER_PATCH_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.RESTORE_PASSWORD_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.USER_GET_REQUEST; 
		payload: undefined
	} |
	{
		type: typeof userActionsTypes.COMMON_USER_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.LOGIN_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.REGISTRATION_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.RESTORE_PASSWORD_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.USER_PATCH_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.USER_GET_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.FORGOT_PASSWORD_ERROR;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.FORGOT_PASSWORD_SUCCESS;
		payload: undefined;
	} |
	{
		type: typeof userActionsTypes.LOGIN_SUCCESS;
		payload: Partial<TUserResponse>,
	} |
	{
		type: typeof userActionsTypes.REFRESH_TOKEN;
		payload: Partial<TUserResponse>;
	} |
	{
		type: typeof userActionsTypes.REGISTRATION_SUCCESS;
		payload: Partial<TUserResponse>;
	} |
	{
		type: typeof userActionsTypes.RESTORE_PASSWORD_SUCCESS
		payload: Partial<TUserResponse>;
	} |
	{
		type: typeof userActionsTypes.USER_PATCH_SUCCESS;
		payload: Partial<TUserResponse>;
	} |
	{
		type: typeof userActionsTypes.SET_CODE;
		payload: string; 
	} |
	{
		type: typeof userActionsTypes.SET_EMAIL;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.SET_USERNAME;
		payload: string;
	} |
	{
		type: typeof userActionsTypes.LOGOUT;
		payload: undefined;
	} |
	{
		type: typeof userActionsTypes.USER_GET_SUCCESS;
		payload: Partial<TUserResponse>;
	};
