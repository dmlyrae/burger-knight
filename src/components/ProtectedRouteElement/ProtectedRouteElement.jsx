import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routerConfig } from "../../utils/routerConfig";

function ProtectedRouteElement(props) {
    const { element, authProtected } = props;
    const location = useLocation();

    const { accessToken } = useSelector( state => state.user )
    const from = location.state?.from || routerConfig.main.path;

    if (!authProtected && !accessToken) {
        return (
            <Navigate 
                to={routerConfig.login.path} 
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

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired,
    authProtected: PropTypes.bool,
}

export default ProtectedRouteElement