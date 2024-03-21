(() => {
  ("use strict");

  // Sticky Navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 0);
  });

  // Nav Link Active
  document.addEventListener("DOMContentLoaded", function () {
    // Css selector
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = document.querySelectorAll("section");

    // Nav item click event
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");
      });
    });

    // Window scroll change section id as a href link
    function setActiveLink() {
      let currentSectionId = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          pageYOffset >= sectionTop &&
          pageYOffset < sectionTop + sectionHeight
        ) {
          currentSectionId = section.id;
        }
      });

      // Window scroll active class add nav item
      const fromTop = window.scrollY;
      navLinks.forEach((link) => {
        const section = document.querySelector(link.hash);
        if (
          section.offsetTop <= fromTop + 100 &&
          section.offsetTop + section.offsetHeight > fromTop + 100
        ) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Update URL
      if (history.replaceState) {
        history.replaceState(null, null, "#" + currentSectionId);
      } else {
        location.hash = "#" + currentSectionId;
      }
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // Set initial active link
  });

  // Small device navigation and Humbarger Icon
  const hamIcon = document.querySelector(".menuIcon");
  const navbox = document.querySelector(".navbar-collapse");

  // Function to toggle navigation box visibility
  function toggleNavbox() {
    hamIcon.classList.toggle("active");
    navbox.classList.toggle("show");
  }

  // Toggle navigation box visibility when menu icon is clicked
  hamIcon.addEventListener("click", toggleNavbox);

  // Hide navigation box when a navigation item is clicked
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleNavbox();
    });
  });

  // Hide navigation box when scrolling occurs
  window.addEventListener("scroll", () => {
    if (navbox.classList.contains("show")) {
      toggleNavbox();
    }
  });

  // Scroll to Top
  let topPage = document.getElementById(`btnScroll`);

  topPage.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // On scroll, Show/Hide the button
  window.onscroll = () => {
    window.scrollY > 100
      ? (topPage.style.display = `block`)
      : (topPage.style.display = `none`);
  };

  // Contact Form Validation
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  // Web page all image lazy load
  document.addEventListener("DOMContentLoaded", function () {
    let lazyImages = document.querySelectorAll(".lazy-load");
    let lazyLoadObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy-load");
          lazyLoadObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function (lazyImage) {
      lazyLoadObserver.observe(lazyImage);
    });
  });
})();
