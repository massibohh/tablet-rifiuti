```javascript
let selectedDate = new Date();

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
}


function getWaste(date) {
  return wasteCalendar[date.getDay()];
}


function updateHome() {
  const waste = getWaste(new Date());

  document.getElementById("waste").textContent =
    waste.length
      ? waste.join(" + ")
      : "🚫 NESSUNA RACCOLTA";
}


function hideAll() {
  document.querySelectorAll("main").forEach(function(element) {
    element.classList.add("hidden");
  });
}


function showHome() {
  hideAll();

  document.getElementById("home").classList.remove("hidden");

  updateHome();
}


function showCalendar() {
  hideAll();

  document.getElementById("calendar").classList.remove("hidden");

  selectedDate = new Date();

  updateCalendar();
}


function updateCalendar() {
  document.getElementById("calendar-date").textContent =
    selectedDate.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

  const waste = getWaste(selectedDate);

  document.getElementById("calendar-waste").textContent =
    waste.length
      ? waste.join(" + ")
      : "🚫 NESSUNA RACCOLTA";
}


function nextDay() {
  selectedDate.setDate(selectedDate.getDate() + 1);

  updateCalendar();
}


function previousDay() {
  selectedDate.setDate(selectedDate.getDate() - 1);

  updateCalendar();
}


function showMessage(text) {
  document.getElementById("message-text").textContent = text;

  hideAll();

  document.getElementById("message").classList.remove("hidden");
}


function readMessage() {
  hideAll();

  document
    .getElementById("message-content")
    .classList.remove("hidden");
}


function closeMessage() {
  showHome();
}


/* =========================
   MESSAGGIO DI TEST
   ========================= */

function showTestMessage() {
  showMessage("Questo è un messaggio di TEST 🔔");
}


/* =========================
   EVENTI DEI PULSANTI
   ========================= */

document
  .getElementById("calendar-button")
  .addEventListener("click", showCalendar);

document
  .getElementById("home-button")
  .addEventListener("click", showHome);

document
  .getElementById("next-button")
  .addEventListener("click", nextDay);

document
  .getElementById("previous-button")
  .addEventListener("click", previousDay);

document
  .getElementById("read-button")
  .addEventListener("click", readMessage);

document
  .getElementById("ok-button")
  .addEventListener("click", closeMessage);

document
  .getElementById("test-message")
  .addEventListener("click", showTestMessage);


/* =========================
   AVVIO
   ========================= */

updateClock();
updateHome();

setInterval(updateClock, 1000);
```
