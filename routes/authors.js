const router = require('express').Router();

const AuthorCtrl = require('../controllers/author.ctrl');

router.post('/', AuthorCtrl.addAuthor);
router.put('/:id', AuthorCtrl.updateAuthor);
router.delete('/:id', AuthorCtrl.deleteAuthor);
router.get('/:id', AuthorCtrl.getAuthorById);
router.get('/', AuthorCtrl.getAuthors);

module.exports = router;