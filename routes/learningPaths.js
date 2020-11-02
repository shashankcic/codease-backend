const router = require('express').Router();

const LearningPathCtrl = require('../controllers/learningPath.ctrl');

router.post('/', LearningPathCtrl.addLearningPath);
router.put('/:id', LearningPathCtrl.updateLearningPath);
router.delete('/:id', LearningPathCtrl.deleteLearningPath);
router.get('/:id', LearningPathCtrl.getLearningPathById);
router.get('/', LearningPathCtrl.getLearningPaths);

module.exports = router;