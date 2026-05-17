const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.querySelectorAll("#menu-panel a");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      navbar.classList.remove("menu-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && navbar) {
    navbar.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});
