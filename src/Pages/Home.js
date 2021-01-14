import React from 'react';
import Banner from '../Components/Banner/Banner';
import Header from '../Components/Header/Header';

const Home = () => {
    return (
        <>
            <div className="heder-content">
                <Header />
                <Banner />
            </div>
        </>
    );
};

export default Home;