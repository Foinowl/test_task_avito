import { Component } from '../core/component'
import { setLastItems, getLastItems } from "../storage"
// import ListRep from "./listRep.component"


class Input extends Component {
	constructor(id, list, api) {
		super(id)
		this.$paginate = document.getElementById("ulID")
		this.$el.addEventListener(
			"keyup",
			this.debounce(this.searchRep.bind(this), 500)
		)
		this.view = list //new ListRep("repItemTemplate")
		this.api = api
		this.prevPage = 1
		this.currentPage = 1
		this.allPages = 10
		this.renderPage()
	}

	get currentPageNumber() {
		return this.currentPage
	}

	// Устанавливаем текущую страницу поиска,
	setCurrentPageValue(pageNumber) {
		this.currentPage = pageNumber
	}

	renderPage() {
		if (getLastItems()) {
			this.renderStorage()
		} else {
			console.log('Где ты падла')
			this.searchRep()
		}
	}

	renderStorage() {
		const { response, page, allPage, prevPage, value } = getLastItems()
		this.page = page
		this.prevPage = prevPage
		this.allPages = allPage
		this.response = response
		this.$el.value = value

		this.view.onShow(response)
		this.renderPagination()
	}

	// Выполняем поиск пользователей при каждом вводе символа в поисковую строку
	searchRep() {
		this.setCurrentPageValue(1)
		this.view.onHide()

		const value = this.$el.value
		this.api
			.getRepositories(value, this.currentPage)
			.then((response) => {
				this.allPages =
					response.total_count / 10 > 10 ? 10 : response.total_count
				this.view.onShow(response)
				const obj = {
					response,
					page: 1,
					allPage: this.allPages,
					prevPage:1,
					value,
				}
				setLastItems(obj)
			})

		this.renderPagination()
	}

	renderPagination() {
		if (!this.$el.value) {
			return
		}

		this.$paginate.innerHTML = ''
		const templatePage = new Array(this.allPages)
			.fill("")
			.map((_, ind) => {
				return `
					<li class="paginatorPage box-sizing flex justify-content_center align-content_center" id="${
						ind + 1
					}">
						${ind + 1}
					</li>
				`
			})
			.join(" ")

		this.$paginate.insertAdjacentHTML("beforeend", templatePage)
		const pages = this.$paginate.querySelectorAll("li")
		pages.forEach((val, ind) => {
			val.addEventListener("click", this.loadPage.bind(this))
		})
		this.hasCurrentPage(this.prevPage, this.currentPage)
	}

	loadPage(page) {
		this.prevPage = this.currentPage
		this.setCurrentPageValue(page.target.id)
		if (this.prevPage === this.currentPage) {
			return
		}
		this.view.onHide()

		const { response, page: pages } = getLastItems()
		console.log('loadPages', pages);
		if (this.currentPage !== pages) {
			const value = this.$el.value
			this.api.getRepositories(value, this.currentPage).then((response) => {
				this.view.onShow(response)
				const obj = {
					response,
					page: this.currentPage,
					allPage: this.allPages,
					prevPage: this.prevPage,
					value,
				}
				setLastItems(obj)
			})
		} else {
			this.view.onShow(response)
		}
		this.hasCurrentPage(this.prevPage, this.currentPage)
	}

	hasCurrentPage(prev, current) {
		const divPage = this.$paginate.querySelector(`[id='${current}']`)


		console.log("divPAge", divPage)
		if (prev === current) {
			divPage.classList.add("activePage")
		} else {
			const prevPage = this.$paginate.querySelector(`[id='${prev}']`)
			prevPage.classList.remove("activePage")
			divPage.classList.add("activePage")
		}
	}

	// Задержка ввода данных для отправки запроса
	debounce(func, wait, immediate) {
		let timeout
		return function () {
			const context = this,
				args = arguments
			const later = function () {
				timeout = null
				if (!immediate) func.apply(context, args)
			}
			const callNow = immediate && !timeout
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
			if (callNow) func.apply(context, args)
		}
	}
}

export default Input