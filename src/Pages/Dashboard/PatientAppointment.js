import React, { useEffect } from 'react';
import AdminCalender from '../../Components/Appointment/AdminCalender';
import Sidebar from '../../Components/Dashboard/Sidebar';
import PatientAppointmentDataTable from '../../Components/DataTables/PatientAppointmentDataTable';

const PatientAppointment = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="container-fluid row ">
			<Sidebar />
			<div
				className="col-md-10 p-4 pr-5"
				id="responsive-dashboard"
				style={{ position: 'absolute', right: 0, backgroundColor: '#F4FDFB', height: '100%' }}
			>
				<h5 className="mb-5">Appointments</h5>
				<div className="row">
					<div className="col-md-6">
						<AdminCalender />
					</div>
					<div className="col-md-6">
						<PatientAppointmentDataTable />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientAppointment;
