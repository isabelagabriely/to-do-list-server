const header = require('../header-response')
const { getTasksList, createTaskDomain, updateTaskDomain, deleteTaskDomain } = require('../../domain/ListDomain')
const { getFileContent } = require('../static-file-manager')

const handleGetRequest = async (req, res) => {
    if (req.url.startsWith('/tasks')) {
        var controller = req.url.split('/')[1].trim()

        switch(controller) {
            case 'tasks':
                const tasks = getTasksList()
                header.setJsonContent(res)
                res.end(JSON.stringify(tasks))
                break;
            default:
                header.setBadRequest(res)
                res.end()
                break;
        }
    } else {
        await handleFileContent(req, res)
    }
}

const handlePostRequest = async (req, res) => {
    if (req.url.startsWith('/tasks')) {
        var controller = req.url.split('/')[1].trim()

        switch(controller) {
            case 'tasks':
                const data = await getBodyJSONResponse(req)
                try {
                    createTaskDomain(data)
                    res.end()
                } catch (ex) {
                    res.statusCode = 400
                    res.end(ex)
                }

            default:
                header.setBadRequest(res)
                res.end()
                break;
        }
    } else {
        await handleFileContent(req, res)
    }
}

const handlePutRequest = async (req, res) => {
    if (req.url.startsWith('/tasks/')) {
        var controller = req.url.split('/')[1].trim()
        var taskId = req.url.split('/')[2].trim()

        switch(controller) {
            case 'tasks':
                const data = await getBodyJSONResponse(req)
                try {
                    updateTaskDomain(taskId, data)
                    res.end()
                } catch (ex) {
                    res.statusCode = 400
                    res.end(ex)
                }
            default:
                header.setBadRequest(res)
                res.end()
                break;
        }
    } else {
        await handleFileContent(req, res)
    }
}

const handleDeleteRequest = async (req, res) => {
    if (req.url.startsWith('/tasks/')) {
        var controller = req.url.split('/')[1].trim()
        var taskId = req.url.split('/')[2].trim()

        switch(controller) {
            case 'tasks':
                try {
                    deleteTaskDomain(taskId)
                    res.end()
                } catch (ex) {
                    res.statusCode = 400
                    res.end(ex)
                }
            default:
                header.setBadRequest(res)
                res.end()
                break;
        }
    } else {
        await handleFileContent(req, res)
    }
}

const handleFileContent = async (req, res) => {
    let fileName = req.url.substring(1);
    if (!fileName) {
        fileName = 'page.html'
        header.setHtmlContent(res)
    }

    let fileContent = ''

    if (fileName.startsWith("images")) {
        fileContent = await getFileContent(fileName)
        header.setImageContent(res)
    }
    else {
        fileContent = await getFileContent(fileName, true)
        header.setSuccess(res)
    }

    res.end(fileContent)
}

const getBodyJSONResponse = (req) => new Promise((resolve) => {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        resolve(JSON.parse(data));
    });
})

module.exports = {
    handleGetRequest,
    handlePostRequest,
    handlePutRequest,
    handleDeleteRequest
}