document.addEventListener("DOMContentLoaded", async () => {
  console.log("confirm.js loaded");

  const bookingId = localStorage.getItem("bookingId");
  console.log("bookingId:", bookingId);

  if (!bookingId) {
    alert("Booking ID missing");
    window.location.href = "../../index.html";
    return;
  }

  try {
    const res = await fetch(`${window.API_BASE}/bookings/${bookingId}`);
    console.log("API status:", res.status);

    if (!res.ok) throw new Error("API failed");

    const booking = await res.json();
    console.log("booking:", booking);

    const details = booking.details ? JSON.parse(booking.details) : {};

    document.getElementById("bookingId").textContent = `HS${booking.booking_id}`;
    document.getElementById("amount").textContent = booking.total_price;

    const area = JSON.parse(localStorage.getItem("selectedArea"));
    const service = JSON.parse(localStorage.getItem("selectedService"));
    const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

    if (area) document.getElementById("areaName").textContent = area.name;
    if (service) document.getElementById("serviceName").textContent = service.name;
    if (professional)
      document.getElementById("professionalName").textContent = professional.name;

    // 🔥 BOOKING TYPE HANDLING
    if (details.booking_type === "emergency") {
      document.getElementById("dateTime").textContent = "Emergency Service";
      return;
    }

    if (details.booking_type === "package") {
      document.getElementById("dateTime").textContent =
        "As per package schedule";
      return;
    }

    // ✅ Scheduled booking (UTC → IST auto handled)
    const dt = new Date(booking.scheduled_at);

    document.getElementById("dateTime").textContent =
      dt.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) +
      " at " +
      dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

  } catch (err) {
    console.error(err);
    alert("Confirm page failed to load data");
  }
});
