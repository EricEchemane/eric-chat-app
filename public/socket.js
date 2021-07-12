const socket = io("http://localhost:3000");

var messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") sendMessage();
});

function sendMessage() {
  if (input.value) {
    socket.emit("chat-message", { id: socket.id, message: input.value });
    input.value = "";
  }
  window.scrollTo(0, document.body.scrollHeight);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage();
});

socket.on("chat-message", function (msg) {
  var item = document.createElement("span");
  var div = document.createElement("div");

  if (msg.id == socket.id) item.classList.add("own-message");
  item.textContent = msg.message;
  div.appendChild(item);
  messages.appendChild(div);
  window.scrollTo(0, document.body.scrollHeight);
});
