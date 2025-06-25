let currentRoom = "";

function joinRoom() {
  currentRoom = document.getElementById("roomInput").value.trim();
  if (!currentRoom) return alert("Enter a valid secret phrase!");

  document.getElementById("chatBox").classList.remove("hidden");
  document.getElementById("messageSection").classList.remove("hidden");
  listenForMessages();
}

function sendMessage() {
  const message = document.getElementById("messageInput").value.trim();
  if (!message || !currentRoom) return;

  const messageData = {
    text: message,
    timestamp: new Date().toISOString()
  };

  db.ref(`rooms/${currentRoom}`).push(messageData);
  document.getElementById("messageInput").value = "";
}

function listenForMessages() {
  db.ref(`rooms/${currentRoom}`).on("child_added", snapshot => {
    const data = snapshot.val();
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.textContent = `👤 Anonymous: ${data.text}`;
    messageElement.className = "mb-2";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
