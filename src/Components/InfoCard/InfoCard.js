import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faPhoneAlt, } from '@fortawesome/free-solid-svg-icons'

const InfoCard = props => {
    const {title, icon , description , bg } = props.info; 
   
    return (
        <div className="col-md-4 text-white mb-2">
            <div className={`${bg} single-info  py-4  px-5 bg-primary  d-flex align-items-center rounded`}>
                <FontAwesomeIcon className="icon mr-4" icon={
                        icon === 'clock' ? faClock :
                        icon === 'location' ? faMapMarkerAlt :
                        faPhoneAlt
                } />
                <div>
                    <h6>{title}</h6>
                    <p className="small m-0">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;