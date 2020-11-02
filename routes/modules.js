const router = require('express').Router();

const ModuleCtrl = require('../controllers/module.ctrl');

router.post('/', ModuleCtrl.addModule);
router.put('/:id', ModuleCtrl.updateModule);
router.delete('/:id', ModuleCtrl.deleteModule);
router.get('/:id', ModuleCtrl.getModuleById);
router.get('/', ModuleCtrl.getModules);

module.exports = router;