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
    const response = await fetch(
      "https://home-serv-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Server error");
    }

    alert(data.reply);

  } catch (error) {
    console.error("Chatbot error:", error);
    alert("Unable to reach chatbot. Please try again.");
  }

  input.value = "";
}
