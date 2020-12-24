const REMOTE_HOST = `https://boiling-refuge-66454.herokuapp.com`


const Method = {
	GET: `GET`,
	POST: `POST`,
}

class Api {
	constructor(remoteHost = REMOTE_HOST) {
		this._remoteHost = remoteHost
	}

	getImages() {
		return this.fetchURl({ url: `images` }).then((response) => response.json())
	}

	getImage(id) {
		return this.fetchURl({ url: `images/${id}` }).then((response) =>
			response.json()
		)
	}

	sendComment(id, comment) {
		return this.fetchURl({
			url: `images/${id}/comments`,
			method: Method.POST,
			body: JSON.stringify(comment),
			headers: new Headers({ "Content-Type": `application/json` }),
		})
	}

	fetchURl({ url, method = Method.GET, body = null, headers = new Headers() }) {
		headers.append(`Authorization`, this._authorizationKey)

		return fetch(`${this._remoteHost}/${url}`, { method, body, headers })
			.catch((err) => {
				throw err
			})
	}
}

const api = new Api()

export default api