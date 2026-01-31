document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");

  if (user) {
    publicLinks.forEach(link => link.style.display = "inline-flex");
    authLinks.forEach(link => link.style.display = "inline-flex");
  } else {
    publicLinks.forEach(link => link.style.display = "inline-flex");
    authLinks.forEach(link => link.style.display = "none");
  }
});
