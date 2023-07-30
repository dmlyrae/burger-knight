import React, { FC, useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { routerConfig } from "../../utils/routerConfig";
import { useAppDispatch, useAppSelector } from "../../types/redux";
import { checkUserByToken, refreshTokenAction } from "../../store/actions/userActions";
import Loader from "../Loader/Loader";

interface ProtectedRouteElement {
	element: React.ReactElement; 
	authProtected?: boolean;
}
const ProtectedRouteElement:FC<ProtectedRouteElement> = function(props) {

	const { element, authProtected } = props;
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { isAuth, loginRequest } = useAppSelector( state => state.user)
	const from = location.state?.from || routerConfig.main.path;

	useEffect(() => {
		if (loginRequest) return;
		if (!isAuth) {
			dispatch(checkUserByToken())
		}
	}, [])

	if (loginRequest) {
		return (
			<Loader />
		)
	}

	if (authProtected && !isAuth) {
		return (
			<Navigate 
				to={routerConfig.login.path ?? `/`} 
				state={{
					from: location,
				}}
			/>
		) 
	}

	if (isAuth && location.state) {
		return (
			<Navigate 
				to={from} 
			/>
		) 
	}

	return element;
}

export default ProtectedRouteElement