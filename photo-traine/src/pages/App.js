import './App.css';
import PageTitle from "../components/pageTitle/pageTitle"
import PageFooter from "../components/pageFooter/PageFooter"
import PageImages from "../components/PageImages/PageImages"


const App = () =>  {
  return (
		<div className="container">
			<div className="app">
				<PageTitle />
				<PageImages />
				<PageFooter />
			</div>
		</div>
	)
}

export default App;
