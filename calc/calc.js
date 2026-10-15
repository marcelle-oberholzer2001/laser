// Quick price calculator for the therapist. All prices and discounts come from ../site-data.js,
// so it always matches the website. Same maths as the website's "Build your own package".
(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const rand = (n) => "R " + n.toLocaleString("en-ZA").replace(/,/g, " ");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const round10 = (n) => Math.round(n / 10) * 10;
  const tierFor = (table, n) => {
    let pct = 0;
    table.forEach(([min, p]) => { if (n >= min) pct = p; });
    return pct;
  };
  const areaDiscount = (n) => tierFor(PACKAGE_DISCOUNTS, n);
  const courseDiscount = (n) => tierFor(COURSE_DISCOUNTS, n);
  const combined = (areaPct, coursePct) =>
    Math.min(MAX_TOTAL_DISCOUNT, Math.round((100 - ((100 - areaPct) * (100 - coursePct)) / 100) * 10) / 10);

  // Single areas: name → [female, male]
  const cats = PRICE_CATEGORIES.filter((c) => c.id !== "packages" && !c.calculated && !c.single);
  const single = {};
  cats.forEach((c) => c.items.forEach(([name, w, m]) => (single[name] = { w, m })));

  // Full Body: priced from its own area list at its own % (30%), like the website.
  const fullCat = PRICE_CATEGORIES.find((c) => c.id === "full");
  const fullBody = fullCat && fullCat.items.map(([name, parts, , pct]) => {
    const sum = (list, k) => list.reduce((a, p) => (a == null || single[p][k] == null ? null : a + single[p][k]), 0);
    const w = sum(parts.ladies, "w"), m = sum(parts.gents, "m");
    return { name, pct, separately: { w, m }, w: w == null ? null : round10((w * (100 - pct)) / 100), m: m == null ? null : round10((m * (100 - pct)) / 100) };
  })[0];

  let g = "w";
  let course = 1;

  // Session / course buttons
  $("#course").innerHTML = COURSE_DISCOUNTS.map(([n, p]) => `
    <button type="button" data-n="${n}" aria-pressed="${n === 1}">
      <strong>${n === 1 ? "Single" : n + "×"}</strong><small>${n === 1 ? "1 session" : `−${p}%`}</small>
    </button>`).join("");

  // Area chips, grouped like the website
  const groups = cats.map((c) => ({ title: c.title, items: c.items.map(([name]) => ({ name, ...single[name] })) }));
  if (fullBody) groups.push({ title: "Full Body", full: true, items: [fullBody] });
  $("#groups").innerHTML = groups.map((grp) => `
    <div class="group">
      <h3>${esc(grp.title)}</h3>
      <div class="chips">
        ${grp.items.map((it) => `
          <button type="button" class="chip${grp.full ? " full" : ""}" aria-pressed="false" data-name="${esc(it.name)}" data-w="${it.w ?? ""}" data-m="${it.m ?? ""}"${grp.full ? " data-full" : ""}>
            <span>${esc(it.name)}</span><small></small>
          </button>`).join("")}
      </div>
    </div>`).join("");

  const chips = $$(".chip");
  const priceOf = (chip) => (chip.dataset[g] === "" ? null : Number(chip.dataset[g]));
  const on = (chip) => chip.getAttribute("aria-pressed") === "true";
  const set = (chip, v) => chip.setAttribute("aria-pressed", String(v));

  const line = (label, value, cls = "") => `<div class="${cls}"><span>${label}</span><span>${value}</span></div>`;

  const update = () => {
    // Hide areas not offered for this client, and show each chip's single price.
    chips.forEach((c) => {
      const p = priceOf(c);
      c.hidden = p == null;
      if (p == null) set(c, false);
      c.querySelector("small").textContent = p == null ? "" : rand(p);
    });
    $$(".group").forEach((grp) => (grp.hidden = grp.querySelectorAll(".chip:not([hidden])").length === 0));

    const picked = chips.filter(on);
    const full = picked.find((c) => c.hasAttribute("data-full"));
    const cPct = courseDiscount(course);
    const lines = [];
    let per, separately;

    if (!picked.length) {
      $("#lines").innerHTML = "";
      $("#big-label").textContent = "Select areas";
      $("#big").textContent = "R 0";
      $("#small").textContent = "";
      return;
    }

    if (full) {
      // Full Body already includes its 30%; a course adds on top (capped), as on the website.
      const base = priceOf(full);
      const aPct = fullBody.pct;
      const total = combined(aPct, cPct);
      separately = fullBody.separately[g];
      per = course === 1 ? base : round10((base * (100 - total)) / (100 - aPct));
      lines.push(line("Full Body (areas separately)", rand(separately)));
      lines.push(line(`Full Body discount`, `−${aPct}%`));
      if (course > 1) lines.push(line(`${course}-session course`, `−${cPct}%`));
      if (course > 1) lines.push(line("Total discount", `−${total}%`, "strong"));
    } else {
      const n = picked.length;
      separately = picked.reduce((a, c) => a + priceOf(c), 0);
      const aPct = areaDiscount(n);
      const total = combined(aPct, cPct);
      per = total ? round10((separately * (100 - total)) / 100) : separately;
      lines.push(line(`${n} area${n > 1 ? "s" : ""}`, rand(separately)));
      if (aPct) lines.push(line(`${n}-area discount`, `−${aPct}%`));
      if (course > 1) lines.push(line(`${course}-session course`, `−${cPct}%`));
      if (aPct && course > 1) lines.push(line("Total discount", `−${total}%`, "strong"));
      const next = PACKAGE_DISCOUNTS.find(([areas]) => areas > n);
      if (next) lines.push(line(`<em>+${next[0] - n} more area${next[0] - n > 1 ? "s" : ""} → ${next[1]}% off</em>`, "", "hint"));
    }

    const saved = (separately - per) * course;
    $("#lines").innerHTML = lines.join("");
    if (course === 1) {
      $("#big-label").textContent = "Price for this session";
      $("#big").textContent = rand(per);
      $("#small").textContent = saved > 0 ? `Saves ${rand(saved)}` : "";
    } else {
      $("#big-label").textContent = `Pay upfront for ${course} sessions`;
      $("#big").textContent = rand(per * course);
      $("#small").textContent = `${rand(per)} per session · saves ${rand(saved)}`;
    }
  };

  $("#who").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    g = b.dataset.g;
    $$("#who button").forEach((x) => set(x, x === b));
    update();
  });

  $("#course").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    course = Number(b.dataset.n);
    $$("#course button").forEach((x) => set(x, x === b));
    update();
  });

  $("#groups").addEventListener("click", (e) => {
    const c = e.target.closest(".chip");
    if (!c) return;
    const now = !on(c);
    // Full Body is a complete package on its own, so it doesn't combine with single areas.
    if (now && c.hasAttribute("data-full")) chips.forEach((x) => set(x, false));
    if (now && !c.hasAttribute("data-full")) chips.filter((x) => x.hasAttribute("data-full")).forEach((x) => set(x, false));
    set(c, now);
    update();
  });

  $("#clear").addEventListener("click", () => {
    chips.forEach((c) => set(c, false));
    update();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
})();
