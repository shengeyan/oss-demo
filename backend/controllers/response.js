// resonse 
const sendResponse = (res, code, message, data = {}) => {
  res.status(code).json({
    code,
    message,
    data,
  })
}

module.exports = sendResponse
