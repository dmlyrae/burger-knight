import MainPage from "../pages/main/Main"
import LoginPage from "../pages/login/Login"
import RegisterPage from "../pages/register/Register"
import ForgotPasswordPage from "../pages/forgotPassword/ForgotPassword"
import ResetPasswordPage from "../pages/resetPassword/ResetPassword"
import ProfilePage from "../pages/profile/Profile"
import IngredientsPage from "../pages/ingredients/Ingredients"
import ProtectedRouteElement from "../components/ProtectedRouteElement/ProtectedRouteElement"
import { PathRouteProps, RouteProps } from "react-router-dom"
import Feed from "../pages/feed/Feed"
import { FeedId } from "../pages/feedId/FeedId"


export type TRouterConfig = Record<string, RouteProps>; 

export const routerConfig:TRouterConfig = {
	main: {
		path: '/',
		element: <MainPage />
	},
	login: {
		path: '/login',
		element: <ProtectedRouteElement 
				element={
					<LoginPage />
				}
			/>
	},
	register: {
		path: '/registration',
		element: <ProtectedRouteElement 
				element={
					<RegisterPage />
				}
			/>
	},
	forgotPassword: {
		path: '/forgot-password',
		element: <ProtectedRouteElement 
				element={
					<ForgotPasswordPage />
				}
				authProtected={true}
			/>
	},
	resetPassword: {
		path: '/reset-password',
		element: <ProtectedRouteElement 
				element={
					<ResetPasswordPage />
				}
				authProtected={true}
			/>
	},
	ingredients: {
		path: '/ingredients/:id',
		element: <IngredientsPage />
	},
	profile: {
		path: '/profile',
		element: <ProtectedRouteElement
				element={
					<ProfilePage tab={'profile'}  />
				}
				authProtected={true}
			/>
	},
	orders: {
		path: '/profile/orders',
		element: <ProtectedRouteElement
				element={
					<ProfilePage tab={'orders'}  />
				}
				authProtected={true}
			/>
	},
	orderId: {
		path: '/profile/orders/:authorderid',
		element: <ProtectedRouteElement
				element={
					<FeedId />
				}
				authProtected={true}
			/>
	},
	feedId: {
		path: '/feed/:id',
		element: <ProtectedRouteElement
			element={
				<FeedId />
			} 
		/>
	},
	feed: {
		path: '/feed',
		element: <ProtectedRouteElement
			element={
				<Feed />
			} 
		/>
	},
} as const;