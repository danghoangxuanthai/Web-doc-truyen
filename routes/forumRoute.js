const forumCtrl = require('../controllers/forumCtrl')
const auth = require('../middleware/auth')
const postCtrl = require("../controllers/postCtrl");
const router = require('express').Router()
router.route('/forum_post')
    .post(auth, forumCtrl.createPost)
    .get(auth, forumCtrl.getPost)
module.exports = router;