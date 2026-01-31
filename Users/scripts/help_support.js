const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const imageInput = document.getElementById("imageInput");

chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ------------------ ADD MESSAGE ------------------
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ------------------ SEND MESSAGE ------------------
async function sendMessage() {
  const text = chatInput.value.trim();
  const imageFile = imageInput?.files[0];

  // nothing to send
  if (!text && !imageFile) return;

  // show user message
  if (text) {
    addMessage(text, "user");
  } else {
    addMessage("📷 Image uploaded", "user");
  }

  chatInput.value = "";
  if (imageInput) imageInput.value = "";

  // typing indicator
  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "Typing...";
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const payload = { user_id: 1 }; // user already logged in (profile)

    // IMAGE MODE
    if (imageFile) {
      payload.image = await toBase64(imageFile);
    } 
    // TEXT MODE
    else {
      payload.message = text;
    }

    const response = await fetch(
      "https://home-serv-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    typing.remove();

    if (!response.ok) {
      throw new Error(data.detail || "Server error");
    }

    // ------------------ HANDLE RESPONSE TYPES ------------------
    if (data.type === "booking") {
      addMessage(data.reply, "bot");
      addMessage("✅ Your service has been booked successfully.", "bot");
    } 
    else {
      addMessage(data.reply, "bot");
    }

  } catch (error) {
    typing.remove();
    addMessage("Sorry, something went wrong. Please try again.", "bot");
    console.error("Chatbot error:", error);
  }
}

// ------------------ IMAGE TO BASE64 ------------------
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
