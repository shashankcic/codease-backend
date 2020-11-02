let Image = require('../models/image.model');

addImage = (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success:false,
			error: 'You must provide an Image',
		});
	}

	const image = new Image(body);

	if (!image) {
		return res.status(400).json({
			success: false,
			error: err,
		});
	}

	image
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: image._id,
				message: 'Image added!',
			})
		})
		.catch(err => {
			return res.status(400).json({
				err,
				message: 'Image not added!',
			})
		});
}

updateImage = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update',
		});
	}

	let id = req.params.id;
	Image.findById(id, (err, image) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Image not found',
			});
		}
		image.imgName = body.imgName;
		image.imgPath = body.imgPath;
		image.errTitle = body.errTitle;
		image.errText = body.errText;
		
		image
			.save()
			.then(() => {
				return res.status(200).json({
					succes: true,
					id: image._id,
					message: 'Image updated!',
				});
			})
			.catch(err => {
				return res.status(400).json({
					err,
					message: 'Image not updated!',
				});
			})
	})
}

deleteImage = async (req, res) => {
	await Image.findOneAndDelete({ _id: req.params.id }, (err, image) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: err,
			});
		}

		if (!image) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Image not found`,
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: image,
			});
	})
	.catch(err => console.log(err));
}

getImageById = async (req, res) => {
	let id = req.params.id;
	await Image.findById( id, (err, image) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!image) {
			return res 
				.status(404)
				.json({
					success: false,
					error: `Image not found`
				})
		}

		return res
			.status(200)
			.json({
				success: true,
				data: image,
			});
	})
	.catch(err => console.log(err));
}

getImages = async (req, res) => {
	await Image.find({}, (err, images) => {
		if (err) {
			return res
				.status(400)
				.json({
					success: false,
					error: err,
				});
		}

		if (!images.length) {
			return res
				.status(404)
				.json({
					success: false,
					error: `Images not found`
				});
		}

		return res
			.status(200)
			.json({
				success: true,
				data: images,
			})
	})
	.catch(err => console.log(err));
}

module.exports = {
	addImage,
	updateImage,
	deleteImage,
	getImages,
	getImageById,
};
