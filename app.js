(function () {
  var config = window.SITE_CONFIG;

  function trackCta(label) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_click",
      cta_label: label,
      cta_url: config.brandUrl
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
