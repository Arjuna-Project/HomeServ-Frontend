document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const publicLinks = document.querySelectorAll(".nav-public");
  const authLinks = document.querySelectorAll(".nav-auth");
  const userMenu = document.querySelector(".user-menu");

  if (user) {
    // ✅ LOGGED IN
    authLinks.forEach(el => el.style.display = "inline-flex");
    publicLinks.forEach(el => el.style.display = "inline-flex");

    if (userMenu) userMenu.style.display = "none";
  } else {
    // ❌ LOGGED OUT
    authLinks.forEach(el => el.style.display = "none");
    publicLinks.forEach(el => el.style.display = "inline-flex");

    if (userMenu) userMenu.style.display = "flex";
  }
});
