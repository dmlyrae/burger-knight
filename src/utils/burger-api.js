import { checkResponse } from "./check-response"
import { apiUrl } from "./data"


const validateResponse = (res) => {
    if (res.data) return {ingredients: res.data, error: false}
    return {ingredients: [], error: 'Bad response'}
}

export const getIngredients = function() {
    return fetch(`${apiUrl}/ingredients`)
        .then(checkResponse)
        .then(validateResponse)
        .catch((error) => ({ingredients: [], error: (error.message ?? "Unknown error")}))
}