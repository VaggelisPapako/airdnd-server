const userListingParamsController = require('../web/UserListingParamsController.js')
const router = require('express').Router()

// These are all the paths that the server app includes as far as the userListingParams table is concerned

router.post('/createMatrixValues', userListingParamsController.createMatrixValues)
router.delete('/deleteMatrixValues', userListingParamsController.deleteMatrixValues)

module.exports = router