function emptyList() {
    const list = document.querySelector('main ul')
    const main = document.querySelector('main')
    if(!list.childNodes.length) {
        main.style.padding = '0px';
    } else {
        main.style.padding = '5% 3%'
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

    const button = document.createElement('button')

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add('fa-solid', 'fa-trash')

    deleteIcon.addEventListener('click', deleteTask)

    button.appendChild(deleteIcon)
    newTask.appendChild(text)
    newTask.appendChild(button)

    taskList.insertBefore(newTask, taskList.childNodes[0])

    addInput.value = ''
    emptyList();
}

function deleteTask() {
    const task = this.parentNode.parentNode;
    const taskList = task.parentNode;

    taskList.removeChild(task)
    emptyList();
}