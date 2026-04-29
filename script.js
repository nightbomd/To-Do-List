let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];
let username = localStorage.getItem('username');

if (!username) {
    username = window.prompt("Enter your name:");
    localStorage.setItem('username', username);
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
}

let currentPriority = "low";
const taskList = document.getElementById('taskList');
const finishedTasksList = document.getElementById('finishedTaskList');

const today = new Date().toLocaleDateString();
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
document.getElementById("date").innerHTML = `${weekday}, <strong>${today}</strong>`;

const userGreeting = document.getElementById("userGreeting");

if (username === null || username.trim() === "") {
    userGreeting.innerHTML = `Welcome to your To-DO list, <strong>Guest!</strong>`;
} else {
    userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${username}!</strong>`;
}


function updateUi() {
    save();
    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have ${tasks.length} tasks`;
    document.getElementById("finishedTaskCount").textContent = `You have ${finishedTasks.length} finished tasks today`;
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
  
    updateRing();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() !== '') {
        tasks.push({
            text: taskInput.value,
            createdAt: new Date().toLocaleDateString(),
            priority: currentPriority
        });
        displayTasks();
        taskInput.value = '';
    } else {
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
    if (confirm("Are you sure you want to delete ALL tasks? this CANNOT be undone.") && tasks.length > 0) {
        const taskList = document.getElementById('taskList');
        tasks = [];
        taskList.innerHTML = '';
        updateUi();
    }
});

document.getElementById("clearTaskBtnFinished").addEventListener("click", () => {
    if (finishedTasks.length === 0) {
        alert("you dont even have any finished tasks you can't do that yet")
    }
    if (confirm("Are you sure you want to delete ALL finished tasks? this CANNOT be undone.") && finishedTasks.length > 0) {
        const finishedTasksList = document.getElementById('finishedTaskList');
        finishedTasks = [];
        finishedTasksList.innerHTML = '';
        updateUi();
    }
});

function displayTasks(filteredTasks = tasks) {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
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


function displayFinishedTasks() {
    finishedTasksList.innerHTML = "";
    finishedTasks.forEach((task) => {
        let li = document.createElement('li');
        li.classList.add('list-item', "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
        <span>${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>`;
        finishedTasksList.appendChild(li);
    });
}

function removeTask(index) {
    const mutedMsg = document.getElementById('finishedTaskList').querySelector('.muted-text');
    if (mutedMsg) mutedMsg.remove();

    const completedTask = tasks[index];
    finishedTasks.push(completedTask);
    tasks.splice(index, 1);

    displayFinishedTasks();
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

document.getElementById("moonToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const img = document.getElementById("svg");
    if (document.body.classList.contains("dark")) {
        img.src = "moonReal.png";
    } else {
        img.src = "download.png";
    }
});
document.getElementById("settingsToggle").addEventListener("click", () => {
    const overLay = document.getElementById("settingsOverlay")
    const modal = document.getElementById("settingsModal")
   
    if (overLay.classList.contains("hidden") && modal.classList.contains("hidden")) {
        overLay.classList.remove("hidden");
        modal.classList.remove("hidden");
    }
    else {
        overLay.classList.add("hidden");
        modal.classList.add("hidden");
    }

});
function closeSettings() {
    document.getElementById("settingsOverlay").classList.add("hidden");
    document.getElementById("settingsModal").classList.add("hidden");
    document.getElementById('settingsMessage').textContent = "";
}
function saveUserName() {
    const newUsername = document.getElementById("usernameInput").value;
    localStorage.setItem('username', newUsername);
    userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${newUsername}!</strong>`;
   
    document.getElementById('settingsMessage').textContent = "Your changes have been saved.";
}

function updateRing() {
    const ring = document.querySelector('.progress-ring');
    const label = document.querySelector('.progress-label');
    const total = tasks.length + finishedTasks.length;
    const percent = total === 0 ? 0 : (finishedTasks.length / total) * 100;

    let current = parseFloat(ring.style.getPropertyValue('--progress')) || 0;

    const animate = () => {
        current += (percent - current) * 0.1;
        ring.style.setProperty('--progress', current);
        requestAnimationFrame(animate);
    };

    animate();
    label.textContent = finishedTasks.length;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(value));
    displayTasks(filteredTasks);
});
displayTasks();
displayFinishedTasks();
updateUi();