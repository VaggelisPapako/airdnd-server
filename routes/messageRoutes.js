const messageController = require('../web/MessageController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the message table is concerned

router.post('/addMessage', messageController.addMessage)
router.get('/getMessagesByUser/:id', messageController.getMessagesByUser)
router.get('/getMessageById/:id', messageController.getMessageById)
router.delete('/deleteMessage/:id', messageController.deleteMessage)

module.exports = router