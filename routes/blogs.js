const router = require('express').Router();

const BlogCtrl = require('../controllers/blog.ctrl');

router.post('/', BlogCtrl.addBlog);
router.put('/:id', BlogCtrl.updateBlog);
router.delete('/:id', BlogCtrl.deleteBlog);
router.get('/:id', BlogCtrl.getBlogById);
router.get('/', BlogCtrl.getBlogs);

module.exports = router;