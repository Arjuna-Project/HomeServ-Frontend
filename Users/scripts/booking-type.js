document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".booking-card");
  const continueBtn = document.getElementById("continueBtn");

  let selectedType = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedType = card.dataset.type;

      localStorage.setItem("bookingType", selectedType);

      localStorage.removeItem("selectedPackage");
      localStorage.removeItem("packageId");
    });
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedType) {
      alert("Please select a booking type");
      return;
    }

    if (selectedType === "scheduled") {
      window.location.href = "../pages/date&time.html";
    } else {
      window.location.href = "../pages/details.html";
    }
  });
});
