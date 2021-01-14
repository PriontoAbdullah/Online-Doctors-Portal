import React from 'react';

const BlogPost = (props) => {
	const { title, description, author, authorImg, date } = props.blog;
	return (
		<div className="card shadow-sm mb-4">
			<div className="card-header d-flex  align-items-center">
				<img className="mx-3" src={authorImg} alt="" width="60" />
				<div>
					<h6 className="text-primary">{author}</h6>
					<p className="m-0">{date}</p>
				</div>
			</div>
			<div class="card-body">
				<h5 className="style-color">{title}</h5>
				<p class="card-text text-secondary mt-4">{description}</p>
			</div>
		</div>
	);
};

export default BlogPost;
