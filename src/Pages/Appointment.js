import React, { useEffect } from 'react';
import '../App.css';
import AppointmentSection from '../Components/Appointment/AppointmentSection';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

const Appointment = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="heder-content">
			<Header />	
			<AppointmentSection />
            <Footer />
		</div>
	);
};

export default Appointment;
