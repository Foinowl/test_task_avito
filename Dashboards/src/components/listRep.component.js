import { Component } from "../core/component"

class ListRep extends Component {
	constructor(id) {
		super(id)
	}

  onShow(data) {
    console.log(data);
    const html = this.renderList(data)
    this.$el.insertAdjacentHTML("beforeend", html)
	}

  onHide() {
    this.$el.innerHTML = ""
  }
  
  renderList(list) {
    if (list.items && list.items.length) {
			return `
        ${list.items
					.map((rep) => {
						return `
            <div class="contentContainer__listRep_itemContainer flex flex-wrap border_1px border-radius_12px box-sizing tab" id="${rep.url}">
              <div class="repNameContainer flex align-items_center">
                  <img src="rep.jpg" alt="" class="repImgForList">
                  <p href="" class="repNameForList fontDefault text-decoration_none" target="_blank">${rep.full_name}</p>
              </div>
              <div class="repStarsContainer flex">
                  <img src="star.jpg" alt="" class="repImgForList">
                  <span class="repStarsNumForList fontDefault">${rep.stargazers_count}</span>
              </div>
              <span class="lastCommitForList fontDefault">last commit:${rep.updated_at} </span>
              <a href="${rep.html_url}" class="repLink fontDefault">go to repository</a>
            </div>
            `
					})
					.join(" ")}
      `
		}

    return `<p class="center">Ничего не нашел (:</p>`
}
}

export default ListRep