import React from 'react';
import infos from '../../Data/infos';
import InfoCard from '../InfoCard/InfoCard';
import './Infos.css';
const Infos = () => {
    return (
        <div className="infos">
            <div className="container">
                <div class="row mt-5">
                    
                    {
                       infos.map(info => <InfoCard info={info}/> ) 
                    }
                    
                </div>
            </div>
            
        </div>
    );
};

export default Infos;