import { Route, Routes, RoutesProps, useNavigate } from "react-router-dom"
import ErrorPage from "../../pages/error/Error"
import PropTypes from "prop-types";
import { FC } from "react";
import { TRouterConfig } from "../../utils/routerConfig";
import Modal from "../Modal/Modal";
import { OrderInfo } from "../OrderInfo/OrderInfo";

interface AppRouter {
	routerConfig: TRouterConfig,
}
const AppRouter:FC<AppRouter> = function ({routerConfig}) {

	const navigate = useNavigate();
	const toggleOrderModalCard = () => {
    	navigate(-1);
  	}
	return (
		<Routes>
			{
				Object.values(routerConfig).map(({path,element}, i) => 
					( 
						<Route 
							path={path} 
							element={element} 
							key={i}
						/>)
				)
			}
			<Route 
				path={"/*"}
				element={<ErrorPage errorMessage={"Page not found."} />}
			/>
		</Routes>
	)
}

AppRouter.propTypes = {
	routerConfig: PropTypes.any,
}

export default AppRouter;