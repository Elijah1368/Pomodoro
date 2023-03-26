chrome.alarms.create("pomodorotimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "pomodorotimer") {
    chrome.storage.local.get(["timer", "isRunning"], function (result) {
      if (result.isRunning) {
        let timer = result.timer + 1;
        let isRunning = true;

        if (timer === 60 * 25) {
          this.registration.showNotification("Pomodoro Timer", {
            body: "Time's up!",
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["pomodoro", "isRunning"], function (result) {
  chrome.storage.local.set({
    timer: "timer" in result ? result.timer : 0,
    isRunning: "isRunning" in result ? result.isRunning : false,
  });
});
