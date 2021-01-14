import React, { useEffect } from 'react';
import Banner from '../Components/Banner/Banner';
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
            </div>
        </>
    );
};

export default Home;