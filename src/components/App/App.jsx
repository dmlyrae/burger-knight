import Layout from "../Layout/Layout"
import { useEffect } from "react"
import { fetchIngredients } from "../../store/actions/ingredientsActions"
import Loader from "../Loader/Loader"
import { useSelector, useDispatch} from "react-redux"
import AppRouter from "../AppRouter/AppRouter"
import { routerConfig } from "../../utils/routerConfig"
import ErrorPage from "../../pages/error/Error"
import { refreshTokenAction } from "../../store/actions/userActions"


function App() {
	const dispatch = useDispatch()
	const { ingredients, ingredientsError, ingredientsLoading } = useSelector(state => state.ingredients)
	const { refreshToken, isAuth } = useSelector( state => state.user)

	useEffect(() => {
		dispatch(fetchIngredients())
	},[])
	
	useEffect(() => {
		if (!isAuth) {
			const refreshToken = localStorage.getItem('token');
			if (refreshToken) {
				dispatch(refreshTokenAction(refreshToken))
			}
		}
	}, [isAuth])


	return (
		<Layout>
			{
				ingredientsError ? (
					<ErrorPage errorMessage={ingredientsError} />
				) : ingredientsLoading || ingredients.length === 0 ? 
					( 
						<Loader 
							size={'large'} 
							loaderType={'spinner'} 
						/>
					) : ( 
						<AppRouter routerConfig={routerConfig} />
					)
			}
		</Layout>
	)
}

export default App