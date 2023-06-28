import { Route, Routes } from "react-router-dom"
import ErrorPage from "../../pages/error/Error"
import PropTypes from "prop-types";

function AppRouter ({routerConfig}) {
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