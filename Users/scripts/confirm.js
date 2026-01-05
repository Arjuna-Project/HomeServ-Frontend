document.addEventListener("DOMContentLoaded", async () => {
  const bookingId = localStorage.getItem("bookingId");
  if (!bookingId) {
    window.location.href = "../../index.html";
    return;
  }

  try {
    const res = await fetch(`${window.API_BASE}/bookings/${bookingId}`);
    if (!res.ok) return;

    const booking = await res.json();
    const details = booking.details ? JSON.parse(booking.details) : {};

    const area = JSON.parse(localStorage.getItem("selectedArea"));
    const service = JSON.parse(localStorage.getItem("selectedService"));
    const professional = JSON.parse(localStorage.getItem("selectedProfessional"));

    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    set("bookingId", `HS${booking.booking_id}`);
    set("amount", booking.total_price);
    set("areaName", area?.name || "N/A");

    if (service) set("serviceName", service.name);
    if (professional) set("professionalName", professional.name);

    const bookingType = details.booking_type;

    if (bookingType === "emergency") {
      set("dateTime", "Emergency Service");
      return;
    }

    if (bookingType === "package") {
      set("dateTime", "As per package schedule");
      return;
    }

    const date = localStorage.getItem("bookingDate");
    const time = localStorage.getItem("bookingTime");

    if (date && time) {
      const dt = new Date(`${date}T${time}:00`);
      set(
        "dateTime",
        dt.toLocaleDateString("en-IN") +
          " at " +
          dt.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
          })
      );
    } else {
      set("dateTime", "Scheduled Booking");
    }

  } catch (err) {
    console.error(err);
  }
});
