let Module = require('../models/module.model');

addModule = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide a Module',
		});
	}

	const module = new Module(body);

	if (!module) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	module
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: module._id,
				message: 'Module added!',
				data: module, 
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Module not added!',
			})
		});
}

updateModule = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	Module.findById(id, (err, module) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Module not found',
			});
		}
		module.img = body.img;
		module.name = body.name;
		module.description = body.description;
		module.learningPathName = body.learningPathName;
		module.category = body.category;
		module.authorName = body.authorName;
		module.price = body.price;
		module.priceCurrency = body.priceCurrency;
		module.durationUnit = body.durationUnit;
		module.duration = body.duration;
		module.ratingCount = body.ratingCount;
		module.stars = body.stars;
		module.heading = body.heading;
		module.body = body.body;
		module.field = body.field;
		module.ideLink = body.ideLink;
		
		module
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: module._id,
					message: 'Module updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Module not updated!',
				});
			})
	})
}

deleteModule = async (req, res) => {
	await Module.findOneAndDelete({ _id: req.params.id }, (err, module) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!module) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Module not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: module,
			});
	})
	.catch(err => console.log(err));
}

getModuleById =  (req, res) => {
	let id = req.params.id;
	Module.findById( id, (err, module) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!module) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Module not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: module,
			});
	})
	.catch(err => console.log(err));
}

getModules = async (req, res) => {
	await Module.find({}, (err, modules) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!modules.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Modules not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: modules,
			})
	})
	.catch(err => console.log(err));
}

module.exports = {
	addModule,
	updateModule,
	deleteModule,
	getModules,
	getModuleById,
};
