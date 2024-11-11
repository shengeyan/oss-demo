var express = require('express')
var router = express.Router()
var demo = require('../controllers/demo')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })


router.get('/files', demo.getFiles)
router.delete('/files/:fileId', (req, res) => {
  demo.deleteFile(req, res)
})
router.get('/files/delete-all', demo.deleteFileAll)

router.post('/uploadFile', upload.single('file'), demo.uploadFile)
router.get('/download/:id', demo.downloadFile)
router.get('/files/:fileId/preview', demo.previewFile)


module.exports = router
