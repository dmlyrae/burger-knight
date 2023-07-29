import { userReducer, initialState, IUserRegistrationRequest } from "./userReducer";
import { userActionsTypes, TUserReducerActions } from "../actions/userActions";
import { createTestUserResponse } from "../../utils/data";
import { v4 as uuid } from "uuid";

describe("userReducer test", () => {

	it("default state", () => {
		expect(
			userReducer( undefined, {} as TUserReducerActions)
		).toEqual(initialState);
	})

	it("REGISTRATION_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.REGISTRATION_REQUEST,
				payload: undefined,
			})["registrationRequest"]
		).toBe(true);
	})

	it("REGISTRATION_SUCCESS", () => {
		const userResponse = createTestUserResponse('test')
		expect(
			userReducer( initialState, {
				type: userActionsTypes.REGISTRATION_SUCCESS,
				payload: userResponse 
			})
		).toEqual({
			...initialState,
			registrationRequest: false,
			accessToken: userResponse.accessToken,
			refreshToken: userResponse.refreshToken,
			username: userResponse.user.name,
			email: userResponse.user.email,
			isAuth: true,
		})
	})

	it("REGISTRATION_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.REGISTRATION_ERROR,
				payload: 'error' 
			})["registrationError"]
		).toBe("error")
	})

	it("REFRESH_TOKEN", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.REFRESH_TOKEN,
				payload: {
					refreshToken: "test1", accessToken: "test2",
				} 
			})
		).toEqual({
			...initialState,
			refreshToken: "test1",
			accessToken: "test2",
			isAuth: true,
		})
	})

	it("RESTORE_PASSWORD_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.RESTORE_PASSWORD_REQUEST,
				payload: undefined,
			})["passwordRestoreRequest"]
		).toBe(true);
	})

	it("FORGOT_PASSWORD_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.FORGOT_PASSWORD_REQUEST,
				payload: undefined,
			})["passwordForgotRequest"]
		).toBe(true);
	})

	it("USER_GET_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.USER_GET_REQUEST,
				payload: undefined,
			})["userGetRequest"]
		).toBe(true);
	})

	it("USER_PATCH_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.USER_PATCH_REQUEST,
				payload: undefined,
			})["userPatchRequest"]
		).toBe(true);
	})

	it("LOGIN_REQUEST", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.LOGIN_REQUEST,
				payload: undefined,
			})["loginRequest"]
		).toBe(true);
	})

	it("LOGIN_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.LOGIN_ERROR,
				payload: 'login_error',
			})["loginError"]
		).toBe("login_error");
	})

	it("RESTORE_PASSWORD_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.RESTORE_PASSWORD_ERROR,
				payload: 'restore_pass_error',
			})["restorePasswordError"]
		).toBe("restore_pass_error");
	})

	it("FORGOT_PASSWORD_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.FORGOT_PASSWORD_ERROR,
				payload: "forgot_pass_error"
			})["forgotPasswordError"]
		).toBe("forgot_pass_error");
	})

	it("USER_GET_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.USER_GET_ERROR,
				payload: "user_get_error"
			})["userGetError"]
		).toBe("user_get_error");
	})

	it("USER_PATCH_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.USER_PATCH_ERROR,
				payload: "user_patch_error"
			})["userPatchError"]
		).toBe("user_patch_error");
	})

	it("COMMON_USER_ERROR", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.COMMON_USER_ERROR,
				payload: "user_common_error"
			})["error"]
		).toBe("user_common_error");
	})

	it("RESTORE_PASSWORD_SUCCESS", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.RESTORE_PASSWORD_SUCCESS,
				payload: {}, 
			})
		).toEqual({
			...initialState,
			passwordRestoreRequest: false,
			passwordRestoreStep: 0,
			code: '',
		})
	})

	it("FORGOT_PASSWORD_SUCCESS", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.FORGOT_PASSWORD_SUCCESS,
				payload: undefined, 
			})
		).toEqual({
			...initialState,
			passwordForgotRequest: false,
			passwordRestoreStep: 1,
		})
	})

	it("LOGIN_SUCCESS", () => {
		const testResponse = createTestUserResponse("testuser")
		expect(
			userReducer( initialState, {
				type: userActionsTypes.LOGIN_SUCCESS,
				payload: testResponse
			})
		).toEqual({
			...initialState,
			accessToken: testResponse.accessToken,
			refreshToken: testResponse.refreshToken,
			username: testResponse.user.name,
			email: testResponse.user.email,
			isAuth: true,
			loginRequest: false,
		})

		expect(
			userReducer( initialState, {
				type: userActionsTypes.LOGIN_SUCCESS,
				payload: {accessToken: ""}
			})
		).toEqual({
			...initialState,
		})

		expect(
			userReducer( initialState, {
				type: userActionsTypes.LOGIN_SUCCESS,
				payload: {refreshToken: ""}
			})
		).toEqual({
			...initialState,
		})
	})

	it("LOGOUT", () => {

		const testResponse = createTestUserResponse("testuser")
		const state = {
			...initialState,
			...testResponse,
			isAuth: true,
		}

		expect(
			userReducer( state, {
				type: userActionsTypes.LOGOUT,
				payload: undefined, 
			})
		).toEqual({
			...state,
			accessToken: '',
			refreshToken: '',
			isAuth: false,
		})

	})

	it("SET_USERNAME", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.SET_USERNAME,
				payload: 'testuser', 
			})
		).toEqual({
			...initialState,
			username: 'testuser'
		})
	})

	it("SET_EMAIL", () => {
		expect(
			userReducer( initialState, {
				type: userActionsTypes.SET_EMAIL,
				payload: 'test@email.com', 
			})
		).toEqual({
			...initialState,
			email: 'test@email.com'
		})
	})

	it("SET_CODE", () => {
		const code = uuid();
		expect(
			userReducer( initialState, {
				type: userActionsTypes.SET_CODE,
				payload: code,
			})
		).toEqual({
			...initialState,
			code: code,
		})
	})


	it("USER_GET_SUCCESS", () => {

		const testResponse = createTestUserResponse("testuser")

		expect(
			userReducer( {...initialState, userGetRequest: true}, {
				type: userActionsTypes.USER_GET_SUCCESS,
				payload: testResponse ,
			})
		).toEqual({
			...initialState,
			userGetRequest: false,
			username: testResponse.user.name,
			email: testResponse.user.email,
		})

		expect(
			userReducer( {...initialState, userGetRequest: true}, {
				type: userActionsTypes.USER_GET_SUCCESS,
				payload: {success: false} ,
			})
		).toEqual({
			...initialState,
			userGetRequest: false,
		})
	})

	it("USER_PATCH_SUCCESS", () => {

		const testResponse = createTestUserResponse("testuser")

		expect(
			userReducer( initialState, {
				type: userActionsTypes.USER_PATCH_SUCCESS,
				payload: testResponse,
			})
		).toEqual({
			...initialState,
			username: testResponse.user.name,
			email: testResponse.user.email,
		})
	})

})