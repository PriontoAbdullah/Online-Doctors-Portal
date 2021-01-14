import React from 'react';
import bannerImg from '../../images/ap-banner.png';
import './AppointmentBanner.css';
const AppointmentBanner = () => {
    return (
        <section className="appointment-banner">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 d-none d-md-block">
                        <img src={bannerImg} alt="doctor" />
                    </div>
                    <div className="col-md-7 text-white py-5">
                        <h5 className="text-primary text-uppercase ">Appointment</h5>
                        <h1 className="my-4">Make an Appointment <br/> Today</h1>
                        <p>You will now get all kinds of health related services for your day to day life through an app. Ranging from primary health care for your illness to specialist doctors’ consultation or referrals for hospital admission.</p>
                        <button className="btn btn-primary button-style">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;