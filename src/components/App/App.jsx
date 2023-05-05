import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import ErrorPage from "../../pages/ErrorPage"
import { apiUrl } from "../../utils/data"

function App() {
  const [data, setData] = useState()
  const [error, setError] = useState()
  useEffect(() => {
	fetch(apiUrl)
		.then((response) => response.json())
		.then((parsedResponse) => setData(parsedResponse.data))
		.catch((error) => {
			setError(error.message ?? 'Unknown error')
		})
  }, [])
  return (
	<Layout>
	  {
		error ? (
			<ErrorPage errorMessage={error} />
		) : (
			<MainPage data={data} />
		)
	  }
	</Layout>
  )
}

App.propTypes = {}

export default App
