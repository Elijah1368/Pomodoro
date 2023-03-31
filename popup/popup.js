const taskArr = [];
const addTaskBtn = document.getElementById("add-task-btn");

function renderTask(taskNum) {
  const taskBox = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter task..";
  text.value = taskArr[taskNum];

  text.addEventListener("change", () => {
    taskArr[taskNum] = text.value;
    console.log(taskArr);
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskBox.appendChild(text);
  taskBox.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskBox);
}

addTaskBtn.addEventListener("click", () => {
  const taskNum = taskArr.length;
  taskArr.push("");
  renderTask(taskNum);
});

function deleteTask(taskNum) {
  taskArr.splice(taskNum, 1);
  renderTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
  taskArr.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
