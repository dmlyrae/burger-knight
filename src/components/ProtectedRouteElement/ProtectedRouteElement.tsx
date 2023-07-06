import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { routerConfig } from "../../utils/routerConfig";
import { useAppSelector } from "../../types/redux";

interface ProtectedRouteElement {
    element: React.ReactElement; 
    authProtected?: boolean;
}
const ProtectedRouteElement:FC<ProtectedRouteElement> = function(props) {
    const { element, authProtected } = props;
    const location = useLocation();

    const { accessToken } = useAppSelector( state => state.user )
    const from = location.state?.from || routerConfig.main.path;

    if (!authProtected && !accessToken) {
        return (
            <Navigate 
                to={routerConfig.login.path ?? `/`} 
                state={{
                    from: location
                }}
            />
        ) 
    }

    if (authProtected && accessToken) {
        return (
            <Navigate 
                to={from} 
            />
        ) 
    }

    return element;
}

export default ProtectedRouteElement