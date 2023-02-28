const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth')
const router = require('express').Router()

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(postCtrl.getPost)

router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)
    .delete(auth, postCtrl.deletePost)

router.get('/user_post/:id', auth, postCtrl.getOnePost)


router.patch('/post/:id/like', auth, postCtrl.likePost)
router.patch('/post/:id/unlike', auth, postCtrl.unlikePost)
router.get('/profile/:id', auth, postCtrl.getUserPost)
router.patch('/save/:id', auth, postCtrl.savePost)
router.patch('/unsave/:id',auth, postCtrl.removeSavePost)

module.exports = router;