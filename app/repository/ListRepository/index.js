const tasksList = []

// MÉTODO GET 
const getTasks = () => tasksList

// MÉTODO POST
const createTask = (data) => {
    tasksList.push({id: tasksList.length+1, name: data.task})
    console.log("Task criada com sucesso!")
    console.log(tasksList)
}

// MÉTODO PUT 
const updateTask = (taskId, data) => {
    taskIndex = tasksList.findIndex((task => task.id == taskId));
    console.log("Before: ", tasksList[taskIndex]);
    tasksList[taskIndex].name = data.task;
    console.log("After: ", tasksList[taskIndex]);
    console.log("Task", taskId, "atualizada com sucesso!")
}

// MÉTODO DELETE 
const deleteTask = (taskId) => {
    taskIndex = tasksList.findIndex((task => task.id == taskId));
    console.log("Before: ", tasksList);
    tasksList.splice(taskIndex, 1);
    console.log("After: ", tasksList);
    console.log("Task", taskId, "deletada com sucesso!")
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
