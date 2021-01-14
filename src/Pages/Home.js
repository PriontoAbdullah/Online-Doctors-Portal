import React from 'react';
import Banner from '../Components/Banner/Banner';
import Header from '../Components/Header/Header';
import Infos from '../Components/Infos/Infos';

const Home = () => {
    return (
        <>
            <div className="heder-content">
                <Header />
                <Banner />
                <Infos />
            </div>
        </>
    );
};

export default Home;