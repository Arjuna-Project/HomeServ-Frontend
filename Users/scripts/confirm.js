form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let scheduledAt;

  if (selectedPackage || bookingType === "emergency") {
    scheduledAt = new Date();
  } else {
    const date = localStorage.getItem("bookingDate");
    const time = localStorage.getItem("bookingTime");
    if (!date || !time) return;

    // ✅ DO NOT call toISOString()
    scheduledAt = `${date}T${time}:00`;
  }

  let price = 329;
  if (bookingType === "emergency") price = 494;
  if (selectedPackage) price = selectedPackage.price;

  const payload = {
    user_id: user.user_id,
    area_id: area.area_id,
    scheduled_at: scheduledAt, // ✅ send raw local datetime
    total_price: price,
    details: JSON.stringify({
      booking_type: selectedPackage
        ? "package"
        : bookingType === "emergency"
        ? "emergency"
        : "scheduled"
    })
  };

  if (selectedPackage) {
    payload.package_id = selectedPackage.package_id;
  } else {
    payload.service_id = service.service_id;
    payload.professional_id = professional.professional_id;
  }

  const res = await fetch(`${window.API_BASE}/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  localStorage.setItem("bookingId", data.booking_id);
  window.location.href = "../pages/confirm.html";
});
