const REMOTE_HOST = `https://api.github.com/search/repositories?q=`


const Method = {
	GET: `GET`,
	POST: `POST`,
}


String.prototype.format = String.prototype.f = function () {
	var args = arguments
	const value = this.replace(/\{(\d+)\}/g, function (m, n) {
		return args[n] ? args[n] : m
	})
	return value
}


class Api {
	constructor(url='') {
		this._url = `${url}{0}&sort=stars&order=desc&page={1}&per_page={2}`
		
		this.urlsAll = `${url}{0}&sort=stars&order=desc`
	}

	getRepositories(searchName = "", searchPage = 1, perPage = 10) {
		const searchUrl = this._url.f(searchName, searchPage, perPage)
		return this.fetchURl(searchUrl).then((response) => response.json())
	}

	getAllRep(searchName) {
		const searchUrl = this.urlsAll.f(searchName)
		return this.fetchURl(searchUrl).then((response) => response.json())
	}

	getDataRep(url) {
		const data = this.fetchURl(url).then((response) => response.json())
		return data
	}

	fetchURl(
		url,
		method = Method.GET,
		body = null,
		headers = new Headers(),
	) {
		headers.append(`Authorization`, this._authorizationKey)

		return fetch(url, {
			method,
			body,
			headers,
		}).catch((err) => {
			throw err
		})
	}
}

const api = new Api(REMOTE_HOST)

export default api
