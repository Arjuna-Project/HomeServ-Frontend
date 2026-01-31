document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  const navPublic = document.querySelectorAll(".nav-public");
  const navAuth = document.querySelectorAll(".nav-auth");
  const userMenu = document.querySelector(".user-menu");

  // Safety check (VERY IMPORTANT)
  if (!navPublic.length && !navAuth.length) {
    console.warn("Navbar elements not found");
    return;
  }

  if (user) {
    // ✅ LOGGED IN
    navAuth.forEach(el => el.style.display = "inline-flex");
    navPublic.forEach(el => el.style.display = "inline-flex");
    if (userMenu) userMenu.style.display = "none";
  } else {
    // ❌ LOGGED OUT
    navAuth.forEach(el => el.style.display = "none");
    navPublic.forEach(el => el.style.display = "inline-flex");
    if (userMenu) userMenu.style.display = "flex";
  }
});