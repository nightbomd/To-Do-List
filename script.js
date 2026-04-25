let tasks = []; // nah ts is emptpy fr fr
let finishedTasks = [];
let currentPriority = "low";
const taskList = document.getElementById('taskList');
const finishedTasksList = document.getElementById('finishedTaskList');


const today = new Date().toLocaleDateString();
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
document.getElementById("date").innerHTML = `${weekday}, <strong>${today}</strong>`;
const username = window.prompt("Enter your name:");
const userGreeting = document.getElementById("userGreeting");

if (username === null || username.trim() === "") {
    userGreeting.innerHTML = `Welcome to your To-DO list, <strong>Guest!</strong>`;
} else {
    userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${username}!</strong>`;
}

userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${username}!</strong>`;

function updateUi() {
    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have ${tasks.length} tasks`;
    if (tasks.length === 0 && !taskList.querySelector('.muted-text')) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("text-muted", "m-auto", "muted-text");
        emptyMessage.textContent = "No tasks available! try adding a task so you can actually use the website.";
        taskList.appendChild(emptyMessage);
    }
    if (finishedTasks.length === 0 && !finishedTasksList.querySelector('.muted-text')) {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("text-muted", "m-auto", "muted-text");
        emptyMessage.textContent = "You've Completed absolutely NO TASKS!!!!";
        finishedTasksList.appendChild(emptyMessage);
    }

}
function addTask() {
    const taskInput = document.getElementById("taskInput");


    if (taskInput.value.trim() !== '') {
        tasks.push({
            // object btw. You can push an object into an array just so you know
            text: taskInput.value,
            createdAt: new Date().toLocaleDateString(),
            priority: currentPriority   
        });
        displayTasks();
        taskInput.value = '';   
    }
    else {
        alert('you gotta add something my guy')
    }
    updateUi();
}
document.getElementById("addTaskBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
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
        li.classList.add('list-item', 'd-flex', 'align-items-center', 'justify-content-between', "gap-2");
        li.innerHTML = `
        <div class="task-content">
             <img src="calendar.png" class="img-fluid" id="calendar-svg" data-bs-toggle="tooltip" data-bs-placement="top" title="${task.createdAt}">
             <span class="task-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; flex: 1;">${task.text}</span>
        </div>
        <div class="d-flex justify-content-end align-items-center gap-3">
            <button class="check" onclick="removeTask(${index})"></button>
             <span class="priority ${task.priority}">${task.priority}</span>
        </div>`;

        taskList.appendChild(li);
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    });
}

function removeTask(index) {
    const mutedMsg = document.getElementById('finishedTaskList').querySelector('.muted-text');
    if (mutedMsg) mutedMsg.remove();

    const completedTask = tasks[index];
    finishedTasks.push(completedTask);
    tasks.splice(index, 1);

    let li = document.createElement('li');
    li.classList.add('list-item', "d-flex", "justify-content-between", "align-items-center")
    li.innerHTML = `
  <span>${completedTask.text}</span>
  <span class="priority ${completedTask.priority}">
    ${completedTask.priority}
  </span>
`;
    finishedTasksList.appendChild(li);

    displayTasks();
    updateUi();
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
        currentPriority = option.dataset.value;
        options.classList.add("hidden");
    });
});
updateUi();