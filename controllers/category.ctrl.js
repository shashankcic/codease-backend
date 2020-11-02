let Category = require('../models/category.model');

addCategory = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide a Category',
		});
	}

	const category = new Category(body);

	if (!category) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	category
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: category._id,
				message: 'Category added!',
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Category not added!',
			})
		});
}

updateCategory = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	Category.findById(id, (err, category) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Category not found',
			});
		}
		category.img = body.img;
		category.name = body.name;
		category.description = body.description;
		category.learningPath = body.learningPath
		
		category
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: category._id,
					message: 'Category updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Category not updated!',
				});
			})
	})
}

deleteCategory = async (req, res) => {
	await Category.findOneAndDelete({ _id: req.params.id }, (err, category) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!category) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Category not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: category,
			});
	})
	.catch(err => console.log(err));
}

getCategoryById = async (req, res) => {
	let id = req.params.id;
	await Category.findById( id, (err, category) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!category) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Category not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: category,
			});
	})
	.catch(err => console.log(err));
}

getCategories = async (req, res) => {
	await Category.find({}, (err, categories) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!categories.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Categories not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: categories,
			})
	})
	.catch(err => console.log(err));
}

module.exports = {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
};
