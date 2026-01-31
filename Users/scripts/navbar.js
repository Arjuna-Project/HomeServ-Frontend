document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");

  if (user) {
    // Logged in
    publicLinks.forEach(el => el.style.display = "none");
    authLinks.forEach(el => el.style.display = "inline-flex");
  } else {
    // Logged out
    publicLinks.forEach(el => el.style.display = "inline-flex");
    authLinks.forEach(el => el.style.display = "none");
  }
});
