const taskField = document.getElementById('task_field')
const taskBtn = document.getElementById('task_btn')
const errorBox = document.getElementById('error_box')
const tasksList = document.getElementById('task_list')

// GET task list
const getTasks = () => new Promise((resolve, reject) => {
    fetch('/tasks', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                let error = new Error("HTTP status code: " + response.status)
                error.response = response
                error.status = response.status
                throw error
            }
            resolve(response)
        })

        .catch((error) => reject(error))
});

window.addEventListener('load', async () => {
    const response = await getTasks()
    list = await response.json()

    list.forEach(element => {
        const task = document.createElement('li')
        task.innerHTML = element.name
        task.id = element.id
        task.className = "todo-list-item"

        const editBtn = document.createElement('button')
        editBtn.innerHTML = "&#x270E"
        editBtn.id = element.id
        editBtn.className = "edit"
        editBtn.onclick = function() { 
            task.innerHTML = ""
            const input = document.createElement('input')
            input.value = element.name
            input.className = "input-task"

            const confirmBtn = document.createElement('button')
            confirmBtn.innerHTML = "Confirmar"
            confirmBtn.className = "confirm"
            confirmBtn.onclick = function() { sendUpdateRequest(element.id, input.value); };

            const cancelBtn = document.createElement('button')
            cancelBtn.innerHTML = "Cancelar"
            cancelBtn.className = "cancel"
            cancelBtn.onclick = function() { location.assign('/') };

            task.appendChild(input)
            task.appendChild(confirmBtn)
            task.appendChild(cancelBtn)
        };

        const removeBtn = document.createElement('button')
        removeBtn.innerHTML = "X"
        removeBtn.id = element.id
        removeBtn.className = "remove"
        removeBtn.onclick = function() { 
            removeTaskData(element.id); 
        };

        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.id = element.id
        checkbox.className = "done"

        task.appendChild(editBtn)
        task.appendChild(removeBtn)
        task.appendChild(checkbox)
        tasksList.appendChild(task)
    })
}, false);


// POST new task 
taskBtn.addEventListener('click', async () => {
    const task = taskField.value
    const data = {
        task: task
    }

    try {
        await createTaskData(data)
        taskField.value = ""
        location.assign('/')

    } catch (error) {
        const errorMessage = await error.response.text()
        errorBox.textContent = errorMessage
    }
});

const createTaskData = (data) => new Promise((resolve, reject) => {
    fetch('/tasks', { method: 'POST', body: JSON.stringify(data) })
        .then(response => {
            if (!response.ok) {
                let error = new Error("HTTP status code: " + response.status)
                error.response = response
                error.status = response.status
                throw error
                
            }
            resolve(response)
        })

        .catch((error) => {
            reject(error)
        })
    });
    
// PUT update task 
async function sendUpdateRequest(elementId, inputValue) {
    const data = {
        task: inputValue
    }

    try {
        await updateTaskData(elementId, data)
        location.assign('/')

    } catch (error) {
        const errorMessage = await error.response.text()
        errorBox.textContent = errorMessage
    }
};

const updateTaskData = (elementId, data) => new Promise((resolve, reject) => {
    fetch('/tasks/' + elementId, { method: 'PUT' , body: JSON.stringify(data) })
        .then(response => {
            if (!response.ok) {
                let error = new Error("HTTP status code: " + response.status)
                error.response = response
                error.status = response.status
                throw error
                
            }
            resolve(response)
        })

        .catch((error) => reject(error))
});

// DELETE task 
const removeTaskData = (elementId) => new Promise((resolve, reject) => {
    fetch('/tasks/' + elementId, { method: 'DELETE' })
        .then(response => {
            resolve(response)
            location.assign('/')
        })

        .catch((error) => reject(error))
});
