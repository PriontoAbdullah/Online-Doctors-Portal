import React from 'react';
import featuredImg from '../../images/featured.png';
const FeaturedService = () => {
    return (
        <section className="features-service my-5">
            <div className="container mb-5">
                <div className="row mb-5"> 
                    <div className="col-md-7 align-self-center">
                        <h1 className="style-color"> Are You a Specialized Doctor ?</h1>
                        <p className="text-secondary my-5" style={{fontSize:'20px'}}>
                        Join Our Online Doctors Portal Team and Create your Virtual Chamber. Provide Medical Consultancy via video call and expand the reach of your service. We have a strong network of Bangladeshi registered doctors that you can trust.
                        </p>
                        <button className="btn btn-primary button-style">Sign Up</button>
                    </div>
                    <div className="col-md-5 mb-4 m-md-0">
                        <img className="img-fluid" src={featuredImg} alt="doctor-need"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedService;