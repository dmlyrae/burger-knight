import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import ErrorPage from "../../pages/ErrorPage"
import { useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import { fetchIngredients } from "../../store/actions/ingredientsActions"
import Loader from "../Loader/Loader"

function App() {
	const dispatch = useDispatch()
	const {ingredients, ingredientsError, ingredientsLoading } = useSelector(state => state.ingredients)
	useEffect(() => {
		dispatch(fetchIngredients())
	},[])
	return (
		<Layout>
			{
				ingredientsError ? (
					<ErrorPage errorMessage={ingredientsError} />
				) : (
					(ingredientsLoading || ingredients.length === 0) ? (
						<Loader size={'large'} loaderType={'spinner'} />
					) : (
						<MainPage />
					)
				)
			}
		</Layout>
	)
}

export default App
