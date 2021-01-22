import React, { useEffect } from 'react';
import Sidebar from '../../Components/Dashboard/Sidebar';
import DataTable from '../../Components/DataTables/DataTable';
import PatientsDataTable from '../../Components/DataTables/PatientsDataTable';

const Patients = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<div className="container-fluid row ">
			<Sidebar />
			<div id="responsive-dashboard" className="col-md-10 p-4 pr-5" style={{ position: 'absolute', right: 0, backgroundColor: '#F4FDFB' }}>
				<h5 className="mb-5">Patients</h5>
				<DataTable tableName="All Patients">
					<PatientsDataTable />
				</DataTable>
			</div>
		</div>
	);
};

export default Patients;
