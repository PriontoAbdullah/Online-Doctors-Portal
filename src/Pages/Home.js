import React, { useEffect } from 'react';
import AppointmentBanner from '../Components/AppointmentBanner/AppointmentBanner';
import Banner from '../Components/Banner/Banner';
import Blogs from '../Components/Blogs/Blogs';
import FeaturedService from '../Components/FeaturedService/FeaturedService';
import Features from '../Components/Features/Features';
import Header from '../Components/Header/Header';
import Infos from '../Components/Infos/Infos';
import Services from '../Components/Services/Services';
import Testimonials from '../Components/Testimonials/Testimonials';

const Home = () => {
    useEffect(() => {window.scrollTo(0,0)}, [])
    
    return (
        <>
            <div className="heder-content">
                <Header />
                <Banner />
                <Infos />
                <Services/>
                <AppointmentBanner/>
                <Features />
                <Testimonials/>
                <FeaturedService/>
                <Blogs/>
            </div>
        </>
    );
};

export default Home;