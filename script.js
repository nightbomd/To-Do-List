let tasks = []; // nah ts is emptpy fr fr

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
        li.classList.add('list-group-item', "d-flex", "justify-content-between", "align-items-center")
        li.innerHTML = `${task} <button class="btn btn-success btn-sm" onclick="removeTask(${index})">✓</button>`;
        taskList.appendChild(li);
    });
}
