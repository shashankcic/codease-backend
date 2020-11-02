const router = require('express').Router();

const ImageCtrl = require('../controllers/image.ctrl');

router.post('/', ImageCtrl.addImage);
router.put('/:id', ImageCtrl.updateImage);
router.delete('/:id', ImageCtrl.deleteImage);
router.get('/:id', ImageCtrl.getImageById);
router.get('/', ImageCtrl.getImages);

module.exports = router;