import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import ErrorPage from "../../pages/ErrorPage"
import { useSelector, useDispatch} from "react-redux"
import { useEffect } from "react"
import { fetchIngredients } from "../../store/actions/ingredientsActions"
import { createRandomBurger } from "../../store/actions/burgerActions"

function App() {
	const dispatch = useDispatch()
	const {ingredients, ingredientsError, ingredientsLoading } = useSelector(state => state.ingredients)
	useEffect(() => {
		dispatch(fetchIngredients())
	},[])
	useEffect(() => {
		if (ingredients.length === 0) return;
		dispatch(createRandomBurger(ingredients))
	},[ingredients])
	return (
		<Layout>
			{
				ingredientsError ? (
					<ErrorPage errorMessage={ingredientsError} />
				) : (
					(ingredientsLoading || ingredients.length === 0) ? (<>{'Loading...'}</>) : (<MainPage data={ingredients} />)
				)
			}
		</Layout>
	)
}

export default App
