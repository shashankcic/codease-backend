let LearningPath = require('../models/learningPath.model');

addLearningPath = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide a Learning path',
		});
	}

	const learningPath = new LearningPath(body);

	if (!learningPath) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	learningPath
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: learningPath._id,
				message: 'Learning path added!',
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Learning path not added!',
			})
		});
}

updateLearningPath = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	LearningPath.findById(id, (err, learningPath) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Learning path not found',
			});
		}
		learningPath.img = body.img;
		learningPath.name = body.name;
		learningPath.description = body.description;
		
		learningPath
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: learningPath._id,
					message: 'Learning path updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Learning path not updated!',
				});
			})
	})
}

deleteLearningPath = async (req, res) => {
	await LearningPath.findOneAndDelete({ _id: req.params.id }, (err, learningPath) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!learningPath) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Learning path not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: learningPath,
			});
	})
	.catch(err => console.log(err));
}

getLearningPathById = async (req, res) => {
	let id = req.params.id;
	await LearningPath.findById( id, (err, learningPath) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!learningPath) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Learning path not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: learningPath,
			});
	})
	.catch(err => console.log(err));
}

getLearningPaths = async (req, res) => {
	await LearningPath.find({}, (err, learningPaths) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!learningPaths.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Learning paths not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: learningPaths,
			})
	})
	.catch(err => console.log(err));
}

module.exports = {
	addLearningPath,
	updateLearningPath,
	deleteLearningPath,
	getLearningPaths,
	getLearningPathById,
};
