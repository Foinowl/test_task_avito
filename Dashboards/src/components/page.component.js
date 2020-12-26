import { Component } from "../core/component"


class PageComponent extends Component {
	constructor(id, api, url) {
		super(id)

		this.api = api
		this.url = url
		this.renderData()
		console.log(api, url, this.data)
	}

	renderData() {
		this.api.getDataRep(this.url).then((res) => {
			this.onShow(res)
		})
	}

	onShow(data) {
		const html = this.renderCart(data)
		this.$el.insertAdjacentHTML("beforeend", html)
	}

	onHide() {
		this.$el.innerHTML = ""
	}

	renderCart(data) {
		console.log(data)

		const name = data.organization ? "organization" : "owner"
		this.renderLangSpan(data.languages_url)
		this.renderContributes(data.contributors_url)
		return `
				<div class="repContainer__repPageContainer flex flex-direction_column align-items_start">
					<div class="repContainer__repPageContainer_repFirstInfo InfoBlock flex justify-content_center">
							<div class="repContainer__repPageContainer_repFirstInfo_repNameContainer flex justify-content_center">
									<img src="rep.jpg" alt="" class="repImgForPage">
									<span class="repNameForPage fontDefault">${
										data.full_name
									}</span>                                
							</div>
							<span class="fontDefault whiteSpace"> - </span>
							<div class="repContainer__repPageContainer_repFirstInfo_starsContainer flex justify-content_center">
									<img src="star.jpg" alt="" class="repImgForPage">
									<span class="repStarsNumForPage fontDefault">${data.stargazers_count}</span>
							</div>
							<span class="fontDefault whiteSpace"> - </span>
							<span class="lastCommitForPage fontDefault">last commit: ${
								data.updated_at
							}</span>
					</div>
					<div class="repContainer__repPageContainer_repOwner InfoBlock flex flex-direction_column align-items_center border_1px border-radius_12px">
							<span class="fontDefault">${name}: ${data[name].login}</span>
							<img src="${
								data[name].avatar_url || data[name].avatar_url
							}" alt="" class="repContainer__repPageContainer_repOwner_face">
							<span class="repContainer__repPageContainer_repOwner_ownerName fontDefault"></span>
					</div>
					<div class="repContainer__repPageContainer_repLanguages InfoBlock flex flex-wrap align-items_center">
							<span class="fontDefault" id="langSpan">Languages: </span>
					</div>
					<div class="repContainer__repPageContainer_repDescription InfoBlock fontDefault">Description: ${
						data.description
					}</div>
					<div class="repContainer__repPageContainer_repContributors InfoBlock flex flex-wrap align-items_center">
							<span class="fontDefault" id="Contr">Most active contributors:</span>
					</div>
				</div>
		`
	}

	renderLangSpan(url_lang) {
		this.api
			.fetchURl(url_lang)
			.then((res) => res.json())
			.then((data) => {
				const keys = Object.keys(data)
				const newData = new Array(keys.length)
					.fill(" ")
					.map((_, ind) => {
						return `
						<span class="fontDefault badge language">${keys[ind]}</span>
						`
					})
					.join(" ")

				const $elSpan = document.getElementById("langSpan")
				$elSpan.insertAdjacentHTML("afterend", newData)
			})
	}

	renderContributes(url) {
		this.api
			.fetchURl(url)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const newData = new Array(data.length > 10 ? 10 : data.length)
					.fill(" ")
					.map((_, ind) => {
						return `
				<span class="fontDefault badge contributor">${data[ind].login}</span>
				`
					})
					.join(" ")

				const $elSpan = document.getElementById("Contr")
				$elSpan.insertAdjacentHTML("afterend", newData)
			})
	}
}


export default PageComponent