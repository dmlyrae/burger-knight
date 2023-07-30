import { Route, Routes, RoutesProps, useNavigate } from "react-router-dom"
import ErrorPage from "../../pages/error/Error"
import { FC } from "react";
import { TRouterConfig } from "../../utils/routerConfig";

interface AppRouter {
	routerConfig: TRouterConfig,
}
const AppRouter:FC<AppRouter> = function ({routerConfig}) {

	const navigate = useNavigate();

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

export default AppRouter;