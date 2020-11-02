let Author = require('../models/author.model');

getAuthors = async (req, res) => {
	await Author.find({}, (err, authors) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!authors.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Authors not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: authors,
			})
	})
	.catch(err => console.log(err));
}

addAuthor = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide an author',
		});
	}

	const author = new Author(body);

	if (!author) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	author
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: author._id,
				message: 'Author added!',
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Author not added!',
			})
		});
}

getAuthorById = async (req, res) => {
	let id = req.params.id;
	await Author.findById( id, (err, author) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!author) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Author not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: author,
			});
	})
	.catch(err => console.log(err));
}

deleteAuthor = async (req, res) => {
	await Author.findOneAndDelete({ _id: req.params.id }, (err, author) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!author) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Author not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: author,
			});
	})
	.catch(err => console.log(err));
}

updateAuthor = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	Author.findById(id, (err, author) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Author not found',
			});
		}
		author.img = body.img;
		author.name = body.name;
		author.work = body.work;
		author.about = body.about;
		
		author
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: author._id,
					message: 'Author updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Author not updated!',
				});
			})
	})
}

module.exports = {
	getAuthors,
	getAuthorById,
	addAuthor,
	deleteAuthor,
	updateAuthor,
};