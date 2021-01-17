import React from 'react';
import Sidebar from '../../Components/Dashboard/Sidebar';

const Dashboard = () => {

    return (
            <div className="container-fluid row " >
                <Sidebar></Sidebar>
                <div className="col-md-10 p-4 pr-5" style={{position:"absolute", right:0,backgroundColor: "#F4FDFB"}}>
                    <h5>Dashboard</h5>
                    
                </div>
            </div>
    );
};

export default Dashboard;