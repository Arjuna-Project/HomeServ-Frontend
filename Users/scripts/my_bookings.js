document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("bookingsList");

  if (!user || !container) return;

  try {
    const res = await fetch(
      `${window.API_BASE}/bookings/user/${user.user_id}`
    );
    if (!res.ok) throw new Error();

    const bookings = await res.json();
    container.innerHTML = "";

    if (!bookings.length) {
      container.innerHTML = "<p>No bookings found</p>";
      return;
    }

    bookings.forEach(b => {
      let dateTimeText = "N/A";

      if (b.details) {
        const details = JSON.parse(b.details);

        if (details.booking_type === "emergency") {
          dateTimeText = "Emergency Service";
        } else if (details.booking_type === "package") {
          dateTimeText = "As per package schedule";
        } else if (b.scheduled_at) {
          const dt = new Date(booking.scheduled_at);

set(
  "dateTime",
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
    })
);

        }
      }

      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <div class="booking-info">
          <p><strong>Date & Time:</strong> ${dateTimeText}</p>
          <p><strong>Amount:</strong> ₹${b.total_price}</p>
          <p><strong>Booking ID:</strong> HS${b.booking_id}</p>
        </div>
        <div class="booking-status ${b.status}">
          Status: ${b.status.toUpperCase()}
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Failed to load bookings</p>";
  }
});
