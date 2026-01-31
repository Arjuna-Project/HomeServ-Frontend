const chatMessages = document.getElementById("chatMessages");
const imageInput = document.getElementById("imageInput");
const uploadCard = document.getElementById("uploadCard");

uploadCard.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    sendImage();
  }
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendImage() {
  const file = imageInput.files[0];
  if (!file) return;

  const userData = localStorage.getItem("user");

  if (!userData) {
    addMessage("⚠️ Please login to use DIY Image Assistance.", "bot");
    return;
  }

  const user = JSON.parse(userData);
  const userId = user.id;

  addMessage("📷 Image uploaded", "user");

  const scan = document.createElement("div");
  scan.className = "scan-overlay";
  chatMessages.parentElement.appendChild(scan);

  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.innerText = "🔍 Analyzing image using AI...";
  chatMessages.appendChild(typing);

  try {
    const base64 = await toBase64(file);

    const response = await fetch(
      "https://home-serv-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          image: base64
        })
      }
    );

    const data = await response.json();
    typing.remove();
    scan.remove();

    if (!response.ok) {
      throw new Error(data.detail || "AI failed");
    }

    addMessage(data.reply, "bot");

  } catch (err) {
    typing.remove();
    scan.remove();
    addMessage("❌ Unable to analyze image. Please try again.", "bot");
    console.error(err);
  } finally {
    imageInput.value = "";
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
