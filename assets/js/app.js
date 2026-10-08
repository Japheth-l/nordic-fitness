/* Nordic Fitness: site interactions */
(function () {
  "use strict";

  // ---- Config: set the store WhatsApp number (international format, digits only, e.g. "233241234567").
  // When it's empty, inquiries go to Instagram DM and the message is copied to the clipboard.
  var CONFIG = {
    whatsapp: "",
    instagram: "nordicfitness.1"
  };

  var CATS = window.NF_CATEGORIES;
  var PRODUCTS = window.NF_PRODUCTS;
  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var catLabel = {};
  CATS.forEach(function (c) { catLabel[c.id] = c.label; });

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var img = function (id) { return "assets/img/" + id + ".jpg"; };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // ---- Storage (best-effort)
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  // ---- State
  var state = { cat: "all", q: "" };
  var list = store.get("nf-list", []).filter(function (id) { return byId[id]; });

  // ---- Toast
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  // ---- Category tiles
  function renderCats() {
    $("#catTiles").innerHTML = CATS.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      return '<button class="cat reveal" data-cat="' + c.id + '">' +
        '<img src="' + img(c.cover) + '" alt="" loading="lazy" />' +
        '<span class="cat__label"><span class="cat__icon">' + c.icon + '</span>' + esc(c.label) +
        '<small>' + n + ' items</small></span></button>';
    }).join("");
  }

  // ---- Chips
  function renderChips() {
    var all = [{ id: "all", label: "All", icon: "✨" }].concat(CATS);
    $("#chips").innerHTML = all.map(function (c) {
      var on = state.cat === c.id;
      return '<button class="chip' + (on ? " is-on" : "") + '" role="tab" aria-selected="' + on + '" data-chip="' + c.id + '">' +
        c.icon + " " + esc(c.label) + "</button>";
    }).join("");
  }

  // ---- Product grid
  function matches(p) {
    if (state.cat !== "all" && p.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = (p.name + " " + p.brand + " " + catLabel[p.cat] + " " + p.desc).toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function card(p) {
    var inList = list.indexOf(p.id) !== -1;
    return '<article class="card" data-id="' + p.id + '">' +
      '<button class="card__media" data-view="' + p.id + '" aria-label="Quick view ' + esc(p.name) + '">' +
        '<img src="' + img(p.id) + '" alt="' + esc(p.name) + '" loading="lazy" />' +
        '<span class="tag">In stock</span>' +
      '</button>' +
      '<div class="card__body">' +
        '<p class="card__meta">' + esc(p.brand) + " · " + esc(catLabel[p.cat]) + '</p>' +
        '<h3 class="card__title">' + esc(p.name) + '</h3>' +
        '<div class="card__foot">' +
          '<span class="price">' + (p.price ? "GH₵ " + p.price.toLocaleString() : "Ask for price") + '</span>' +
          '<button class="addbtn' + (inList ? " is-added" : "") + '" data-add="' + p.id + '" aria-pressed="' + inList + '">' +
            (inList ? "✓ Added" : "+ Inquire") + '</button>' +
        '</div>' +
      '</div></article>';
  }

  function renderGrid() {
    var items = PRODUCTS.filter(matches);
    $("#grid").innerHTML = items.map(card).join("");
    $("#empty").hidden = items.length > 0;
    $("#resultCount").textContent = items.length + (items.length === 1 ? " product" : " products") +
      (state.cat !== "all" ? " in " + catLabel[state.cat] : "") + (state.q ? ' matching "' + state.q + '"' : "");
  }

  function setCat(id, scroll) {
    state.cat = id;
    renderChips();
    renderGrid();
    if (scroll) $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  // ---- Inquiry list
  function saveList() {
    store.set("nf-list", list);
    renderList();
    // sync buttons
    $$("[data-add]").forEach(function (b) {
      var on = list.indexOf(b.getAttribute("data-add")) !== -1;
      b.classList.toggle("is-added", on);
      b.setAttribute("aria-pressed", on);
      if (b.classList.contains("addbtn")) b.textContent = on ? "✓ Added" : "+ Inquire";
      else b.textContent = on ? "✓ In your inquiry list" : "Add to inquiry list";
    });
  }

  function toggle(id) {
    var i = list.indexOf(id);
    if (i === -1) { list.push(id); toast("Added: " + byId[id].name); bump(); }
    else { list.splice(i, 1); toast("Removed from your list"); }
    saveList();
  }

  function bump() {
    var b = $("#listCount");
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  }

  function renderList() {
    var n = list.length;
    var badge = $("#listCount");
    badge.hidden = n === 0;
    badge.textContent = n;
    $("#listEmpty").hidden = n > 0;
    $("#listFoot").hidden = n === 0;
    $("#listItems").innerHTML = list.map(function (id) {
      var p = byId[id];
      return '<li><img src="' + img(id) + '" alt="" /><div><strong>' + esc(p.name) + '</strong><small>' + esc(catLabel[p.cat]) +
        '</small></div><button class="iconbtn iconbtn--sm" data-remove="' + id + '" aria-label="Remove ' + esc(p.name) + '">✕</button></li>';
    }).join("");
  }

  function openDrawer() {
    $("#drawer").classList.add("open");
    $("#drawer").setAttribute("aria-hidden", "false");
    $("#scrim").hidden = false;
    document.body.classList.add("lock");
    setTimeout(function () { $("#closeList").focus(); }, 50);
  }
  function closeDrawer() {
    $("#drawer").classList.remove("open");
    $("#drawer").setAttribute("aria-hidden", "true");
    $("#scrim").hidden = true;
    document.body.classList.remove("lock");
  }

  // ---- Messaging
  function buildMessage(ids, extra) {
    var name = ($("#custName") && $("#custName").value.trim()) || "";
    var lines = ["Hello Nordic Fitness" + (name ? ", this is " + name : "") + "! 👋"];
    if (ids && ids.length) {
      lines.push("I'm interested in the following items:");
      ids.forEach(function (id, i) { lines.push((i + 1) + ". " + byId[id].name); });
      lines.push("Could you share prices and availability?");
    } else {
      lines.push(extra || "I'd like to ask about your products.");
    }
    lines.push("(Sent from your website)");
    return lines.join("\n");
  }

  function send(msg) {
    if (CONFIG.whatsapp) {
      window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      return;
    }
    var open = function () { window.open("https://ig.me/m/" + CONFIG.instagram, "_blank", "noopener"); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(msg).then(function () {
        toast("Message copied. Paste it into the Instagram DM.");
        setTimeout(open, 700);
      }, open);
    } else {
      open();
    }
  }

  // ---- Quick view
  function openModal(id) {
    var p = byId[id];
    var inList = list.indexOf(id) !== -1;
    var related = PRODUCTS.filter(function (r) { return r.cat === p.cat && r.id !== id; }).slice(0, 3);
    $("#modalBody").innerHTML =
      '<div class="qv"><div class="qv__media"><img src="' + img(id) + '" alt="' + esc(p.name) + '" /></div>' +
      '<div class="qv__copy"><p class="eyebrow">' + esc(p.brand) + " · " + esc(catLabel[p.cat]) + '</p>' +
      '<h2>' + esc(p.name) + '</h2><p>' + esc(p.desc) + '</p>' +
      '<ul class="qv__perks"><li>✓ In stock in Adenta</li><li>✓ Imported from the USA</li><li>✓ No pre-order wait</li></ul>' +
      '<div class="hero__cta"><button class="btn btn--primary" data-add="' + id + '">' + (inList ? "✓ In your inquiry list" : "Add to inquiry list") + '</button>' +
      '<button class="btn btn--ghost" data-askone="' + id + '">Ask about this now</button></div>' +
      (related.length ? '<p class="qv__rel-title">You might also like</p><div class="qv__rel">' + related.map(function (r) {
        return '<button data-view="' + r.id + '"><img src="' + img(r.id) + '" alt="" /><span>' + esc(r.name) + '</span></button>';
      }).join("") + "</div>" : "") +
      "</div></div>";
    var m = $("#modal");
    if (!m.open) { m.showModal(); document.body.classList.add("lock"); }
    m.scrollTop = 0;
  }

  // ---- Gym finder
  var PLANS = {
    cardio:   { title: "The Cardio Corner", note: "Calorie-burning machines that suit your space." },
    strength: { title: "The Strength Setup", note: "Build muscle with equipment sized for your space." },
    recovery: { title: "The Recovery Retreat", note: "Unwind after work with massage and heat therapy." },
    fun:      { title: "The Entertainer's Den", note: "Turn your home into the place everyone wants to be." }
  };
  var GOAL_CATS = { cardio: ["cardio"], strength: ["strength"], recovery: ["wellness"], fun: ["games", "outdoor", "home"] };

  function recommend(goal, space, who) {
    var cats = GOAL_CATS[goal];
    var scored = PRODUCTS.filter(function (p) { return cats.indexOf(p.cat) !== -1; }).map(function (p) {
      var s = 0;
      if (p.tags.indexOf(space) !== -1) s += 2;
      if (p.tags.indexOf(who) !== -1) s += 2;
      return { p: p, s: s };
    }).filter(function (x) { return x.p.tags.indexOf(space) !== -1 || space === "large"; });
    scored.sort(function (a, b) { return b.s - a.s; });
    var picks = scored.slice(0, 3).map(function (x) { return x.p; });
    // Pair a cardio/strength pick with something from the complementary category
    if (goal === "cardio" || goal === "strength") {
      var other = PRODUCTS.filter(function (p) {
        return p.cat === (goal === "cardio" ? "strength" : "cardio") && p.tags.indexOf(space) !== -1 && p.tags.indexOf(who) !== -1;
      })[0];
      if (other && picks.length === 3) picks[2] = other;
    }
    return picks;
  }

  function renderPlan(goal, space, who) {
    var plan = PLANS[goal];
    var picks = recommend(goal, space, who);
    var ids = picks.map(function (p) { return p.id; });
    var box = $("#quizResult");
    box.innerHTML = '<h3>' + plan.title + '</h3><p>' + plan.note + (who === "pro" ? " All of it is commercial-grade and built for heavy daily use." : "") + '</p>' +
      '<div class="plan">' + picks.map(function (p) {
        return '<button type="button" class="plan__item" data-view="' + p.id + '"><img src="' + img(p.id) + '" alt="" /><span>' + esc(p.name) + '</span></button>';
      }).join("") + '</div>' +
      '<button type="button" class="btn btn--primary btn--block" data-addall="' + ids.join(",") + '">Add this setup to my inquiry list</button>';
    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---- Count-up stats
  function countUp(el) {
    var target = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    var start = performance.now(), dur = 1400;
    function step(t) {
      var k = Math.min(1, (t - start) / dur);
      var v = Math.round(target * (1 - Math.pow(1 - k, 3)));
      el.textContent = (v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, "") + "K" : v) + suffix;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---- Reveal on scroll
  function setupReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); });
      $$("[data-count]").forEach(function (e) { e.textContent = (e.getAttribute("data-count") >= 1000 ? (e.getAttribute("data-count") / 1000).toFixed(1).replace(/\.0$/, "") + "K" : e.getAttribute("data-count")) + (e.getAttribute("data-suffix") || ""); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  // ---- Events
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-view],[data-remove],[data-chip],[data-cat],[data-ask],[data-askone],[data-addall],[data-close]");
    if (!t) return;
    if (t.hasAttribute("data-add")) { toggle(t.getAttribute("data-add")); }
    else if (t.hasAttribute("data-view")) { openModal(t.getAttribute("data-view")); }
    else if (t.hasAttribute("data-remove")) { list.splice(list.indexOf(t.getAttribute("data-remove")), 1); saveList(); }
    else if (t.hasAttribute("data-chip")) { setCat(t.getAttribute("data-chip")); }
    else if (t.hasAttribute("data-cat")) { setCat(t.getAttribute("data-cat"), true); }
    else if (t.hasAttribute("data-ask")) { e.preventDefault(); send(buildMessage(null)); }
    else if (t.hasAttribute("data-askone")) { send(buildMessage([t.getAttribute("data-askone")])); }
    else if (t.hasAttribute("data-addall")) {
      t.getAttribute("data-addall").split(",").forEach(function (id) { if (list.indexOf(id) === -1) list.push(id); });
      saveList(); bump(); toast("Setup added to your inquiry list"); openDrawer();
    }
    else if (t.hasAttribute("data-close")) { closeDrawer(); }
  });

  var searchTimer;
  $("#search").addEventListener("input", function (e) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { state.q = e.target.value.trim(); renderGrid(); }, 120);
  });

  $("#openList").addEventListener("click", openDrawer);
  $("#closeList").addEventListener("click", closeDrawer);
  $("#scrim").addEventListener("click", closeDrawer);
  $("#sendList").addEventListener("click", function () { send(buildMessage(list)); });
  $("#clearList").addEventListener("click", function () { list = []; saveList(); toast("List cleared"); });

  var modal = $("#modal");
  $("#closeModal").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", function () { if (!$("#drawer").classList.contains("open")) document.body.classList.remove("lock"); });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

  $("#navToggle").addEventListener("click", function () {
    var open = $("#navLinks").classList.toggle("open");
    this.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () { $("#navLinks").classList.remove("open"); $("#navToggle").setAttribute("aria-expanded", "false"); });
  });

  window.addEventListener("scroll", function () {
    $(".nav").classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  $("#quiz").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = new FormData(this);
    renderPlan(f.get("goal"), f.get("space"), f.get("who"));
  });

  $("#year").textContent = new Date().getFullYear();

  // ---- Init
  renderCats();
  renderChips();
  renderGrid();
  saveList();
  setupReveal();
})();
