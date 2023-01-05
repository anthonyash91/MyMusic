const express = require('express')
const router = express.Router()
const { albumsDataController, albumsApiController } = require('../../controllers/api/albums')

router.get('/', albumsDataController.index, albumsApiController.index)
router.delete('/:id', albumsDataController.destroy, albumsApiController.show)
router.put('/:id', albumsDataController.update, albumsApiController.show)
router.post('/', albumsDataController.create, albumsApiController.show)

module.exports = router
