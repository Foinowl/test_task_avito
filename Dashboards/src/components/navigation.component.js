import { Component } from "../core/component"

export class NavigationComponent extends Component {
	constructor(id, pageCom, selector, api) {
		super(id)

		this.tabs = []
		this.page = pageCom
		this.selector = selector
		this.api = api
	}

	init() {
		this.$el.addEventListener("click", tabClickHandler.bind(this))
	}

	registerTabs(tabs) {
		this.tabs = tabs
	}
}

function tabClickHandler(event) {
	console.log('navigation com', event.target);
	event.preventDefault()
	if (event.target.classList.contains("tab")) {
		console.log(event.target.id);

		this.tabs.forEach((t) => t.component.hide())

		const activeTab = new this.page(this.selector, this.api, event.target.id)
		// activeTab.renderData()
		// activeTab.component.show()
	}
}


export default NavigationComponent