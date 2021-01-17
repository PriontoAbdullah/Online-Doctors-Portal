import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import logo from '../../images/logo.png';

const Header = () => {
	const [ isSticky, setSticky ] = useState(false);
	const [ isCollapsed, setCollapsed ] = useState(null);
	const [navStyle, setNavStyle] = useState('text-gray');

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				setSticky(true);
				setNavStyle('');
			} else {
				setSticky(false);
				setNavStyle('text-gray');
			}
		});
	}, []);
	return (
		<nav
			className={
				isSticky || isCollapsed ? (
					'slide in show shadow-sm navbar navbar-expand-sm bg-white navbar-light py-3  fixed-top'
				) : (
					'slide out show navbar navbar-expand-sm navbar-light py-4 fixed-top '
				)
			}
		>
			<div className="container">
				<Link className="navbar-brand" to="/" style={{ color: '#15D1C8' }}>
					<img src={logo} alt="logo"/><span className="logo-name"> Online Doctor's Portal </span>
				</Link>
				<button
					onClick={() => setCollapsed(!isCollapsed ? 'show' : null)}
					className="navbar-toggler d-lg-none"
					type="button"
					data-toggle="collapse"
					data-target="#collapsibleNavId"
					aria-controls="collapsibleNavId"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={`collapse navbar-collapse ${isCollapsed}`} id="collapsibleNavId">
					<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/appointment">
								Make Appointment
							</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${navStyle}`} to="/dashboard/dashboard">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${navStyle}`}  to="/reviews">
								Reviews
							</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${navStyle}`}  to="/contact">
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
