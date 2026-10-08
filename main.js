(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const rand = (n) => (n == null ? "—" : "R " + n.toLocaleString("en-ZA").replace(/,/g, " "));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Booking links
  $$(".js-fresha").forEach((a) => (a.href = SITE.freshaUrl));

  // Mobile nav
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  $$("a", nav).forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    })
  );

  // Price list
  const tabs = $("#price-tabs");
  const panels = $("#price-panels");

  PRICE_CATEGORIES.forEach((cat, i) => {
    const tab = document.createElement("button");
    tab.className = "tab";
    tab.type = "button";
    tab.role = "tab";
    tab.id = "tab-" + cat.id;
    tab.setAttribute("aria-controls", "panel-" + cat.id);
    tab.setAttribute("aria-selected", String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.textContent = cat.title;
    tabs.appendChild(tab);

    const rows = cat.items
      .map(([name, w, m, badge]) => `
        <tr>
          <th scope="row">${esc(name)}${badge ? ` <span class="badge">${esc(badge)}</span>` : ""}</th>
          <td class="${w == null ? "na" : ""}">${rand(w)}</td>
          <td class="${m == null ? "na" : ""}">${rand(m)}</td>
        </tr>`)
      .join("");

    const panel = document.createElement("div");
    panel.className = "panel";
    panel.id = "panel-" + cat.id;
    panel.role = "tabpanel";
    panel.setAttribute("aria-labelledby", tab.id);
    panel.hidden = i !== 0;
    panel.innerHTML = `
      <div class="panel-head">
        <h3>${esc(cat.title)}</h3>
        <p>${esc(cat.tagline)}</p>
      </div>
      <table class="prices">
        <thead><tr><th scope="col">Area</th><th scope="col">Ladies</th><th scope="col">Gents</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <a class="btn btn-line js-fresha" href="${esc(SITE.freshaUrl)}" target="_blank" rel="noopener">Book ${esc(cat.title)} on Fresha</a>`;
    panels.appendChild(panel);
  });

  const select = (tab) => {
    $$(".tab", tabs).forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (t) select(t);
  });
  tabs.addEventListener("keydown", (e) => {
    const all = $$(".tab", tabs);
    const i = all.indexOf(document.activeElement);
    if (i < 0) return;
    let n = null;
    if (e.key === "ArrowRight") n = all[(i + 1) % all.length];
    if (e.key === "ArrowLeft") n = all[(i - 1 + all.length) % all.length];
    if (n) { e.preventDefault(); n.focus(); select(n); }
  });

  // Visit
  $("#address").innerHTML = SITE.address.map(esc).join("<br>");
  const q = encodeURIComponent(SITE.mapsQuery);
  $("#directions").href = "https://www.google.com/maps/search/?api=1&query=" + q;
  $("#map").src = "https://www.google.com/maps?q=" + q + "&output=embed";

  $("#hours").innerHTML = SITE.hours.map(([d, t]) => `<dt>${esc(d)}</dt><dd>${esc(t)}</dd>`).join("");

  const contacts = [];
  if (SITE.phone) contacts.push(["Call", SITE.phone, "tel:" + SITE.phone.replace(/\s/g, "")]);
  if (SITE.whatsapp) contacts.push(["WhatsApp", "Send a message", "https://wa.me/" + SITE.whatsapp]);
  if (SITE.email) contacts.push(["Email", SITE.email, "mailto:" + SITE.email]);
  if (SITE.instagram) contacts.push(["Instagram", "@" + SITE.instagram, "https://instagram.com/" + SITE.instagram]);
  if (SITE.phone) {
    $$(".js-phone").forEach((a) => {
      a.href = "tel:" + SITE.phone.replace(/\s/g, "");
      a.textContent = "Call " + SITE.phone;
      a.hidden = false;
    });
  }
  if (contacts.length) {
    $("#contact-list").innerHTML = contacts
      .map(([label, text, href]) => `<li><span>${label}</span><a href="${esc(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(text)}</a></li>`)
      .join("");
  } else {
    $("#contact-heading").hidden = true;
    $("#contact-list").hidden = true;
  }

  $("#year").textContent = new Date().getFullYear();
})();
