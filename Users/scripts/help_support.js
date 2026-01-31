const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

// Send on button click
chatSend.addEventListener("click", sendText);

// Send on Enter key
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendText();
  }
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendText() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "Typing...";
  chatMessages.appendChild(typing);

  try {
    const response = await fetch(
      "https://home-serv-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      }
    );

    const data = await response.json();
    typing.remove();

    if (!response.ok) throw new Error();

    addMessage(data.reply, "bot");

  } catch (err) {
    typing.remove();
    addMessage("Sorry, something went wrong.", "bot");
    console.error(err);
  }
}
