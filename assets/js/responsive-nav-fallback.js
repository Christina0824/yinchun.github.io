(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.getElementById("site-nav");
    var button = nav && nav.querySelector(":scope > button");

    // The bundled theme script sets this attribute when it initializes.
    // Only provide a fallback when that script could not run.
    if (!nav || !button || button.hasAttribute("count")) return;

    var visible = nav.querySelector(".visible-links");
    var hidden = nav.querySelector(".hidden-links");
    var languageSwitch = visible.querySelector(".language-switch");
    var movableItems = Array.prototype.slice.call(visible.querySelectorAll("li:not(.persist)"));

    function layoutNavigation() {
      movableItems.forEach(function (item) {
        visible.insertBefore(item, languageSwitch);
      });
      button.classList.add("hidden");
      button.classList.remove("close");
      button.setAttribute("aria-expanded", "false");
      hidden.classList.add("hidden");

      if (visible.scrollWidth > nav.clientWidth) {
        button.classList.remove("hidden");
        var available = nav.clientWidth - button.offsetWidth - 30;
        for (var i = movableItems.length - 1; i >= 0 && visible.scrollWidth > available; i -= 1) {
          hidden.insertBefore(movableItems[i], hidden.firstChild);
        }
      }

      button.setAttribute("count", hidden.children.length);
      document.body.style.paddingTop = document.querySelector(".masthead").offsetHeight + "px";
    }

    button.addEventListener("click", function () {
      var willOpen = hidden.classList.contains("hidden");
      hidden.classList.toggle("hidden");
      button.classList.toggle("close");
      button.setAttribute("aria-expanded", String(willOpen));
    });

    var profileButton = document.querySelector(".author__urls-wrapper > button");
    var profileLinks = document.querySelector(".author__urls");
    if (profileButton && profileLinks) {
      profileButton.addEventListener("click", function () {
        var willOpen = getComputedStyle(profileLinks).display === "none";
        profileLinks.style.display = willOpen ? "block" : "none";
        profileButton.classList.toggle("open", willOpen);
        profileButton.setAttribute("aria-expanded", String(willOpen));
      });
    }

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        var dark = document.documentElement.getAttribute("data-theme") === "dark";
        document.documentElement.toggleAttribute("data-theme", !dark);
        if (!dark) document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", dark ? "light" : "dark");
        var icon = document.getElementById("theme-icon");
        if (icon) {
          icon.classList.toggle("fa-sun", dark);
          icon.classList.toggle("fa-moon", !dark);
        }
      });
    }

    window.addEventListener("resize", layoutNavigation);
    layoutNavigation();
  });
}());
