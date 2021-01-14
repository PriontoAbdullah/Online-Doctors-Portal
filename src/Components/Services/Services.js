import React from 'react';
import services from '../../Data/services';
import Service from '../Service/Service';

const Services = () => {
    return (
        <section className="services mb-5 pt-0">
            <div className="container">
                <div className="section-header text-center">
                    <h5 className="text-uppercase text-primary">Our services</h5>
                    <h1 className="style-color">Service We Provide</h1>
                </div>
                <div className="row mt-5 pt-3">
                    {
                        services.map(service => <Service service={service} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;