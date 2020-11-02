const router = require('express').Router();

const CategoryCtrl = require('../controllers/category.ctrl');

router.post('/', CategoryCtrl.addCategory);
router.put('/:id', CategoryCtrl.updateCategory);
router.delete('/:id', CategoryCtrl.deleteCategory);
router.get('/:id', CategoryCtrl.getCategoryById);
router.get('/', CategoryCtrl.getCategories);

module.exports = router;