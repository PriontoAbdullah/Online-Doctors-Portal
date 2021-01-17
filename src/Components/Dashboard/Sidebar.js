import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faCog, faGripHorizontal, faSignOutAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../App';
import logo from '../../images/logo.png';
import './Sidebar.css';

const Sidebar = () => {
	const { loggedInUser, setLoggedInUser } = useContext(DataContext);

	return (
		<div
			className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4"
			style={{ height: '100vh' }}
		>
			<ul className="list-unstyled">
				<li>
					<Link to="/" style={{ color: '#15D1C8' }}>
						<img src={logo} alt="logo" width="25px" />
						<span className="text-white navName"> Online Doctor's Portal </span>
					</Link>
				</li>
				<li>
					<FontAwesomeIcon icon={faUser} className="text-white"/>
					<span className="text-white navName ml-1">{loggedInUser.name}</span>
				</li>
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
					<Link to="/dashboard/setting" className="text-white">
						<FontAwesomeIcon icon={faCog} /> <span>Setting</span>
					</Link>
				</li>
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
