const { getTasks, createTask, updateTask, deleteTask } = require('../../repository/ListRepository')
const mapper = require('./mapper')

const validateRequestData = (requestData) => {
    if(!requestData.task?.trim()) {
        throw "A tarefa não pode ser vazia."
    }
}

// MÉTODO GET 
const getTasksList = () =>
    getTasks()

// MÉTODO POST 
const createTaskDomain = (requestData) => {
    validateRequestData(requestData)
    createTask(mapper(requestData))
}

// MÉTODO PUT 
const updateTaskDomain = (taskId, requestData) => {
    validateRequestData(requestData)
    updateTask(taskId, mapper(requestData))
}

// MÉTODO DELETE 
const deleteTaskDomain = (taskId) => {
    deleteTask(taskId)
}

module.exports = {
    getTasksList,
    createTaskDomain,
    updateTaskDomain,
    deleteTaskDomain
}
