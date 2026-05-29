/**
 * ============================================================
 * ROAD ROCK HOLDINGS — CONTENT LOADER
 * Save this file as: js/content-loader.js
 * Add to every page just before </body>:
 *   <script src="js/content-loader.js"></script>
 * ============================================================
 *
 * How it works:
 * 1. Admin makes changes in admin.html and clicks "Publish Changes"
 * 2. Admin panel saves content to localStorage key: rrh_admin_site_content
 * 3. This script reads that key on every page load and applies changes
 * 4. Visitors instantly see the updated content — no server needed
 * ============================================================
 */

(function () {
  "use strict";

  // The key the admin panel writes published content to
  const STORAGE_KEY = "rrh_admin_site_content";

  // Load published content from localStorage
  function getContent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  // Safely set text content of a selector (first match)
  function setText(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  // Safely set innerHTML (for HTML content)
  function setHTML(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  // Set an attribute on matched elements
  function setAttr(selector, attr, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.setAttribute(attr, value);
    });
  }

  // Set href on all matching anchors
  function setHref(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.href = value;
    });
  }

  // ============================================================
  // APPLY GLOBAL CONTENT (all pages)
  // ============================================================
  function applyGlobal(g) {
    if (!g) return;
    var f = g.fields || {};

    // Company name in navbars / footers
    if (f.company_name && f.company_name.value) {
      document
        .querySelectorAll(".sidebar-logo-name, .auth-logo")
        .forEach(function (el) {
          el.innerHTML = el.innerHTML.replace(
            /Road\s+<span>Rock<\/span>\s+Holdings/,
            f.company_name.value,
          );
        });
    }

    // Phone numbers — update all tel: links and visible text
    if (f.phone_1 && f.phone_1.value) {
      var p1 = f.phone_1.value;
      var p1digits = p1.replace(/\D/g, "");
      document
        .querySelectorAll(
          'a[href^="tel:+2348082363104"], a[href^="tel:2348082363104"]',
        )
        .forEach(function (el) {
          el.href = "tel:" + p1digits;
          if (
            el.textContent.includes("808") ||
            el.textContent.includes("3104")
          ) {
            el.textContent = p1;
          }
        });
      // Update nav-info phone display
      document.querySelectorAll(".nav-info a").forEach(function (el) {
        if (el.href && el.href.includes("8082363104")) {
          el.textContent = p1;
          el.href = "tel:" + p1digits;
        }
      });
      // Quick bar first phone
      var qbVals = document.querySelectorAll(".qb-val");
      if (qbVals[0]) {
        var a1 = qbVals[0].querySelector("a");
        if (a1) {
          a1.href = "tel:" + p1digits;
          a1.textContent = p1;
        }
      }
    }

    if (f.phone_2 && f.phone_2.value) {
      var p2 = f.phone_2.value;
      var p2digits = p2.replace(/\D/g, "");
      document
        .querySelectorAll(
          'a[href^="tel:+2349018053469"], a[href^="tel:2349018053469"]',
        )
        .forEach(function (el) {
          el.href = "tel:" + p2digits;
          if (
            el.textContent.includes("901") ||
            el.textContent.includes("3469")
          ) {
            el.textContent = p2;
          }
        });
    }

    // Email
    if (f.email && f.email.value) {
      var em = f.email.value;
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
        el.href = "mailto:" + em;
        if (
          el.textContent.includes("@") &&
          el.textContent.includes("roadrock")
        ) {
          el.textContent = em;
        }
      });
    }

    // WhatsApp
    if (f.whatsapp_number && f.whatsapp_number.value) {
      var wa = f.whatsapp_number.value;
      setHref('a[href^="https://wa.me/"]', "https://wa.me/" + wa);
      // Also update chat widget if present
      var chatLink = document.querySelector(
        '#rrh-chat-widget a[href*="wa.me"]',
      );
      if (chatLink) chatLink.href = "https://wa.me/" + wa;
    }

    // Location
    if (f.location && f.location.value) {
      document.querySelectorAll(".fci span, .qb-val").forEach(function (el) {
        if (el.textContent.trim() === "Lagos, Nigeria") {
          el.textContent = f.location.value;
        }
      });
      // Footer bottom location
      document.querySelectorAll(".footer-bottom p").forEach(function (el) {
        if (el.textContent.trim() === "Lagos, Nigeria") {
          el.textContent = f.location.value;
        }
      });
    }

    // Business hours
    if (f.hours_weekday && f.hours_weekday.value) {
      document.querySelectorAll(".c-value").forEach(function (el) {
        if (
          el.textContent.includes("Monday") &&
          el.textContent.includes("Friday")
        ) {
          var lines = el.innerHTML.split("<br>");
          if (lines.length >= 1) {
            lines[0] = f.hours_weekday.value;
            if (f.hours_saturday && f.hours_saturday.value) {
              lines[1] = f.hours_saturday.value;
            }
            el.innerHTML = lines.join("<br>");
          }
        }
      });
    }

    // Social links
    if (f.facebook_url && f.facebook_url.value) {
      setHref("a .fa-facebook-f", f.facebook_url.value);
      document.querySelectorAll("a").forEach(function (el) {
        if (el.querySelector(".fa-facebook-f")) el.href = f.facebook_url.value;
      });
    }
    if (f.instagram_url && f.instagram_url.value) {
      document.querySelectorAll("a").forEach(function (el) {
        if (el.querySelector(".fa-instagram")) el.href = f.instagram_url.value;
      });
    }
    if (f.linkedin_url && f.linkedin_url.value) {
      document.querySelectorAll("a").forEach(function (el) {
        if (el.querySelector(".fa-linkedin-in")) el.href = f.linkedin_url.value;
      });
    }

    // Copyright
    if (f.copyright && f.copyright.value) {
      document.querySelectorAll(".footer-bottom p").forEach(function (el) {
        if (el.textContent.includes("All Rights Reserved")) {
          el.textContent = f.copyright.value;
        }
      });
    }
  }

  // ============================================================
  // APPLY HOME PAGE CONTENT
  // ============================================================
  function applyHome(h) {
    if (!h) return;
    var f = h.fields || {};

    // Hero eyebrow
    if (f.hero_eyebrow && f.hero_eyebrow.value) {
      var eyebrow = document.querySelector(".hero-eyebrow");
      if (eyebrow) {
        // Keep the icon, update the text after it
        var icon = eyebrow.querySelector("i");
        eyebrow.textContent = f.hero_eyebrow.value;
        if (icon) eyebrow.insertBefore(icon, eyebrow.firstChild);
      }
    }

    // Hero headline — structured as 3 lines
    var h1El = document.querySelector(".hero-h1");
    if (h1El) {
      var line1 =
        f.hero_h1_line1 && f.hero_h1_line1.value ? f.hero_h1_line1.value : null;
      var goldWord =
        f.hero_h1_gold && f.hero_h1_gold.value ? f.hero_h1_gold.value : null;
      var line2 =
        f.hero_h1_line2 && f.hero_h1_line2.value ? f.hero_h1_line2.value : null;
      if (line1 || goldWord || line2) {
        var html = "";
        if (line1) html += line1 + "<br/>";
        if (goldWord) html += '<span class="gold">' + goldWord + "</span> ";
        if (line2) html += line2;
        h1El.innerHTML = html;
      }
    }

    // Hero subtitle
    if (f.hero_sub && f.hero_sub.value) {
      setText(".hero-sub", f.hero_sub.value);
    }

    // About section eyebrow
    if (f.about_eyebrow && f.about_eyebrow.value) {
      var aEyebrow = document.querySelector(".about-sec .sec-eyebrow");
      if (aEyebrow) aEyebrow.textContent = f.about_eyebrow.value;
    }

    // About section heading
    if (f.about_title && f.about_title.value) {
      var aH2 = document.querySelector(".about-sec .sec-h2");
      if (aH2) aH2.innerHTML = f.about_title.value;
    }

    // About paragraphs
    if (f.about_p1 && f.about_p1.value) {
      var bps = document.querySelectorAll(".about-sec .body-p");
      if (bps[0]) bps[0].textContent = f.about_p1.value;
    }
    if (f.about_p2 && f.about_p2.value) {
      var bps2 = document.querySelectorAll(".about-sec .body-p");
      if (bps2[1]) bps2[1].textContent = f.about_p2.value;
    }

    // CTA strip
    if (f.cta_h2 && f.cta_h2.value) {
      var ctaH2 = document.querySelector(".contact-strip .cs-text h2");
      if (ctaH2) ctaH2.textContent = f.cta_h2.value;
    }
    if (f.cta_sub && f.cta_sub.value) {
      var ctaP = document.querySelector(".contact-strip .cs-text p");
      if (ctaP) ctaP.textContent = f.cta_sub.value;
    }
  }

  // ============================================================
  // APPLY ABOUT PAGE CONTENT
  // ============================================================
  function applyAbout(a) {
    if (!a) return;
    var f = a.fields || {};

    if (f.page_title && f.page_title.value) {
      var ptEl = document.querySelector(".page-hero .page-title");
      if (ptEl) ptEl.innerHTML = f.page_title.value;
    }
    if (f.page_subtitle && f.page_subtitle.value) {
      setText(".page-hero .page-subtitle", f.page_subtitle.value);
    }
    if (f.intro_h2 && f.intro_h2.value) {
      var ih2 = document.querySelector(".intro-sec .sec-h2");
      if (ih2) ih2.innerHTML = f.intro_h2.value;
    }
    if (f.intro_p1 && f.intro_p1.value) {
      var ips = document.querySelectorAll(".intro-sec .body-p");
      if (ips[0]) ips[0].textContent = f.intro_p1.value;
    }
    if (f.intro_p2 && f.intro_p2.value) {
      var ips2 = document.querySelectorAll(".intro-sec .body-p");
      if (ips2[1]) ips2[1].textContent = f.intro_p2.value;
    }
    // Mission / Vision cards
    if (f.mission && f.mission.value) {
      var vmCards = document.querySelectorAll(".vm-card");
      if (vmCards[0])
        vmCards[0].querySelector("p").textContent = f.mission.value;
    }
    if (f.vision && f.vision.value) {
      var vmCards2 = document.querySelectorAll(".vm-card");
      if (vmCards2[1])
        vmCards2[1].querySelector("p").textContent = f.vision.value;
    }
    // CEO section
    if (f.ceo_name && f.ceo_name.value) {
      var ceoName = document.querySelector(".ceo-name");
      if (ceoName) {
        var goldSpan = ceoName.querySelector(".gold");
        var parts = f.ceo_name.value.split(" ");
        if (goldSpan && parts.length > 1) {
          ceoName.innerHTML =
            parts.slice(0, -1).join(" ") +
            '<br/><span class="gold">' +
            parts[parts.length - 1] +
            "</span>";
        } else {
          ceoName.textContent = f.ceo_name.value;
        }
      }
      // Also update leader-name on profile page
      var leaderName = document.querySelector(".leader-name");
      if (leaderName) leaderName.innerHTML = f.ceo_name.value;
    }
    if (f.ceo_title && f.ceo_title.value) {
      // Update the h3 below ceo-name
      var ceoTitles = document.querySelectorAll(
        ".ceo-full-sec h3, .leader-title",
      );
      ceoTitles.forEach(function (el) {
        if (
          el.textContent.includes("CEO") ||
          el.textContent.includes("Founder")
        ) {
          el.textContent = f.ceo_title.value;
        }
      });
    }
    if (f.ceo_p1 && f.ceo_p1.value) {
      var ceoBPs = document.querySelectorAll(".ceo-full-sec .body-p");
      if (ceoBPs[0]) ceoBPs[0].textContent = f.ceo_p1.value;
    }
    if (f.ceo_quote && f.ceo_quote.value) {
      var ceoQ = document.querySelector(".ceo-quote, .leader-quote");
      if (ceoQ) {
        var qi = ceoQ.querySelector("i");
        ceoQ.textContent = f.ceo_quote.value;
        if (qi) ceoQ.insertBefore(qi, ceoQ.firstChild);
      }
    }
    // Stats
    if (f.years_stat && f.years_stat.value) {
      document.querySelectorAll('[data-target="15"]').forEach(function (el) {
        el.setAttribute("data-target", f.years_stat.value);
        el.textContent = f.years_stat.value + "+";
      });
    }
    if (f.projects_stat && f.projects_stat.value) {
      document.querySelectorAll('[data-target="250"]').forEach(function (el) {
        el.setAttribute("data-target", f.projects_stat.value);
        el.textContent = f.projects_stat.value + "+";
      });
    }
    if (f.clients_stat && f.clients_stat.value) {
      document.querySelectorAll('[data-target="100"]').forEach(function (el) {
        el.setAttribute("data-target", f.clients_stat.value);
        el.textContent = f.clients_stat.value + "+";
      });
    }
  }

  // ============================================================
  // APPLY SERVICES PAGE CONTENT
  // ============================================================
  function applyServices(s) {
    if (!s) return;
    var f = s.fields || {};

    if (f.page_title && f.page_title.value) {
      var ptEl = document.querySelector(".page-hero .page-title");
      if (ptEl) ptEl.innerHTML = f.page_title.value;
    }
    if (f.page_subtitle && f.page_subtitle.value) {
      setText(".page-hero .page-subtitle", f.page_subtitle.value);
    }

    // Service names and descriptions in the service strip (home) and service sections
    var serviceMappings = [
      { nameKey: "s1_name", descKey: "s1_desc", idx: 0 },
      { nameKey: "s2_name", descKey: "s2_desc", idx: 1 },
      { nameKey: "s3_name", descKey: "s3_desc", idx: 2 },
      { nameKey: "s4_name", descKey: "s4_desc", idx: 3 },
      { nameKey: "s5_name", descKey: "s5_desc", idx: 4 },
    ];

    // Update service section titles
    var svcTitles = document.querySelectorAll(".svc-title");
    var svcDescs = document.querySelectorAll(".svc-desc");
    var srvTitles = document.querySelectorAll(".srv-title");
    var srvTexts = document.querySelectorAll(".srv-text");

    serviceMappings.forEach(function (m) {
      if (f[m.nameKey] && f[m.nameKey].value) {
        if (svcTitles[m.idx]) svcTitles[m.idx].textContent = f[m.nameKey].value;
        if (srvTitles[m.idx]) srvTitles[m.idx].textContent = f[m.nameKey].value;
        // Also service strip cards
        var svcCards = document.querySelectorAll(".svc-name");
        if (svcCards[m.idx]) svcCards[m.idx].textContent = f[m.nameKey].value;
      }
      if (f[m.descKey] && f[m.descKey].value) {
        if (svcDescs[m.idx]) svcDescs[m.idx].textContent = f[m.descKey].value;
        if (srvTexts[m.idx]) srvTexts[m.idx].textContent = f[m.descKey].value;
        var svcDescsCard = document.querySelectorAll(".svc-desc");
        if (svcDescsCard[m.idx])
          svcDescsCard[m.idx].textContent = f[m.descKey].value;
      }
    });
  }

  // ============================================================
  // APPLY CONTACT PAGE CONTENT
  // ============================================================
  function applyContact(c) {
    if (!c) return;
    var f = c.fields || {};

    if (f.page_title && f.page_title.value) {
      var ptEl = document.querySelector(".page-hero .page-title");
      if (ptEl) ptEl.innerHTML = f.page_title.value;
    }
    if (f.page_subtitle && f.page_subtitle.value) {
      setText(".page-hero .page-subtitle", f.page_subtitle.value);
    }
    if (f.contact_intro && f.contact_intro.value) {
      setText(".contact-sec .body-p", f.contact_intro.value);
    }
    if (f.form_title && f.form_title.value) {
      setText(".form-title", f.form_title.value);
    }
    if (f.form_sub && f.form_sub.value) {
      setText(".form-sub", f.form_sub.value);
    }
    if (f.map_title && f.map_title.value) {
      var mapH2 = document.querySelector(".map-sec .sec-h2");
      if (mapH2) mapH2.innerHTML = f.map_title.value;
    }
  }

  // ============================================================
  // APPLY COMPANY PROFILE PAGE CONTENT
  // ============================================================
  function applyProfile(p) {
    if (!p) return;
    var f = p.fields || {};

    if (f.page_title && f.page_title.value) {
      var ptEl = document.querySelector(".page-hero .page-title");
      if (ptEl) ptEl.innerHTML = f.page_title.value;
    }
    if (f.page_subtitle && f.page_subtitle.value) {
      setText(".page-hero .page-subtitle", f.page_subtitle.value);
    }
    if (f.overview_intro && f.overview_intro.value) {
      setText(".gold-accent", f.overview_intro.value);
    }
    // Profile table rows
    if (f.company_type && f.company_type.value) {
      var rows = document.querySelectorAll(".profile-table td");
      rows.forEach(function (td, i) {
        if (td.textContent.trim() === "Type" && rows[i + 1]) {
          rows[i + 1].textContent = f.company_type.value;
        }
      });
    }
    if (f.coverage && f.coverage.value) {
      var rows2 = document.querySelectorAll(".profile-table td");
      rows2.forEach(function (td, i) {
        if (td.textContent.trim() === "Coverage" && rows2[i + 1]) {
          rows2[i + 1].textContent = f.coverage.value;
        }
      });
    }
  }

  // ============================================================
  // DETECT CURRENT PAGE & APPLY RELEVANT CONTENT
  // ============================================================
  function detectPage() {
    var path = window.location.pathname.toLowerCase();
    var filename = path.split("/").pop() || "index.html";
    if (filename === "" || filename === "index.html") return "home";
    if (filename === "about.html") return "about";
    if (filename === "services.html") return "services";
    if (filename === "contact.html") return "contact";
    if (filename === "project.html") return "profile";
    if (filename === "investor-presentation.html") return "investor";
    return "home";
  }

  // ============================================================
  // MAIN INIT — runs after DOM is ready
  // ============================================================
  function init() {
    var content = getContent();
    if (!content) return; // No published changes yet — show original content

    var page = detectPage();

    // Apply global changes to ALL pages
    applyGlobal(content.global);

    // Apply page-specific changes
    switch (page) {
      case "home":
        applyHome(content.home);
        applyServices(content.services); // service strip also on home
        break;
      case "about":
        applyAbout(content.about);
        break;
      case "services":
        applyServices(content.services);
        break;
      case "contact":
        applyContact(content.contact);
        break;
      case "profile":
        applyProfile(content.profile);
        applyAbout(content.about); // shares CEO info
        break;
      default:
        break;
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
