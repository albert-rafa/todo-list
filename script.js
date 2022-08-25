var data = (window.localStorage.getItem('taskList')) ? JSON.parse(window.localStorage.getItem('taskList')) : [];

const addButton = document.querySelector('header button')
const addInput = document.querySelector('header input')
addButton.addEventListener('click', () => {
    let task = addInput.value;
    if(task) {
        addTask(task, false)
    }
})
addInput.addEventListener('keydown', (e) => {
    let task = addInput.value;
    if(task && ( (e.code === 'Enter') || (e.code === 'NumpadEnter') )) {
        addTask(task, false)
    }
})

displayStorage();
emptyList();

function emptyList() {
    const list = document.querySelector('main ul')
    const main = document.querySelector('main')
    if(list.childElementCount == 0) {
        main.style.padding = '0';
    } else {
        list.lastElementChild.style.borderBottom = 'none'
    }
}

function addTask(task, check) {
    createTask(task)
    addStorage(task, check)
}
function createTask(task, check) {
    const taskList = document.querySelector('main ul')
    
    const newTask = document.createElement('li')
    if (check) { newTask.classList.add('checked') }
    
    const text = document.createElement('span')
    text.classList.add('task-text')
    text.innerText = task
    
    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    
    const checkButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('fa-solid', 'fa-check', 'fa-lg')
    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'fa-lg')
    
    deleteIcon.addEventListener('click', deleteTask)
    checkIcon.addEventListener('click', checkTask)
    
    checkButton.appendChild(checkIcon)
    deleteButton.appendChild(deleteIcon)
    buttons.append(checkButton, deleteButton)
    newTask.appendChild(text)
    newTask.appendChild(buttons)
    
    taskList.insertBefore(newTask, taskList.childNodes[0])
    
    addInput.value = ''
    emptyList();
}

function deleteTask() {
    const task = this.parentNode.parentNode.parentNode;
    const taskList = task.parentNode;

    console.log("Deleting: " + task.innerText)

    taskList.removeChild(task)
    emptyList();

    delStorage(task.innerText)
}

function checkTask() {
    task = this.parentNode.parentNode.parentNode
    task.classList.toggle('checked')
    console.log("Checking: " + task.innerText)

    delStorage(task.innerText)
    addStorage(task.innerText, task.classList.contains('checked'))
}

function displayStorage() {
    for (let i = 0; i < data.length; i++) {
        const text = data[i].task
        const checked = data[i].check
        createTask(text, checked)
    }
}

function updateStorage() {
    window.localStorage.setItem('taskList', JSON.stringify(data))
}

function addStorage(t, c) {
    const tempTask = {
        task: t,
        check: c
    }
    data.unshift(tempTask) // add at the beginning

    updateStorage()
}

function delStorage(task) {
    const search = data.find(t => t.task === task)
    const index = data.indexOf(search)
    data.splice(index,1)

    updateStorage()
}