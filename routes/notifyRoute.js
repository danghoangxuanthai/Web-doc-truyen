const router = require('express').Router()
const auth = require('../middleware/auth')
const notifyCtrl = require('../controllers/notifyCtrl')

router.post('/notify', auth, notifyCtrl.createNotify)
router.delete('/notify/:id', auth, notifyCtrl.removeNotify)
router.get('/notifies', auth, notifyCtrl.getNotify)
router.patch('/isreadnotify/:id', auth, notifyCtrl.isRead)
router.delete('/deleteallnotify/:id', auth, notifyCtrl.deleteAll)

module.exports = router;