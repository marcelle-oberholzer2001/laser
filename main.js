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

  // Build-your-own package
  const maxTier = PACKAGE_DISCOUNTS[PACKAGE_DISCOUNTS.length - 1];
  const discountFor = (n) => {
    let pct = 0;
    PACKAGE_DISCOUNTS.forEach(([areas, p]) => { if (n >= areas) pct = p; });
    return pct;
  };

  $("#ladder").innerHTML = PACKAGE_DISCOUNTS.map(([n, p]) => `
    <li data-n="${n}"><strong>${p}%</strong><span>${n}${n === maxTier[0] ? "+" : ""} areas</span></li>`).join("");

  const buildCats = PRICE_CATEGORIES.filter((c) => c.id !== "packages" && c.id !== "full");
  $("#builder-groups").innerHTML = buildCats.map((cat, ci) => `
    <details class="group"${ci === 0 ? " open" : ""}>
      <summary>${esc(cat.title)} <span class="group-count" data-cat="${cat.id}"></span></summary>
      <div class="chips">
        ${cat.items.map(([name, w, m], ii) => `
          <label class="chip">
            <input type="checkbox" data-cat="${cat.id}" data-w="${w ?? ""}" data-m="${m ?? ""}" data-name="${esc(name)}" value="${cat.id}-${ii}">
            <span class="chip-name">${esc(name)}</span>
            <span class="chip-price"></span>
          </label>`).join("")}
      </div>
    </details>`).join("");

  const boxes = $$("#builder-groups input");
  const who = () => $('input[name="who"]:checked').value;

  const update = () => {
    const g = who();
    let sub = 0;
    const picked = [];
    boxes.forEach((b) => {
      const price = b.dataset[g] === "" ? null : Number(b.dataset[g]);
      const chip = b.closest(".chip");
      chip.querySelector(".chip-price").textContent = rand(price);
      b.disabled = price == null;
      if (b.disabled) b.checked = false;
      chip.classList.toggle("off", b.disabled);
      if (b.checked) { sub += price; picked.push([b.dataset.name, price]); }
    });

    buildCats.forEach((cat) => {
      const n = boxes.filter((b) => b.dataset.cat === cat.id && b.checked).length;
      $(`.group-count[data-cat="${cat.id}"]`).textContent = n ? `${n} selected` : "";
    });

    const n = picked.length;
    const pct = discountFor(n);
    const total = pct ? Math.round((sub * (100 - pct)) / 100 / 10) * 10 : sub;

    $("#sum-list").innerHTML = picked.map(([name, p]) => `<li><span>${esc(name)}</span><span>${rand(p)}</span></li>`).join("");
    $("#sum-count").textContent = n;
    $("#sum-sub").textContent = rand(sub);
    $("#sum-disc").textContent = pct ? `−${pct}%` : "—";
    $("#sum-total").textContent = rand(total);

    const next = PACKAGE_DISCOUNTS.find(([areas]) => areas > n);
    let hint;
    if (n === 0) hint = "Choose two or more areas to unlock a discount.";
    else if (next) hint = `Add ${next[0] - n} more area${next[0] - n > 1 ? "s" : ""} for ${next[1]}% off.`;
    else hint = `You've reached the maximum ${maxTier[1]}% package discount.`;
    if (n && pct) hint = `You save ${rand(sub - total)} per session. ` + hint;
    $("#sum-hint").textContent = hint;

    $("#sum-bar-text").textContent = n
      ? `${n} area${n > 1 ? "s" : ""} · ${rand(total)}${pct ? ` (−${pct}%)` : ""}`
      : "";
    showBar();

    $$("#ladder li").forEach((li) => li.classList.toggle("on", Number(li.dataset.n) === PACKAGE_DISCOUNTS.filter(([a]) => n >= a).pop()?.[0]));
  };

  // Mobile: floating total while picking, hidden once the summary itself is on screen
  let pickVisible = false, sumVisible = false;
  const showBar = () => {
    $("#sum-bar").hidden = !(pickVisible && !sumVisible && $("#sum-bar-text").textContent);
  };
  new IntersectionObserver(([e]) => { pickVisible = e.isIntersecting; showBar(); }).observe($("#builder-groups"));
  new IntersectionObserver(([e]) => { sumVisible = e.isIntersecting; showBar(); }).observe($("#builder-sum"));

  $("#build").addEventListener("change", update);
  $("#sum-clear").addEventListener("click", () => { boxes.forEach((b) => (b.checked = false)); update(); });
  update();

  // Before & after
  const shot = (src, label, alt) => `
    <figure class="ba-shot">
      ${src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : ""}
      <figcaption>${label}</figcaption>
    </figure>`;
  $("#results-grid").innerHTML = (RESULTS.length ? RESULTS : [{}, {}, {}])
    .map((r) => `
      <article class="result${r.before ? "" : " placeholder"}">
        <div class="ba">
          ${shot(r.before, "Before", `${r.area} before laser hair removal`)}
          ${shot(r.after, "After", `${r.area} after ${r.sessions || ""} sessions`)}
        </div>
        <p class="result-cap">${r.area
          ? `<strong>${esc(r.area)}</strong>${r.sessions ? ` · ${esc(r.sessions)} sessions` : ""}`
          : "Before &amp; after photos coming soon"}</p>
      </article>`)
    .join("");

  // Reviews
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
  $("#reviews-grid").innerHTML = REVIEWS.length
    ? REVIEWS.map((r) => `
        <figure class="review">
          <div class="stars" aria-label="${r.stars || 5} out of 5 stars">${stars(r.stars || 5)}</div>
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption><strong>${esc(r.name)}</strong>${r.treatment ? `<span>${esc(r.treatment)}</span>` : ""}</figcaption>
        </figure>`).join("")
    : [1, 2, 3].map(() => `
        <figure class="review placeholder">
          <div class="stars" aria-hidden="true">☆☆☆☆☆</div>
          <blockquote>Client review coming soon.</blockquote>
        </figure>`).join("");

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
