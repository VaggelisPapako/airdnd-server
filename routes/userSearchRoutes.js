const userSearchController = require('../web/UserSearchController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the userSearch table is concerned

router.post('/addUserSearch', userSearchController.addUserSearch)

module.exports = router