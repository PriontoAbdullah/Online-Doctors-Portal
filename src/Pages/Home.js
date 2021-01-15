import React, { useEffect } from 'react';
import AppointmentBanner from '../Components/AppointmentBanner/AppointmentBanner';
import Banner from '../Components/Banner/Banner';
import Blogs from '../Components/Blogs/Blogs';
import Contact from '../Components/Contact/Contact';
import Doctors from '../Components/Doctors/Doctors';
import FeaturedService from '../Components/FeaturedService/FeaturedService';
import Features from '../Components/Features/Features';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Infos from '../Components/Infos/Infos';
import Services from '../Components/Services/Services';
import Testimonials from '../Components/Testimonials/Testimonials';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="heder-content">
			<Header />
			<Banner />
			<Infos />
			<Services />
			<AppointmentBanner />
			<Doctors />
			<Features />
			<Testimonials />
			<FeaturedService />
			<Blogs />
			<Contact />
			<Footer />
		</div>
	);
};

export default Home;
