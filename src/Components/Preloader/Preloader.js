import React from 'react';
import Loader from '../../images/Preloader.gif';

const Preloader = () => {
    return (
        <div className="text-center col-12 py-5 my-5">
            <img src={Loader} alt="loader"/>
        </div>
    );
};

export default Preloader;