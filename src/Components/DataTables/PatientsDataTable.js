import React, { useContext } from 'react';
import { DataContext } from '../../App';

const PatientsDataTable = () => {
	const ContextData = useContext(DataContext);
	let srNo = 1;

	return (
		<table className="table table-borderless">
			<thead>
				<tr>
					<th className="text-secondary text-left" scope="col">
						Sr No
					</th>
					<th className="text-secondary" scope="col">
						Name
					</th>
					<th className="text-secondary" scope="col">
						Gender
					</th>
					<th className="text-secondary" scope="col">
						Age
					</th>
					<th className="text-secondary" scope="col">
						Weight
					</th>
					<th className="text-secondary" scope="col">
						Phone
					</th>
					<th className="text-secondary" scope="col">
						Email
					</th>
					<th className="text-secondary" scope="col">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				{ContextData.allPatients.map((patient) => (
					<tr>
						<td>{srNo++}</td>
						<td>{patient.name.substr(0, 16)}</td>
						<td>{patient.gender}</td>
						<td>{patient.age}</td>
						<td>{patient.weight}KG</td>
						<td>{patient.phone}</td>
						<td>{patient.email}</td>
						<td>
							<button className="btn btn-primary">
								<a
									href={`https://mail.google.com/mail/?view=cm&fs=1&to=${patient.email}`}
									rel="noopener noreferrer"
                                    target="_blank"
                                    className="text-white"
								>
									Send Email
								</a>
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default PatientsDataTable;
