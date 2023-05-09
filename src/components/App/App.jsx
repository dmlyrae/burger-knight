import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import ErrorPage from "../../pages/ErrorPage"
import { getIngredients } from "../../utils/burger-api"

function App() {

	const [data, setData] = useState([])
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getIngredients()
			.then(({ingredients, error}) => {
				setError(error)
				setData(ingredients)
				setLoading(false)
			})
	}, [])

	return (
		<Layout>
		{
			error ? (
				<ErrorPage errorMessage={error} />
			) : (
				(loading || data.length === 0) ? (<>{'Loading...'}</>) : (<MainPage data={data} />)
			)
		}
		</Layout>
	)
}

App.propTypes = {}

export default App
