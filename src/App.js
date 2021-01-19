import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Appointment from './Pages/Appointment';
import Login from './Pages/Authentication/Login';
import Contacts from './Pages/Contacts';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import DashBoardAppointments from './Pages/Dashboard/Appointments';
import Dashboard from './Pages/Dashboard/Dashboard';
import PatientAppointment from './Pages/Dashboard/PatientAppointment';
import Patients from './Pages/Dashboard/Patients';
import Prescriptions from './Pages/Dashboard/Prescriptions';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Reviews from './Pages/Reviews';
export const DataContext = createContext();
export const CalenderContext = createContext();

function App() {
	const [ loggedInUser, setLoggedInUser ] = useState({});
	const [ allAppointments, setAllAppointments ] = useState([]);
	const [ allBookedAppointments, setAllBookedAppointments ] = useState([]);
	const [ allPatients, setAllPatients ] = useState([]);
	const [ date, setDate ] = useState(new Date());
	const [ preLoaderVisibility, setPreLoaderVisibility ] = useState(true);

	// Load all Doctors Information
	useEffect(
		() => {
			fetch('http://localhost:5000/doctors').then((res) => res.json()).then((data) => {
				setAllAppointments(data);
				setPreLoaderVisibility(false);
			});
		},
		[ allAppointments.length ]
	);

	// Load all Appointments and Patients Information
	useEffect(
		() => {
			fetch('http://localhost:5000/bookedAppointments')
				.then((res) => res.json())
				.then((data) => setAllBookedAppointments(data));
		},
		[ allBookedAppointments.length ]
	);

	const contextData = {
		loggedInUser,
		setLoggedInUser,
		allAppointments,
		setAllAppointments,
		allBookedAppointments,
		setAllBookedAppointments,
		allPatients,
		setAllPatients,
		preLoaderVisibility
	};
	const calenderContextValue = { date, setDate };

	return (
		<DataContext.Provider value={contextData}>
			<CalenderContext.Provider value={calenderContextValue}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/appointment">
							<Appointment />
						</Route>
						<Route path="/reviews">
							<Reviews />
						</Route>
						<Route path="/contact">
							<Contacts />
						</Route>
						<Route exact path="/dashboard">
							<Login />
						</Route>
						<Route path="/dashboard/dashboard">
							<Dashboard />
						</Route>
						<Route path="/dashboard/appointment">
							<DashBoardAppointments />
						</Route>
						<Route path="/dashboard/patients">
							<Patients />
						</Route>
						<Route path="/dashboard/prescriptions">
							<Prescriptions />
						</Route>
						<Route path="/dashboard/doctors">
							<AddDoctor />
						</Route>
						<Route path="/dashboard/my-appointment">
							<PatientAppointment />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</CalenderContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
