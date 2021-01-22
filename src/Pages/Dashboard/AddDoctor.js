import React, { useEffect, useState } from 'react';
import '../../App.css';
import Sidebar from '../../Components/Dashboard/Sidebar';

const AddDoctor = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
    }, []);

	const [ info, setInfo ] = useState({});
	const [ file, setFile ] = useState(null);

	const handleBlur = (e) => {
		const newInfo = { ...info };
		newInfo[e.target.name] = e.target.value;
		setInfo(newInfo);
	};

	const handleFileChange = (e) => {
		const newFile = e.target.files[0];
		setFile(newFile);
	};

	const handleSubmit = () => {
		const formData = new FormData();
		console.log(info);
		formData.append('file', file);
		formData.append('id', Math.round(Math.random() * 100 + 15));
		formData.append('category', info.category);
		formData.append('name', info.name);
		formData.append('education', info.education);
		formData.append('designation', info.designation);
		formData.append('department', info.department);
		formData.append('hospital', info.hospital);
		formData.append('img', info.img);

		fetch('https://online-doctors-portal.herokuapp.com/addADoctor', {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<section className="container-fluid row" style={{ backgroundColor: '#F4FDFB' }}>
			<Sidebar />
			<div id="responsive-dashboard" className="col-md-10 p-4 doctorForm" style={{ position: 'absolute', right: 0, backgroundColor: '#F4FDFB' }}>
				<h5 className="text-brand mb-4">Add a Doctor</h5>
				<form onSubmit={handleSubmit}>
					<div className="form-group col-6">
						<label htmlFor="exampleInputEmail1">Category</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="category"
							placeholder="Enter Category"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Name</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="name"
							placeholder="Enter Your Name"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Education</label>
						<textarea
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="education"
							placeholder="Enter Your Education"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Designation</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="designation"
							placeholder="Enter Your Designation"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Department</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="department"
							placeholder="Enter Your Department"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Hospital</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="hospital"
							placeholder="Enter Your Hospital"
							required={true}
						/>
					</div>
					<div className="form-group col-6 pt-2">
						<label htmlFor="exampleInputPassword1">
							Upload a image in
							<a
								href="https://imgur.com/"
								rel="noopener noreferrer"
								target="_blank"
								className="text-black px-2"
							>
								<strong>imgur</strong>
							</a>
							& Paste the image link here
						</label>
						<input
							onBlur={handleBlur}
							type="text"
							className="form-control"
							name="img"
							placeholder="Upload Picture in imgur and paste the img link here"
							required={true}
						/>
					</div>
					<div className="form-group col-6">
						<label htmlFor="exampleInputPassword1">Upload a image (Optional)</label>
						<input
							onChange={handleFileChange}
							type="file"
							className="form-control"
							id="exampleInputPassword1"
                            placeholder="Picture"
                            required={true}
						/>
					</div>
					<button type="submit" className="btn btn-primary mt-2 ml-3">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};

export default AddDoctor;
