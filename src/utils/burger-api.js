import { checkResponse } from "./check-response"
import { apiUrl } from "./data"


const validateResponse = (res) => {
    if (res.success) return {data: res.data ?? res, error: false}
    return {data: null, error: 'Bad response'}
}

export const getIngredients = function() {
    return fetch(`${apiUrl}/ingredients`)
        .then(checkResponse)
        .then(validateResponse)
        .catch((error) => ({data: [], error: (error.message ?? "Unknown error")}))
}

export const fillOrder = function(order) {
    return fetch(`${apiUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(checkResponse)
        .then(validateResponse)
        .catch((error) => ({data: [], error: (error.message ?? "Unknown error")}))
}