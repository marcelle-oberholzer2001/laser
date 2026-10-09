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
  // { area: "Underarms", sessions: 6, before: "images/results/underarms-before.jpg", after: "images/results/underarms-after.jpg" },
];

// Client reviews, copied from real client feedback (with their permission).
// While this list is empty the site shows "coming soon" placeholders.
const REVIEWS = [
  // { name: "Anna M.", treatment: "Full Legs", stars: 5, text: "So quick and comfortable. After four sessions I barely shave anymore!" },
];

// Build-your-own package: number of areas → % off.
// Anything above the last entry gets the last entry's discount.
const PACKAGE_DISCOUNTS = [
  [2, 15],
  [3, 20],
  [4, 25],
  [5, 30],
  [6, 35],
  [7, 40],
];

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
    tagline: "Everything, in one appointment.",
    items: [["Full Body", 2280, 2480]],
  },
  {
    id: "packages",
    title: "Packages",
    tagline: "Popular combinations, ready to book. Want a different mix? Build your own below.",
    items: [
      ["Lip & Chin", 240, 320],
      ["Lip, Chin & Sideburns (lower face)", 360, 480],
      ["Lower Face & Neck", 520, 670],
      ["Face & Neck", 620, 710],
      ["Underarms & Lip", 360, 450, "Popular"],
      ["Lower Face & Underarm", 540, 690],
      ["Underarms & Bikini", 510, null],
      ["Underarms & Brazilian", 620, null],
      ["Underarms & Hollywood", 660, null, "Popular"],
      ["Stomach Line & Brazilian", 490, null],
      ["Stomach Line & Hollywood", 530, null],
      ["Underarm & Half Leg", 910, 1000],
      ["Underarm & Full Leg", 1190, 1280],
      ["Full Legs & Brazilian", 1340, null],
      ["Full Legs & Hollywood", 1380, null],
      ["Underarms, Hollywood & Half Legs", 1260, null],
      ["Underarm, Brazilian & Full Legs", 1480, null],
      ["Underarms, Hollywood & Full Legs", 1520, null],
      ["Hands & Fingers", 140, 220],
      ["Feet & Toes", 140, 220],
      ["Full Arms & Underarms", 660, 740],
      ["Full Arms & Full Legs", 1380, 1470],
      ["Chest & Stomach", 660, 740],
      ["Underarms, Chest & Stomach", 840, 960],
      ["Half Arms, Chest & Stomach", 900, 1020],
      ["Full Arms, Chest & Stomach", 1020, 1140],
      ["Back & Shoulders", 850, 940],
      ["Neck (back) & Back", 750, 840],
      ["Neck, Back & Shoulders", 1000, 1120],
      ["Chest, Stomach & Back", 1180, 1300],
      ["Half Arms, Chest, Stomach, Back & Full Legs", 2070, 2240],
      ["Face, Neck, Underarms, Full Arms, Full Legs & Brazilian", 2000, null],
    ],
  },
];
