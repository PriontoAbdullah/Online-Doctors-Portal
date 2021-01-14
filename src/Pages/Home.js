import React, { useEffect } from 'react';
import AppointmentBanner from '../Components/AppointmentBanner/AppointmentBanner';
import Banner from '../Components/Banner/Banner';
import Features from '../Components/Features/Features';
import Header from '../Components/Header/Header';
import Infos from '../Components/Infos/Infos';
import Services from '../Components/Services/Services';

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
            </div>
        </>
    );
};

export default Home;