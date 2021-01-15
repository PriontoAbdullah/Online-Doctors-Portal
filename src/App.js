import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Appointment from './Pages/Appointment';
import Home from './Pages/Home';
export const CalenderContext = createContext();

function App() {
	const [ date, setDate ] = useState(new Date());

	const calenderContextValue = { date, setDate };

	return (
		<CalenderContext.Provider value={calenderContextValue}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/appointment">
						<Appointment />
					</Route>
				</Switch>
			</Router>
		</CalenderContext.Provider>
	);
}

export default App;
