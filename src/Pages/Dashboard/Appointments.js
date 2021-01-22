import React, { useEffect } from 'react';
import AdminCalender from '../../Components/Appointment/AdminCalender';
import Sidebar from '../../Components/Dashboard/Sidebar';
import DayAppointmentDataTable from '../../Components/DataTables/DayAppointmentDataTable';

const DashBoardAppointments = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
    }, []);

    return (
            <div className="container-fluid row " >
                <Sidebar></Sidebar>
                <div id="responsive-dashboard" className="col-md-10 p-4 pr-5" style={{position:"absolute", right:0,backgroundColor: "#F4FDFB",height:"100%"}}>
                    <h5 className="mb-5">Appointments</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <AdminCalender />
                        </div>
                        <div className="col-md-6">
                            <DayAppointmentDataTable/>
                        </div>
                    </div>
                    
                </div>
            </div>
    );
};

export default DashBoardAppointments;