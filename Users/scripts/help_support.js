const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "Typing...";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

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

    if (!response.ok) {
      throw new Error(data.detail || "Server error");
    }

    addMessage(data.reply, "bot");

  } catch (error) {
    typing.remove();
    addMessage("Sorry, something went wrong. Please try again.", "bot");
    console.error("Chatbot error:", error);
  }
}
