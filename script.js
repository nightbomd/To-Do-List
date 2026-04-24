let tasks = []; // nah ts is emptpy fr fr
let finishedTasks = [];
let currentPriority = "low";

document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        tasks.push(taskInput.value);
        displayTasks();
        taskInput.value = '';
    }
    else {
        alert('you gotta add something my guy')
    }
})
document.getElementById("clearTaskBtn").addEventListener("click", () => {
    if (tasks.length === 0) {
        alert("you dont even have any tasks you can't do that yet")
    }
    const taskList = document.getElementById('taskList');
    tasks = [];
    taskList.innerHTML = '';
});

function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.classList.add('list-item', "d-flex", "justify-content-between", "align-items-center")
        li.innerHTML = `${task} <button class="check" onclick="removeTask(${index})">✓</button>`;
        taskList.appendChild(li);
    });
}

function removeTask(index) {
    const finishedTasksList = document.getElementById('finishedTaskList');
    const completedTask = tasks[index];
    finishedTasks.push(completedTask);
    tasks.splice(index, 1);

    let li = document.createElement('li');
    li.classList.add('list-item', "d-flex", "justify-content-between", "align-items-center")
    li.innerHTML = `${completedTask}`;
    finishedTasksList.appendChild(li);

    displayTasks();
}                                                  

const select = document.querySelector(".custom-select");
const selected = select.querySelector(".selected");
const options = select.querySelector(".options");

select.addEventListener("click", () => {
    options.classList.toggle("hidden");
});

options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        selected.dataset.value = option.dataset.value;
        options.classList.add("hidden");
    });
});