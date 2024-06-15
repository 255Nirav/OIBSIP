
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") return;

    var task = {
        text: taskText,
        addedAt: new Date(),
        completed: false,
        completedAt: null
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        tasks[index].completedAt = new Date();
    } else {
        tasks[index].completedAt = null;
    }
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function renderTasks() {
    var pendingTasksList = document.getElementById("pendingTasks");
    var completedTasksList = document.getElementById("completedTasks");
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.forEach(function (task, index) {
        var taskItem = document.createElement("li");
        taskItem.className = "task-item" + (task.completed ? " completed" : "");

        var taskText = document.createTextNode(task.text);
        taskItem.appendChild(taskText);

        if (!task.completed) {
            var completeButton = document.createElement("button");
            completeButton.innerHTML = "Complete";
            completeButton.onclick = function () { toggleTask(index); };
            taskItem.appendChild(completeButton);
        }

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () { deleteTask(index); };
        taskItem.appendChild(deleteButton);

        if (task.completed) {
            var completedAtText = document.createTextNode("Completed at: " + task.completedAt.toLocaleString());
            taskItem.appendChild(completedAtText);
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

var tasks = [];

renderTasks();
