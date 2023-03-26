let taskArr = [];
const addTaskBtn = document.getElementById("add-task-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const startTimerBtn = document.getElementById("start-timer-btn");

function updateTime() {
  chrome.storage.local.get(["timer"], (result) => {
    const time = document.getElementById("time");
    const minutes = `${25 - Math.ceil(result.timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if (result.timer % 60 !== 0) {
      seconds = `${60 - (result.timer % 60)}`.padStart(2, "0");
    }

    time.textContent = `${minutes}:${seconds}`;
  });
}
updateTime();
setInterval(updateTime, 1000);

resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start";
    }
  );
});

startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (result) => {
    chrome.storage.local.set(
      {
        isRunning: !result.isRunning,
      },
      () => {
        startTimerBtn.textContent = !result.isRunning ? "Stop" : "Start";
      }
    );
  });
});
// eslint-disable-next-line no-undef
chrome.storage.sync.get(["taskArr"], (result) => {
  taskArr = result.taskArr ? result.taskArr : [];
  renderTasks();
});

// eslint-disable-next-line no-unused-vars
function saveTasks() {
  // eslint-disable-next-line no-undef
  chrome.storage.sync.set({
    taskArr,
  });
}

function renderTask(taskNum) {
  const taskBox = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter task..";
  text.value = taskArr[taskNum];

  text.addEventListener("change", () => {
    taskArr[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
    saveTasks();
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
  saveTasks();
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
