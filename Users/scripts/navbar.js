document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");
  const userMenu = document.querySelector(".user-menu");

  if (user && user.user_id) {
    // ✅ LOGGED IN
    authLinks.forEach(link => link.style.display = "inline-flex");
    publicLinks.forEach(link => link.style.display = "inline-flex");

    if (userMenu) userMenu.style.display = "none";
  } else {
    // ❌ LOGGED OUT
    authLinks.forEach(link => link.style.display = "none");
    publicLinks.forEach(link => link.style.display = "inline-flex");

    if (userMenu) userMenu.style.display = "flex";
  }
});
