import React from 'react';
import Doctor from '../Doctor/Doctor';
const Doctors = () => {
    return (
        <section className="doctors">
            <div className="container my-5">
                <h1 className="text-center text-primary my-5">Our Doctors</h1>
                <div className="row">
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                </div>
            </div>
        </section>
    );
};

export default Doctors;