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

    // Add event listener for the delete button

    button.appendChild(deleteIcon)
    newTask.appendChild(text)
    newTask.appendChild(button)

    taskList.insertBefore(newTask, taskList.childNodes[0])

    addInput.value = ''
}