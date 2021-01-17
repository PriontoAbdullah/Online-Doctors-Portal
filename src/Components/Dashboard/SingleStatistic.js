import React from 'react';

const SingleStatistic = (props) => {
    return (
        <div className="col-md-3">
            <div className={"d-flex align-items-center p-3 px-4  rounded text-white " + props.classToAdd}>
                 <h1 className="w-25 mr-2">{props.data.count}</h1>
                 <h6>{props.data.title}</h6>
            </div>
        </div>
    );
};

export default SingleStatistic;