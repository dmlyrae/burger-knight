import Layout from "../Layout/Layout"
import { useEffect } from "react"
import { fetchIngredients } from "../../store/actions/ingredientsActions"
import Loader from "../Loader/Loader"
import AppRouter from "../AppRouter/AppRouter"
import { routerConfig } from "../../utils/routerConfig"
import ErrorPage from "../../pages/error/Error"
import { refreshTokenAction } from "../../store/actions/userActions"
import { useAppDispatch, useAppSelector } from "../../types/redux"

function App() {
	const { ingredients, ingredientsError, ingredientsLoading } = useAppSelector(state => state.ingredients)
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector( state => state.user)

	useEffect(() => {
		dispatch(fetchIngredients())
	},[])
	
	useEffect(() => {
		if (!isAuth) {
			const refreshToken = localStorage.getItem('token');
			if (refreshToken) refreshTokenAction(refreshToken);
		}
	}, [isAuth])

	return (
		<Layout>
			{
				ingredientsError ? (
					<ErrorPage errorMessage={String(ingredientsError)} />
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