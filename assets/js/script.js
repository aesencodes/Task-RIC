// === Modal Logic ===
(() => {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalImage || !modalContent) return;

  const openModal = (src, alt = "Enlarged view") => {
    modalImage.src = src;
    modalImage.alt = alt;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modalImage.src = "";
    document.body.style.overflow = "";
  };

  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Expose functions globally
  window.openModal = openModal;
  window.closeModal = closeModal;
})();

// === Scroll To Top & Dark Mode Logic ===
(() => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const scrollTopIcon = document.getElementById("scrollTopIcon");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeIcon = document.getElementById("darkModeIcon");
  const html = document.documentElement;

  const ICONS = {
    dark: {
      themeToggle: "./assets/img/light-mode.svg",
      scrollTop: "./assets/img/arrow-dark.svg",
    },
    light: {
      themeToggle: "./assets/img/dark-mode.svg",
      scrollTop: "./assets/img/arrow-light.svg",
    },
  };

  const updateIcons = (isDark) => {
    const mode = isDark ? "dark" : "light";
    darkModeIcon.src = ICONS[mode].themeToggle;
    scrollTopIcon.src = ICONS[mode].scrollTop;
  };

  const setTheme = (isDark) => {
    html.classList.toggle("dark", isDark);
    localStorage.theme = isDark ? "dark" : "light";
    updateIcons(isDark);
  };

  const getInitialTheme = () =>
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Initialize theme
  setTheme(getInitialTheme());

  // Theme toggle click
  darkModeToggle.addEventListener("click", () => {
    setTheme(!html.classList.contains("dark"));
  });

  // Scroll-to-top button visibility
  const handleScroll = () => {
    scrollToTopBtn.classList.toggle("hidden", window.scrollY <= 200);
  };

  window.addEventListener("scroll", handleScroll);
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initial check
  handleScroll();
})();
