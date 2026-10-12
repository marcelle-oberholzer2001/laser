// ─────────────────────────────────────────────────────────────
//  Laser at Bloom — everything editable lives in this file.
//  Prices are in Rand. Use null for "not offered".
// ─────────────────────────────────────────────────────────────

const SITE = {
  name: "Laser at Bloom",
  freshaUrl: "https://www.fresha.com/book-now/bloom-hair-face-nails-xmwmlets/services?lid=2745898&share=true&pId=2656571",
  address: ["28 Laurel Valley", "SilverLakes, Pretoria"],
  mapsQuery: "28 Laurel Valley, SilverLakes, Pretoria",
  hours: [
    ["Mon – Fri", "8:00 – 17:00"],
    ["Saturday", "8:00 – 17:00"],
    ["Sunday", "Closed"],
  ],
  // Leave any of these empty ("") and it is hidden on the site.
  phone: "072 971 1455",
  whatsapp: "",       // international format, no + or spaces, e.g. "27729711455"
  email: "",
  instagram: "",      // handle without @
};

// Before & after photos. Put the photo files in images/results/ and add one line per pair.
// While this list is empty the site shows "coming soon" placeholders.
const RESULTS = [
  { area: "Chin & Neck", sessions: 5, before: "images/results/chin-before.jpg", after: "images/results/chin-after.jpg" },
  { area: "Back", sessions: 5, before: "images/results/back-before.jpg", after: "images/results/back-after.jpg" },
  { area: "Underarms", sessions: 4, before: "images/results/underarms-before.jpg", after: "images/results/underarms-after.jpg" },
  // { area: "Underarms", sessions: 6, before: "images/results/underarms-before.jpg", after: "images/results/underarms-after.jpg" },
];

// Client reviews, copied from real client feedback (with their permission).
// While this list is empty the site shows "coming soon" placeholders.
// SAMPLE reviews below are for previewing the design only (they show a "Sample" tag).
// Delete every line with `sample: true` before launch.
const REVIEWS = [
  { sample: true, name: "Lindiwe K.", treatment: "Underarms & Hollywood", stars: 5, text: "I was so nervous for my first session, but it was quick and much less sore than waxing. Four sessions in and I hardly have any regrowth." },
  { sample: true, name: "Megan V.", treatment: "Full Legs", stars: 5, text: "The room is calm and private, and everything was explained before we started. I've stopped carrying a razor in my gym bag!" },
  { sample: true, name: "Johan B.", treatment: "Back & Shoulders", stars: 5, text: "Should have done this years ago. Professional, on time every visit, and the package price made it very affordable." },
  { sample: true, name: "Thandi M.", treatment: "Upper Lip & Chin", stars: 5, text: "Booking on Fresha is easy and the sessions take only a few minutes. My skin is so much smoother and no more ingrown hairs." },
  { sample: true, name: "Carla D.", treatment: "Brazilian", stars: 4, text: "Friendly, discreet and very professional. I'm halfway through my course and already see a huge difference." },
  { sample: true, name: "Pieter S.", treatment: "Full Beard (incl. neck)", stars: 5, text: "Razor bumps were a daily struggle for me. After a few sessions my neck is clear. Highly recommend." },
  // { name: "Anna M.", treatment: "Full Legs", stars: 5, text: "So quick and comfortable. After four sessions I barely shave anymore!" },
];

// Multi-area discount: number of areas → % off. Used by the ready-made packages and the
// build-your-own calculator. Anything above the last entry gets the last entry's discount.
const PACKAGE_DISCOUNTS = [
  [2, 5],
  [3, 10],
  [4, 15],
  [5, 20],
  [6, 25],
];

// Prepaid courses: number of sessions paid upfront → extra % off. [1, 0] is a single session.
const COURSE_DISCOUNTS = [
  [1, 0],
  [3, 3],
  [6, 5],
  [9, 7],
  [12, 10],
];

// Area and course discounts combine, but never beyond this total % off.
const MAX_TOTAL_DISCOUNT = 45;

const PRICE_CATEGORIES = [
  {
    id: "face",
    title: "Face & Neck",
    tagline: "Fine, careful work for the most visible areas.",
    items: [
      ["Upper Lip", 150, 200],
      ["Chin", 130, 180],
      ["Chin (extended)", 150, 200],
      ["Cheeks", 160, 210],
      ["Sideburns", 165, 215],
      ["Jawline", 125, 175],
      ["Forehead", 150, 200],
      ["Brows", 180, 230],
      ["Unibrow", 100, 150],
      ["Nose", 75, 125],
      ["Nasal Hair", 50, 100],
      ["Ears", 70, 120],
      ["Full Face", 480, 530, "Popular"],
      ["Neck", 250, 300],
      ["Full Neck — front", 225, 275],
      ["Full Neck — back", 185, 235],
      ["Full Beard (excl. neck)", 300, 350],
      ["Full Beard (incl. neck)", 400, 450],
      ["Full Head (bald)", 450, 500],
    ],
  },
  {
    id: "arms",
    title: "Arms & Underarms",
    tagline: "Smooth, low-maintenance arms all year.",
    items: [
      ["Underarms", 275, 325, "Popular"],
      ["Half Arms", 350, 400],
      ["Full Arms", 500, 550],
      ["Full Upper Arm", null, 400],
      ["Half Upper Arm", null, 400],
      ["Three-Quarter Arm", null, 550],
      ["Full Forearm (incl. elbow)", null, 400],
      ["Shoulders", 300, 350],
      ["Hands", 80, 130],
      ["Fingers", 80, 130],
    ],
  },
  {
    id: "body",
    title: "Chest & Stomach",
    tagline: "Clean lines without the daily razor.",
    items: [
      ["Chest", 400, 450],
      ["Stomach", 375, 425],
      ["Navel / Stomach Line", 125, 175],
      ["Navel / Stomach Line (extended)", 150, 200],
      ["Cleavage", 200, null],
      ["Areola / Nipples", 75, 125],
    ],
  },
  {
    id: "back",
    title: "Back",
    tagline: "The hard-to-reach areas, taken care of.",
    items: [
      ["Upper or Lower Back", 400, 450],
      ["Full Back", 700, 750, "Popular"],
    ],
  },
  {
    id: "bikini",
    title: "Bikini",
    tagline: "Comfortable, discreet and private.",
    items: [
      ["Bikini — sides", 275, null],
      ["Bikini — sides & top", 330, null],
      ["Brazilian — sides, top & strip", 400, null, "Popular"],
      ["Brazilian — sides, top & labia", 450, null],
      ["Hollywood", 500, null, "Popular"],
      ["Bum Cheeks", 250, null],
      ["Extended Thigh", 140, null],
    ],
  },
  {
    id: "legs",
    title: "Legs & Feet",
    tagline: "Hip to toe, without the stubble.",
    items: [
      ["Lower Legs (excl. knee)", 750, 800],
      ["Lower Legs (incl. knee)", 800, 850],
      ["Upper Legs (excl. knee)", 750, 800],
      ["Upper Legs (incl. knee)", 800, 850],
      ["Three-Quarter Leg", 1000, 1050],
      ["Full Legs", 1125, 1175, "Popular"],
      ["Full Legs (incl. feet)", 1200, 1250],
      ["Feet", 80, 130],
      ["Toes", 80, 130],
    ],
  },
  {
    id: "full",
    title: "Full Body",
    tagline: "Everything in one appointment: face, neck, underarms, arms, chest, stomach, back and legs, plus Hollywood for ladies.",
    // Calculated like the packages: [name, { ladies: [areas], gents: [areas] }, badge, % off].
    // The % here (30) replaces the multi-area table for this item.
    calculated: true,
    showSaving: true,   // show "Separately R… / Save R…" under the price
    items: [
      ["Full Body (incl. face & neck)", {
        ladies: ["Full Face", "Neck", "Underarms", "Full Arms", "Chest", "Stomach", "Full Back", "Full Legs", "Hollywood"],
        gents: ["Full Face", "Neck", "Underarms", "Full Arms", "Chest", "Stomach", "Full Back", "Full Legs"],
      }, "Best value", 30],
    ],
  },
  {
    id: "packages",
    title: "Packages",
    tagline: "Popular combinations, ready to book. Want a different mix? Build your own below.",
    // Each package lists the single areas it is made of. Prices are worked out automatically:
    // sum of those areas × (100% − PACKAGE_DISCOUNTS for that many areas), rounded to the nearest R10.
    // A dash (not offered) on any area makes the whole package not offered for that client.
    items: [
      ["Lip & Chin", ["Upper Lip", "Chin"]],
      ["Lip, Chin & Sideburns (lower face)", ["Upper Lip", "Chin", "Sideburns"]],
      ["Lower Face & Neck", ["Upper Lip", "Chin", "Sideburns", "Neck"]],
      ["Face & Neck", ["Full Face", "Neck"]],
      ["Underarms & Lip", ["Underarms", "Upper Lip"], "Popular"],
      ["Lower Face & Underarm", ["Upper Lip", "Chin", "Sideburns", "Underarms"]],
      ["Underarms & Bikini", ["Underarms", "Bikini — sides & top"]],
      ["Underarms & Brazilian", ["Underarms", "Brazilian — sides, top & labia"]],
      ["Underarms & Hollywood", ["Underarms", "Hollywood"], "Popular"],
      ["Stomach Line & Brazilian", ["Navel / Stomach Line", "Brazilian — sides, top & labia"]],
      ["Stomach Line & Hollywood", ["Navel / Stomach Line", "Hollywood"]],
      ["Underarm & Half Leg", ["Underarms", "Lower Legs (incl. knee)"]],
      ["Underarm & Full Leg", ["Underarms", "Full Legs"]],
      ["Full Legs & Brazilian", ["Full Legs", "Brazilian — sides, top & labia"]],
      ["Full Legs & Hollywood", ["Full Legs", "Hollywood"]],
      ["Underarms, Hollywood & Half Legs", ["Underarms", "Hollywood", "Lower Legs (incl. knee)"]],
      ["Underarm, Brazilian & Full Legs", ["Underarms", "Brazilian — sides, top & labia", "Full Legs"]],
      ["Underarms, Hollywood & Full Legs", ["Underarms", "Hollywood", "Full Legs"]],
      ["Hands & Fingers", ["Hands", "Fingers"]],
      ["Feet & Toes", ["Feet", "Toes"]],
      ["Full Arms & Underarms", ["Full Arms", "Underarms"]],
      ["Full Arms & Full Legs", ["Full Arms", "Full Legs"]],
      ["Chest & Stomach", ["Chest", "Stomach"]],
      ["Underarms, Chest & Stomach", ["Underarms", "Chest", "Stomach"]],
      ["Half Arms, Chest & Stomach", ["Half Arms", "Chest", "Stomach"]],
      ["Full Arms, Chest & Stomach", ["Full Arms", "Chest", "Stomach"]],
      ["Back & Shoulders", ["Full Back", "Shoulders"]],
      ["Neck (back) & Back", ["Full Neck — back", "Full Back"]],
      ["Neck, Back & Shoulders", ["Neck", "Full Back", "Shoulders"]],
      ["Chest, Stomach & Back", ["Chest", "Stomach", "Full Back"]],
      ["Half Arms, Chest, Stomach, Back & Full Legs", ["Half Arms", "Chest", "Stomach", "Full Back", "Full Legs"]],
      ["Face, Neck, Underarms, Full Arms, Full Legs & Brazilian", ["Full Face", "Neck", "Underarms", "Full Arms", "Full Legs", "Brazilian — sides, top & labia"]],
    ],
  },

  // ── Other laser treatments ──────────────────────────────────────────────
  // `single: true` = one price per treatment (no ladies/gents), and no area,
  // course or package discounts. These don't appear in the package builder.
  {
    id: "tattoo",
    title: "Tattoo Removal",
    single: true,
    tagline: "Priced per session by the size of the tattoo.",
    items: [
      ["Tattoo 1–4 cm", 280],
      ["Tattoo 5–10 cm", 350],
      ["Tattoo 11–20 cm", 455],
      ["Tattoo 21–30 cm", 595],
    ],
  },
  {
    id: "pmu",
    title: "PMU Removal",
    single: true,
    tagline: "Fading unwanted permanent makeup. Priced per session.",
    items: [
      ["Permanent Makeup / Eyebrow Tattoo Removal", 445],
      ["Lip / Eyeliner Tattoo Removal", 400],
    ],
  },
  {
    id: "toenail",
    title: "Toenail Fungus",
    single: true,
    tagline: "Laser treatment for fungal nail infections.",
    items: [
      ["Per nail", 150],
      ["Multi-nail / course", 650],
    ],
  },
  {
    id: "skin",
    title: "Skin Treatments",
    single: true,
    tagline: "Laser treatments for pigmentation, texture and a fresher complexion. Priced per session.",
    items: [
      ["Age Spot Treatment", 200],
      ["Scar Treatment", 200],
      ["Birthmark / Pigmentation Treatment", 200],
      ["Freckles / Pigmentation Treatment", 200],
      ["Pore Shrinking / Texture Improvement", 200],
      ["Fine Lines & Wrinkles Treatment", 200],
      ["Skin Rejuvenation", 665],
      ["Black Diamond Laser Treatment™ — face & neck", 488],
      ["Black Diamond Laser Treatment™ — face, neck & chest", 620],
      ["Clear Diamond Laser Treatment™ — face & neck", 500],
      ["Clear Diamond Laser Treatment™ — face, neck & chest", 550],
    ],
  },
];
