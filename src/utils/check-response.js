export const checkResponse = (response) => {
    if (response.ok) return response.json()
    return response.json().then(() => {
        throw Error('Response error: ' + response.status)
    })
}