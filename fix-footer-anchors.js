/**
 * Mintlify strips URL hash fragments from footer.link hrefs.
 * Re-attach section anchors for Features and Contact.
 */
(function () {
  const ANCHORS = {
    Features: "https://www.serin-ai.com/#features",
    Contact: "https://www.serin-ai.com/#contact",
  };

  function fixFooterAnchors() {
    const footer = document.querySelector("#footer, footer");
    if (!footer) return;

    footer.querySelectorAll("a").forEach((anchor) => {
      const label = (anchor.textContent || "").trim();
      const href = ANCHORS[label];
      if (href && anchor.getAttribute("href") !== href) {
        anchor.setAttribute("href", href);
      }
    });
  }

  fixFooterAnchors();

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fixFooterAnchors();
    });
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
