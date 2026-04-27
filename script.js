let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // sets the tasks to whatever is in the storage OR an empty array (the defeault)
let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];
let username = localStorage.getItem('username');

// you have to do json.parse to get it to a string value otherwise you get something like [object Object]

if (!username) {
    username = window.prompt("Enter your name:");
    localStorage.setItem('username', username);
}
// saves it in the storage
function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
}
let currentPriority = "low";
const taskList = document.getElementById('taskList');
const finishedTasksList = document.getElementById('finishedTaskList');


const today = new Date().toLocaleDateString(); // new Date is an object that returns the date in a valeu form, .toLocaleDateString() returns day/month/year
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()]; // .getDay() returns an index for each day, so you have to access it with that way
document.getElementById("date").innerHTML = `${weekday}, <strong>${today}</strong>`;

const userGreeting = document.getElementById("userGreeting");

if (username === null || username.trim() === "") {
    userGreeting.innerHTML = `Welcome to your To-DO list, <strong>Guest!</strong>`;
} else {
    userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${username}!</strong>`;
}

userGreeting.innerHTML = `Welcome to your To-Do list,<strong> ${username}!</strong>`;

function updateUi() { // this function gets called when almost anything on the user interface gets changed
    save();
    const taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have ${tasks.length} tasks`;
    document.getElementById("finishedTaskCount").textContent = `You have ${finishedTasks.length} finished tasks`;
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
    if (event.key === "Enter") { // "event" is an object. event.key represents the key on the keyboard that was pressed
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
    updateUi();
});
document.getElementById("clearTaskBtnFinished").addEventListener("click", () => {
    if (finishedTasks.length === 0) {
        alert("you dont even have any finished tasks you can't do that yet")
    }
    const finishedTasksList = document.getElementById('finishedTaskList');
    finishedTasks = [];
    finishedTasksList.innerHTML = '';
    updateUi();
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
        // for some reason, you have to add a new tooltip for each task. Not sure why but chat GPT said it wouldn't work otherwise -- Though im pretty sure it's becuase your creating multiple elemtns,a nd the tooltip has be to registered in the JSS to being with
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el); // class
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

// this is a custom select. The only reason why this exists is becuase I wanted to style it.
select.addEventListener("click", () => {
    options.classList.toggle("hidden"); // the hidden class is what reveals the options. Technically, they're always there, but removing the class creates the illusion of the drop-down
});

options.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        selected.dataset.value = option.dataset.value; // dataset.value takes the value from the html
        currentPriority = option.dataset.value;
        options.classList.add("hidden"); // add the class when an option is picked again to hide the options making it go up
    });
});
document.getElementById("moonToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark"); // by toggling a "dark" class on the body, you can change the theme. This is easily implented with css variavles (see the css)
})
function updateRing() {
    const ring = document.querySelector('.progress-ring');
    const label = document.querySelector('.progress-label');
    const total = tasks.length + finishedTasks.length;
    const percent = total === 0 ? 0 : (finishedTasks.length / total) * 100; // defeault is 0, otherwise the percentage from finished vs total

    let current = parseFloat(ring.style.getPropertyValue('--progress')) || 0; // we're using getPropertyValue becuase the --progress variable is in the css (again see css)

    const animate = () => { // what this is doing in simple terms is it's slowly moving the progress bar. 
        current += (percent - current) * 0.1;
        ring.style.setProperty('--progress', current);
        requestAnimationFrame(animate); // you need to do this anytime you make a custom animation
    };

    animate();
    label.textContent = finishedTasks.length;
}

updateUi();