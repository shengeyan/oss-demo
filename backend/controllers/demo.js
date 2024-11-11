const sendResponse = require('./response.js')

// Mock 数据
let { mockFiles } = require('../mock/data.js')

// 上传文件
exports.uploadFile = (req, res) => {
  const file = req.file
  if (!file) {
    return sendResponse(res, 400, 'No file provided')
  }

  const newFile = {
    id: (mockFiles.length + 1).toString(),
    name: file.originalname || `file${mockFiles.length + 1}.txt`,
    size: `${(file.size / 1024).toFixed(2)} KB`,
    type: 'Text',
    modified: new Date().toISOString(),
    content: 'This is an example file.'
  }

  mockFiles.push(newFile)
  sendResponse(res, 200, 'successfully', mockFiles)
}

// 获取文件列表
exports.getFiles = (req, res) => {
  sendResponse(res, 200, 'successfully', mockFiles)
}

// 删除文件
exports.deleteFile = (req, res) => {
  const { fileId } = req.params
  const initialLength = mockFiles.length
  mockFiles = mockFiles.filter(file => file.id !== fileId)

  if (mockFiles.length === initialLength) {
    return sendResponse(res, 404, 'File not found')
  }

  sendResponse(res, 200, 'File deleted successfully', mockFiles)
}

// 删除全部文件
exports.deleteFileAll = (req, res) => {
  sendResponse(res, 200, 'File deleted successfully', [])
}

// 下载文件
exports.downloadFile = (req, res) => {
  const fileId = req.params.id
  const file = mockFiles.find((f) => f.id === fileId)

  if (!file) {
    return sendResponse(res, 400, 'not found file')
  }

  const fileData = {
    id: file.id,
    name: file.name,
    size: file.size,
    type: file.type,
    modified: file.modified,
    content: file.content,
  }

  sendResponse(res, 200, 'successfully', fileData)
}


// 预览文件
exports.previewFile = (req, res) => {
  const { fileId } = req.params
  const file = mockFiles.find((f) => f.id === fileId)

  if (!file) {
    sendResponse(res, 404, 'fail')
  }

  res.setHeader('Content-Type', 'application/octet-stream')
  res.send(file.content)
}