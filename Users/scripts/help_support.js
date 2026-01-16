// Ensure API base is defined
// Example:
// window.API_BASE = "https://home-serv-backend.vercel.app";

const input = document.querySelector(".search-input");
const button = document.querySelector(".search-btn");

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  input.value = "Thinking...";

  try {
    const response = await fetch(`${window.API_BASE}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    // TEMP: simple alert
    // (later you can replace this with chat bubbles)
    alert(data.reply);

  } catch (error) {
    console.error("Chatbot error:", error);
    alert("Unable to reach chatbot. Please try again.");
  }

  input.value = "";
}
