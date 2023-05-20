import { apiUrl } from "./data"

const checkResponse = (response) => {
    if (response.ok) return response.json()
    return response.json().then(() => {
        //Promise.reject(`Error: ${response.status}.`);
        throw Error('Response error: ' + response.status)
    })
}

const validateResponse = (res) => {
    if (res.success) return res.data ?? res;
    throw Error('Bad response.')
    //Promise.reject(`Bad Response.`);
}

const request = (action, options) => {
    return fetch(`${apiUrl}/${action}`, options)
        .then(checkResponse)
        .then(validateResponse)
}


export const sendOrderFetch = (order) => request('orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
})

export const getIngredients = () => request('ingredients');