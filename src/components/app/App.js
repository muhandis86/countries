import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Spinner from "../Spinner/Spinner";

const CountryList = lazy(() => import('../CountryList/CountryList'));
const CountryPage = lazy(() => import('../CountryPage/CountryPage'));

function App() {

	return (
		<Router>
			<div className="App">
				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route path="/" element={<CountryList />} />
						<Route path="/:countryName" element={<CountryPage />} />
					</Routes>
				</Suspense>
			</div>
		</Router>
	);
}

export default App;
