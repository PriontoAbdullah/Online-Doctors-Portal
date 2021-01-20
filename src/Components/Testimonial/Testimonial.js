import React from 'react';

const Testimonial = (props) => {
	const { quote, name, from, img } = props.reviews;
	return (
		<div className="card-deck mt-4 mb-5">
			<div className="card shadow-sm">
				<div class="card-body">
					<p class="card-text text-center">{quote}</p>
				</div>
				<div className="card-footer d-flex  align-items-center">
					<img className="mx-3" src={img} alt="patient" width="60" style={{ borderRadius: '50%' }} />
					<div>
						<h6 className="text-primary">{name}</h6>
						<p className="m-0">{from}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
