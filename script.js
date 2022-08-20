function emptyList() {
    const list = document.querySelector('main ul')
    const main = document.querySelector('main')
    if(list.childElementCount == 0) {
        main.style.padding = '0';
    } else {
        list.lastElementChild.style.borderBottom = 'none'
    }
}

emptyList();

const addButton = document.querySelector('header button')
const addInput = document.querySelector('header input')
addButton.addEventListener('click', () => {
    let task = addInput.value;
    if(task) {
        addTask(task)
    }
})
addInput.addEventListener('keydown', (e) => {
    let task = addInput.value;
    if(task && ( (e.code === 'Enter') || (e.code === 'NumpadEnter') )) {
        addTask(task)
    }
})

function addTask(task) {
    const taskList = document.querySelector('main ul')

    const newTask = document.createElement('li')

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
}

function checkTask() {
    task = this.parentNode.parentNode.parentNode
    task.classList.toggle('checked')
    console.log("Checking: " + task.innerText)
}