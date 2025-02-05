document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskText = document.getElementById("task").value;
    let taskTime = document.getElementById("task-time").value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText} - ${taskTime || "No date set"}</span>
        <div>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="completeTask(this)">✔</button>
            <button onclick="deleteTask(this)">✖</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    document.getElementById("task").value = "";
    document.getElementById("task-time").value = "";
}

function completeTask(button) {
    let li = button.parentElement.parentElement;
    li.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    let li = button.parentElement.parentElement;
    li.remove();
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement.parentElement;
    let taskDetails = li.firstChild.textContent.split(" - ");
    let newTaskText = prompt("Edit Task:", taskDetails[0]);
    let newTaskTime = prompt("Edit Time (YYYY-MM-DD HH:MM):", taskDetails[1]);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        li.innerHTML = `
            <span>${newTaskText} - ${newTaskTime || "No date set"}</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="completeTask(this)">✔</button>
                <button onclick="deleteTask(this)">✖</button>
            </div>
        `;
    }
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("task-list").innerHTML);
}

function loadTasks() {
    let tasks = localStorage.getItem("tasks");
    if (tasks) {
        document.getElementById("task-list").innerHTML = tasks;
    }
}
