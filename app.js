(function () {
  var config = window.SITE_CONFIG;
  var brandUrl = config.brandUrl;

  var gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + config.gaId;
  document.head.appendChild(gtagScript);

  function trackCta(label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_click",
      cta_label: label,
      cta_url: brandUrl
    });

    if (typeof gtag === "function") {
      gtag("event", "cta_click", {
        event_category: "CTA",
        event_label: label,
        transport_type: "beacon"
      });
    }

    if (typeof ym === "function") {
      ym(config.metrikaId, "reachGoal", "cta_click", { label: label });
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-cta]");
    if (!link) return;
    trackCta(link.getAttribute("data-cta"));
  });
})();
