import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" >
          <Home />
    
        </Route>
			</Switch>
		</Router>
	);
}

export default App;
