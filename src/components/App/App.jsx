import React, { useEffect, useState, useReducer } from "react"
import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import ErrorPage from "../../pages/ErrorPage"
import { getIngredients } from "../../utils/burger-api"
import burgerReducer, { burgerInitialState } from "../../store/reducers/burgerReducer"
import { BurgerContext, IngredientsContext } from '../../services/appContext'
import { burgerActionsTypes } from "../../store/actions/burgerActions"

function App() {

	const [data, setData] = useState([])
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)
	const [burgerState, burgerDispatcher] = useReducer(burgerReducer, burgerInitialState)

	useEffect(() => {
		getIngredients()
			.then(({data, error}) => {
				setError(error)
				burgerDispatcher({
					type: burgerActionsTypes.SET_INGREDIENTS_LIST,
					payload: data, 
				})
				setData(data)
				setLoading(false)
			})
	}, [])

	return (
		<IngredientsContext.Provider value={{ data }}>
			<BurgerContext.Provider value={{ burgerState, burgerDispatcher }}>
				<Layout>
				{
					error ? (
						<ErrorPage errorMessage={error} />
					) : (
						(loading || data.length === 0) ? (<>{'Loading...'}</>) : (<MainPage data={data} />)
					)
				}
				</Layout>
			</BurgerContext.Provider>
		</IngredientsContext.Provider>
	)
}

export default App
