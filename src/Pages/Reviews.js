import React, { useEffect } from 'react';
import '../App.css';
import Banner from '../Components/Banner/Banner';
import Blogs from '../Components/Blogs/Blogs';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Testimonials from '../Components/Testimonials/Testimonials';

const Reviews = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="heder-content">
            <Header />
            <Banner />
            <Testimonials />
            <Blogs />
            <Footer />
        </div>
    );
};

export default Reviews;