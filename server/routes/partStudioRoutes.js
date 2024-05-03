const router = require('express').Router()
const gltfController = require('../controllers/partStudioController')

router.get('/d/:did/:wvm/:wvmid/e/:eid/gltf', gltfController.getGLTFData)
// router.get('/d/:did/:wvm/:wvmid/e/:eid/boundingboxes', gltfController.getBoundingBoxes)
// router.get('/d/:did/:wvm/:wvmid/e/:eid/massproperties', gltfController.getMassproperties)

module.exports = router