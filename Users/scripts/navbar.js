document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");

  if (user) {
    // ✅ Logged in
    publicLinks.forEach(el => el.style.display = "inline-block");
    authLinks.forEach(el => el.style.display = "inline-block");
  } else {
    // ❌ Logged out
    publicLinks.forEach(el => el.style.display = "inline-block");
    authLinks.forEach(el => el.style.display = "none");
  }
});
