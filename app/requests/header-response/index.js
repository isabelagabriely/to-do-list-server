const setSuccess = (res) => res.statusCode = 200
const setError = (res) => res.statusCode = 500
const setBadRequest = (res) => res.statusCode = 405

const setHtmlContent = (res) => {
    setSuccess(res)
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
}

const setImageContent = (res) => {
    setSuccess(res)
    res.setHeader('Content-Type', 'image/png');
}

const setJsonContent = (res) => {
    setSuccess(res)
    res.setHeader('Content-Type', 'application/json');
}

module.exports = {
    setSuccess,
    setError,
    setBadRequest,
    setHtmlContent,
    setImageContent,
    setJsonContent
}
