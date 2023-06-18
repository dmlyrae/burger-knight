import { authRequest, 
		logoutRequest, 
		passwordForgotRequest, 
		passwordRestoreRequest, 
		refreshTokenRequest, 
		registrationRequest, 
		userGetRequest, 
		userPatchRequest 
	} from "../../utils/burger-api"

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
}

export function setUsername(username) {
	return {
		type: userActionsTypes.SET_USERNAME,
		payload: username
	}
}

export function setEmail(email) {
	return {
		type: userActionsTypes.SET_EMAIL,
		payload: email
	}
}

export function userGetAction(token) {
	return async function(dispatch) {
		try {
			dispatch({
				type: userActionsTypes.USER_GET_REQUEST,
			});
			const data = await userGetRequest(token);
			if (data.success) {
				dispatch({
					type: userActionsTypes.USER_GET_SUCCESS,
					payload: data,
				})
			} else {
				throw Error("User not found.");
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.USER_GET_ERROR,
				payload: e.message
			})
		}
	}
}

export function userPatchAction(patchData, token) {
	return async function(dispatch) {
		try {
			dispatch({
				type: userActionsTypes.USER_PATCH_REQUEST,
			});
			const data = await userPatchAction(patchData, token);
			if (data.success) {
				dispatch({
					type: userActionsTypes.USER_PATCH_SUCCESS,
					payload: data,
				})
			} else {
				throw Error("User not found.");
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.USER_PATCH_ERROR,
				payload: e.message
			})
		}
	}
}

export function registrationAction(registrationData) {
	return async function(dispatch) {
		try {
			dispatch({
				type: userActionsTypes.REGISTRATION_REQUEST,
			});
			const data = await registrationRequest(registrationData);
			if (data.success && data.user) {
				dispatch({
					type: userActionsTypes.REGISTRATION_SUCCESS,
					payload: data,
				})
			} else {
				throw new Error("Authorization failed.");
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.REGISTRATION_ERROR,
				payload: e.message
			})
		}
	}
}

export function passwordRestoreAction( password, code ) {
	return async function(dispatch) {
		try {
			dispatch({
				type: userActionsTypes.RESTORE_PASSWORD_REQUEST,
			})
			const data = await passwordRestoreRequest(password, code)
			if (data.success) {
				dispatch({
					type: userActionsTypes.RESTORE_PASSWORD_SUCCESS,
					payload: data
				})
			} else {
				throw new Error('Code not valid.')
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.RESTORE_PASSWORD_ERROR,
				payload: e.message
			})
		}
	}
}

export function passwordForgotAction(email) {
	return async function(dispatch) {
		try {
			dispatch({
				type: userActionsTypes.FORGOT_PASSWORD_REQUEST,
			})
			const data = await passwordForgotRequest(email)
			console.log('data', data)
			if (data.success) {
				dispatch({
					type: userActionsTypes.FORGOT_PASSWORD_SUCCESS,
				})
			} else {
				throw new Error('User not found.')
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.FORGOT_PASSWORD_ERROR,
				payload: e.message
			})
		}
	}
}

export function refreshTokenAction(refreshToken) {
	return async function (dispatch) {
		const token = refreshToken ?? localStorage.getItem('token');
		if (!token) return;
		try {
			const data = await refreshTokenRequest(token);
			if (data.success && data.accessToken) {
				dispatch({
					type: userActionsTypes.REFRESH_TOKEN,
					payload: data
				})
			}
		} catch (e) {
			dispatch({
				type: userActionsTypes.COMMON_USER_ERROR,
				payload: e.message
			})
		}
	}
}

export function logoutAction(refreshToken) {
  return async function(dispatch) {
	try {
		const data = await logoutRequest(refreshToken);
		dispatch({
			type: userActionsTypes.LOGOUT,
			payload: data,
		})
	} catch (e) {
		dispatch({
		  type: userActionsTypes.COMMON_USER_ERROR,
		  payload: e.message
		})
	}
  }
}

export function loginAction(loginData) {
  return async function(dispatch) {
	dispatch({
		type: userActionsTypes.LOGIN_REQUEST
	})
	try {
		const data = await authRequest(loginData);
		if (data.success) {
			dispatch({
				type: userActionsTypes.LOGIN_SUCCESS,
				payload: data,
			})
		}
	} catch (e) {
		dispatch({
		  type: userActionsTypes.LOGIN_ERROR,
		  payload: e.message
		})
	}
  }
}

export function setCode(code) {
	return {
		type: userActionsTypes.SET_CODE,
		payload: code
	} 
}