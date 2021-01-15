import React from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../../images/banner-img.jpg';
import './Banner.css';

const Banner = () => {
	
	return (
		<section className="banner-section">
			<div className="container">
				<div className="row align-items-center" style={{ height: '100vh' }}>
					<div className="col-md-4">
						<h1>
							Doctor's Chamber on <br /> Video Call
						</h1>
						<p className="my-4">
							Book video call appointments with the country's most qualified specialist doctors, in their private chambers.
						</p>
						<Link className="btn btn-primary button-style" to="/appointment">
							Make Appointment
						</Link>
					</div>
					<div className="col-md-6 d-none d-md-block offset-1">
						<img className="img" src={BannerImg} alt="banner-img" width="120%"/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
