export const BASE_URL = 'https://api.mesto-suhachov.nomoredomains.rocks'

function handleResponse(res) {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export function register({ email, password }) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(handleResponse)
}

export function authorize({ email, password }) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(handleResponse)
}

export function getContent(token) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	}).then(handleResponse)
}
