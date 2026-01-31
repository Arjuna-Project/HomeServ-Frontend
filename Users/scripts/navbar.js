document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    publicLinks.forEach(el => el.style.display = "inline-flex");
    authLinks.forEach(el => el.style.display = "inline-flex");
  } else {
    publicLinks.forEach(el => el.style.display = "inline-flex");
    authLinks.forEach(el => el.style.display = "none");
  }
});
