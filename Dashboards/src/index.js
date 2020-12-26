import "./styles/styles.css"
import ListRep from './components/listRep.component'
import Input from './components/input.component'
import NavigationComponent from './components/navigation.component'
import PageComponent from './components/page.component'
import api from './API/API'

const listOfRep = new ListRep("repItemTemplate")
const searchInput = new Input("searchInput", listOfRep, api)
// const pageRep = new PageComponent("repPageTemplate", api)

const navigation = new NavigationComponent(
	"repItemTemplate",
	PageComponent,
	"repPageTemplate",
	api
)

navigation.registerTabs([
	{ name: "create", component: listOfRep },
	{ name: "searchInput", component: searchInput }
])