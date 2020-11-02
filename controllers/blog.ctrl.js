let Blog = require('../models/blog.model');

addBlog = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide a Blog',
		});
	}

	const blog = new Blog(body);

	if (!blog) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	blog
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: blog._id,
				message: 'Blog added!',
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Blog not added!',
			})
		});
}

updateBlog = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	Blog.findById(id, (err, blog) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Blog not found',
			});
		}
		blog.img = body.img;
		blog.name = body.name;
		blog.aId = body.aId;
		blog.commentCount = body.commentCount;
		blog.comments = body.comments;
		blog.claps = body.claps;
		blog.text = body.text;
		
		blog
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: blog._id,
					message: 'Blog updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Blog not updated!',
				});
			})
	})
}

deleteBlog = async (req, res) => {
	await Blog.findOneAndDelete({ _id: req.params.id }, (err, blog) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!blog) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Blog not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: blog,
			});
	})
	.catch(err => console.log(err));
}

getBlogById = async (req, res) => {
	let id = req.params.id;
	await Blog.findById( id, (err, blog) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!blog) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Blog not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: blog,
			});
	})
	.catch(err => console.log(err));
}

getBlogs = async (req, res) => {
	await Blog.find({}, (err, blogs) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!blogs.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Blogs not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: blogs,
			})
	})
	.catch(err => console.log(err));
}

module.exports = {
	addBlog,
	updateBlog,
	deleteBlog,
	getBlogs,
	getBlogById,
};
