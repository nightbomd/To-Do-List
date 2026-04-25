let tasks = []; // nah ts is emptpy fr fr
let finishedTasks = [];
let currentPriority = "low";
const taskList = document.getElementById('taskList');
const finishedTasksList = document.getElementById('finishedTaskList');

function updateUi() {
    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have ${tasks.length} tasks`;
    if (tasks.length === 0) {
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
        tasks.push(taskInput.value);
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
             <img src="calendar.png" class="img-fluid" id="calendar-svg">
             <span class="task-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; flex: 1;">${task}</span>
        </div>
        <div class="d-flex justify-content-end align-items-center gap-3">
            <button class="check" onclick="removeTask(${index})"></button>
             <span class="priority ${currentPriority}">${currentPriority}</span>
        </div>`;

        taskList.appendChild(li);
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
    li.innerHTML = `${completedTask}`;
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
        options.classList.add("hidden");
    });
});
updateUi();