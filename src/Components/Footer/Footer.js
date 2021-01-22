import { faFacebookF, faGooglePlusG, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './Footer.css';
import FooterCol from './FooterCol';

const Footer = () => {
	const [ modalIsOpen, setModalIsOpen ] = useState(false);

	const noNamed = [
		{ name: 's.portal@gmail.com', link: '/' },
		{ name: '+8809-6380-79309', link: '/checkup' },
		{ name: 'Emergency Dental Care', link: '/emergency' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Treatment of Personal Diseases', link: '/personal-treatment' },
		{ name: 'Tooth Extraction', link: '/tooth-extract' },
		{ name: 'Check Up', link: '/checkup' }
	];
	const ourAddress = [
		{ name: 'House-1, Road 6, Dhaka 1205', link: '//google.com/map' },
		{ name: 'View in map', link: '//google.com/map' }
	];
	const oralHealth = [
		{ name: 'Emergency Dental Care', link: '/emergency' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Treatment of Personal Diseases', link: '/personal-treatment' },
		{ name: 'Tooth Extraction', link: '/tooth-extract' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Check Up', link: '/checkup' }
	];
	const services = [
		{ name: 'Emergency Dental Care', link: '/emergency' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Treatment of Personal Diseases', link: '/personal-treatment' },
		{ name: 'Tooth Extraction', link: '/tooth-extract' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Check Up', link: '/checkup' },
		{ name: 'Check Up', link: '/checkup' }
	];
	return (
		<>
			<footer className="footer-area clear-both">
				<div className="container pt-3">
					<div className="row py-5">
						<FooterCol key={1} menuTitle={"Online 's Portal"} menuItems={noNamed} />
						<FooterCol key={2} menuTitle="Services" menuItems={services} />
						<FooterCol key={3} menuTitle="Oral Health" menuItems={oralHealth} />
						<FooterCol key={4} menuTitle="Our Address" menuItems={ourAddress}>
							<ul className="social-media list-inline">
								<li className="list-inline-item">
									<a href="//facebook.com">
										<FontAwesomeIcon className="icon" icon={faFacebookF} />
									</a>
								</li>
								<li className="list-inline-item">
									<a href="//google.com">
										<FontAwesomeIcon className="icon" icon={faGooglePlusG} />
									</a>
								</li>
								<li className="list-inline-item">
									<a href="//instagram.com">
										<FontAwesomeIcon className="icon" icon={faInstagram} />
									</a>
								</li>
							</ul>
							<div className="mt-2">
								<h6 className="mb-2"> Open Admin Pannel</h6>
								<button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>
									<FontAwesomeIcon className="icon mr-2" icon={faUser} />Admin Panel
								</button>
							</div>
						</FooterCol>
					</div>
					<div className="copyRight text-center pb-3 text-secondary">
						<p> &copy; 2021 Developed by Prionto Abdullah</p>
					</div>
				</div>
			</footer>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				id="modal-responsive"
				style={{
					overlay: {
						backgroundColor: 'rgba(130,125,125,0.75)'
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						width: '50%',
						transform: 'translate(-50%, -50%)'
					}
				}}
			>
				<form className="px-5 my-3 text-center">
					<p className="text-center mb-2 mt-3">
						<small>You need to Login with this email and password</small>
					</p>
					<h5 className="text-secondary mb-3">Email: doctors.portal@gmail.com</h5>
					<h6 className="text-secondary mb-3">Password: AdminDoctor@123</h6>
                    <p className="text-center mb-2 mt-3 px-5">
						<small>Or you can create a new account or signIn with a account which You did not use or provide as an patient appointment email. </small>
					</p>
					<div className="form-group text-center mt-2">
						<Link to="/dashboard/dashboard">
							<button className="btn btn-success mr-3 text-white">Open Admin Panel</button>
						</Link>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default Footer;
