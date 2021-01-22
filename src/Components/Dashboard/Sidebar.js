import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import {
	faCalendar,
	faGripHorizontal,
	faQuoteLeft, faSignOutAlt,
	faUser,
	faUserPlus,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../App';
import logo from '../../images/logo.png';
import './Sidebar.css';

const Sidebar = () => {
	const { loggedInUser, setLoggedInUser, allPatients } = useContext(DataContext);

	const patientUser = allPatients.find((ap) => ap.email === loggedInUser.email);

	return (
		<div
			className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
			style={{ minHeight: '100vh' }}
		>
			<ul className="list-unstyled">
				<li>
					<Link to="/" style={{ color: '#15D1C8' }}>
						<img src={logo} alt="logo" width="25px" />
						<span className="text-white navName"> Online Doctor's Portal </span>
					</Link>
				</li>
				<li>
						<FontAwesomeIcon icon={faUser} className="text-white" />
						<span className="text-white navName ml-1">{loggedInUser.name}</span>
				</li>
				
				{!patientUser ? (
					<>
						<li>
							<Link to="/dashboard/dashboard" className="text-white">
								<FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/appointment" className="text-white">
								<FontAwesomeIcon icon={faCalendar} /> <span>Appointment</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/patients" className="text-white">
								<FontAwesomeIcon icon={faUsers} /> <span>Patients</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/prescriptions" className="text-white">
								<FontAwesomeIcon icon={faFileAlt} /> <span>Prescriptions</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/doctors" className="text-white">
								<FontAwesomeIcon icon={faUserPlus} /> <span>Add Doctor</span>
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/dashboard/dashboard" className="text-white">
								<FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/my-appointment" className="text-white">
								<FontAwesomeIcon icon={faCalendar} /> <span>My Appointment</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/my-prescriptions" className="text-white">
								<FontAwesomeIcon icon={faFileAlt} /> <span>My Prescriptions</span>
							</Link>
						</li>
						<li>
							<Link to="/dashboard/reviews" className="text-white">
								<FontAwesomeIcon icon={faQuoteLeft} /> <span>Add Review</span>
							</Link>
						</li>
					</>
				)}
				
			</ul>
			<div>
				<Link to="/" className="text-white">
					<FontAwesomeIcon icon={faSignOutAlt} /> <span onClick={() => setLoggedInUser({})}>Logout</span>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
