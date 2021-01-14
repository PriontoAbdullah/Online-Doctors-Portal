import React from 'react';

const Service = (props) => {
    const {name , img , description} = props.service;
    return (
        <div className="col-md-4 mb-5 text-center">
            <img src={img} alt="icon" width="40%"/>
            <h4 className="my-4 style-color" >{name}</h4>
            <p className="text-secondary">{description}</p>
        </div>
    );
};

export default Service;