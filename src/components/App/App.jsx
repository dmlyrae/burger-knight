import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout"
import MainPage from "../../pages/MainPage"
import { apiUrl } from "../../utils/data"

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((parsedResponse) => setData(parsedResponse.data));
  }, []);
  return (
    <Layout>
      <MainPage data={data} />
    </Layout>
  )
}

App.propTypes = {}

export default App
