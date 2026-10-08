/* Nordic Fitness catalogue.
 * To add a product: drop a photo in assets/img/ and add an entry below.
 * Prices are intentionally omitted ("Ask for price"); add a `price` field
 * (number, in GHS) to show one on the card.
 */
window.NF_CATEGORIES = [
  { id: "cardio",   label: "Cardio",            icon: "🏃", cover: "treadmill-xterra" },
  { id: "strength", label: "Strength",          icon: "🏋️", cover: "hip-thrust-machine" },
  { id: "wellness", label: "Recovery & Wellness", icon: "🧖", cover: "massage-chair-grey" },
  { id: "games",    label: "Game Room",         icon: "🎱", cover: "pool-table-classic" },
  { id: "outdoor",  label: "Outdoor Living",    icon: "🔥", cover: "outdoor-kitchen" },
  { id: "home",     label: "Home & Lifestyle",  icon: "🛋️", cover: "theater-recliners" }
];

window.NF_PRODUCTS = [
  // Cardio
  { id: "sole-curved-treadmill", name: "SOLE Curved Manual Treadmill", brand: "SOLE", cat: "cardio", tags: ["home","pro","medium","large"],
    desc: "A self-powered curved treadmill for HIIT and sprint training. It needs no electricity and is built for commercial use." },
  { id: "sole-treadmill", name: "SOLE Folding Smart Treadmill", brand: "SOLE", cat: "cardio", tags: ["home","medium","large"],
    desc: "Folding treadmill with a touchscreen console that connects to popular fitness apps (Peloton, JRNY, Zwift and more)." },
  { id: "treadmill-xterra", name: "XTERRA Fitness Treadmill", brand: "XTERRA", cat: "cardio", tags: ["home","small","medium"],
    desc: "Reliable home treadmill with a cushioned deck, incline settings and an easy-to-read console." },
  { id: "bodycraft-treadmill", name: "Bodycraft T-Series Treadmill", brand: "Bodycraft", cat: "cardio", tags: ["home","pro","medium","large"],
    desc: "Heavy-duty treadmill with a large LED display, made for daily family or light commercial use." },
  { id: "nordictrack-rower", name: "NordicTrack Smart Rower", brand: "NordicTrack", cat: "cardio", tags: ["home","small","medium"],
    desc: "Full-body, low-impact rowing machine with a rotating HD screen for live and on-demand classes." },
  { id: "air-rower", name: "Commercial Air Rower", brand: "Commercial", cat: "cardio", tags: ["pro","medium","large"],
    desc: "Fan-resistance rower: the harder you pull, the more resistance you get. A gym-floor favourite." },
  { id: "schwinn-bike", name: "Schwinn IC Indoor Cycling Bike", brand: "Schwinn", cat: "cardio", tags: ["home","small","medium"],
    desc: "Studio-style spin bike with Bluetooth and support for JRNY, Peloton and Zwift. It fits in a small corner." },

  // Strength
  { id: "hip-thrust-machine", name: "Plate-Loaded Hip Thrust Machine", brand: "Commercial", cat: "strength", tags: ["pro","large"],
    desc: "A dedicated glute builder with a padded belt and a plate-loaded lever arm, for serious gyms and home studios." },
  { id: "hoist-leg-extension", name: "HOIST Leg Extension / Curl", brand: "HOIST", cat: "strength", tags: ["pro","home","medium","large"],
    desc: "Selectorized dual leg extension and leg curl station with a commercial-grade weight stack." },
  { id: "bowflex-dumbbells", name: "Bowflex SelectTech Adjustable Dumbbells", brand: "Bowflex", cat: "strength", tags: ["home","small","medium"],
    desc: "A whole rack of dumbbells in one pair. Dial in the weight you need in seconds." },
  { id: "utility-bench", name: "Body-Solid Utility Seat Bench", brand: "Body-Solid", cat: "strength", tags: ["home","pro","small","medium","large"],
    desc: "Upright utility bench for seated presses, curls and accessory work. Solid steel frame." },
  { id: "boxing-trainer", name: "Reflex Boxing Training Station", brand: "Combat", cat: "strength", tags: ["home","pro","medium","large"],
    desc: "Free-standing boxing trainer with several strike pads, for cardio-boxing, reflexes and power." },

  // Wellness
  { id: "massage-chair-grey", name: "Zero-Gravity Massage Chair", brand: "Premium", cat: "wellness", tags: ["home","small","medium","large"],
    desc: "Full-body massage chair with zero-gravity recline, foot rollers and ambient lighting." },
  { id: "massage-chair-beige", name: "Luxury 4D Massage Chair, Beige", brand: "Premium", cat: "wellness", tags: ["home","pro","small","medium","large"],
    desc: "4D massage rollers, airbag compression and a tablet-style remote, finished in warm beige." },
  { id: "massage-chair-brown", name: "Executive Massage Chair, Espresso", brand: "Premium", cat: "wellness", tags: ["home","pro","small","medium","large"],
    desc: "Quilted leather-look massage chair with an LCD controller. A statement piece for any living room or office." },
  { id: "infrared-sauna", name: "LUMI Far-Infrared Sauna", brand: "LUMI", cat: "wellness", tags: ["home","medium","large"],
    desc: "Premium hemlock wood, LCD touch panel, Bluetooth audio and far-infrared carbon heaters. Runs at 30–65°C on 220–240V AC." },
  { id: "barrel-sauna", name: "Outdoor Cube Sauna", brand: "Premium", cat: "wellness", tags: ["home","pro","large"],
    desc: "Glass-front outdoor sauna with a weather-proof roof. A backyard retreat for the whole family." },

  // Games
  { id: "pool-table-classic", name: "Westerton Bar-Size Pool Table", brand: "Westerton", cat: "games", tags: ["home","pro","medium","large"],
    desc: "Classic carved-leg pool table measuring 87 in × 50 in. Ideal room size is 17 ft × 13 ft." },
  { id: "pool-table-rustic", name: "Rustic Grey Trestle Pool Table", brand: "Premium", cat: "games", tags: ["home","pro","medium","large"],
    desc: "Modern farmhouse styling with X-trestle legs and black felt. Accessories included." },
  { id: "pool-table-walnut", name: "Walnut Trestle Pool Table", brand: "Premium", cat: "games", tags: ["home","medium","large"],
    desc: "Rich walnut finish with tan felt and a sturdy X-base that fits a modern lounge." },
  { id: "stiga-table-tennis", name: "STIGA Tournament Table Tennis Table", brand: "STIGA", cat: "games", tags: ["home","pro","medium","large"],
    desc: "Competition-grade indoor table that folds for storage and rolls on lockable wheels." },
  { id: "outdoor-table-tennis", name: "Concrete-Look Outdoor Ping Pong Table", brand: "Premium", cat: "games", tags: ["home","pro","large"],
    desc: "All-weather outdoor table with a steel net and a sculptural X-base, made for compounds and hotels." },
  { id: "foosball-table", name: "Arcade Foosball Table", brand: "Premium", cat: "games", tags: ["home","pro","small","medium"],
    desc: "Full-size foosball table with sturdy rods and an easy-assembly frame, built to last." },
  { id: "basketball-hoop", name: "MegaSlam In-Ground Basketball Hoop", brand: "MegaSlam", cat: "games", tags: ["home","pro","large"],
    desc: "Pro-style in-ground hoop with a tempered glass backboard and an adjustable height." },

  // Outdoor living
  { id: "napoleon-grill", name: "Napoleon Prestige PRO™ 825 RSBI Gas Grill", brand: "Napoleon", cat: "outdoor", tags: ["home","pro","large"],
    desc: "Infrared rear burner, double infrared sear burner, side burner and rotisserie kit. 123,000 BTUs, 51 burger capacity, 1430 in² cooking area. Natural gas, stainless steel." },
  { id: "outdoor-kitchen", name: "Modular Outdoor Kitchen, Black", brand: "Premium", cat: "outdoor", tags: ["home","pro","large"],
    desc: "Complete outdoor kitchen island with a built-in grill, storage drawers and a beverage fridge." },
  { id: "outdoor-kitchen-steel", name: "Stainless Outdoor Kitchen Suite", brand: "Grillo", cat: "outdoor", tags: ["home","pro","large"],
    desc: "Modular stainless-steel cabinets with a sink and fridge module. Configure it to fit your patio." },
  { id: "ice-maker", name: "Commercial Undercounter Ice Maker", brand: "Commercial", cat: "outdoor", tags: ["pro","home","medium","large"],
    desc: "High-output stainless ice machine for bars, restaurants or the ultimate home entertainment area." },
  { id: "garden-light", name: "Brass Landscape Path Light", brand: "Premium", cat: "outdoor", tags: ["home","small","medium","large"],
    desc: "Solid brass path light that gives your compound or garden walkway a warm finish." },

  // Home & lifestyle
  { id: "theater-recliners", name: "Home Theater Power Recliners", brand: "Premium", cat: "home", tags: ["home","medium","large"],
    desc: "Multi-seat leather theater recliners with cup holders and LED base lighting." },
  { id: "electric-scooter", name: "Seated Electric Scooter", brand: "Premium", cat: "home", tags: ["home","small","medium","large"],
    desc: "Foldable e-scooter with a removable seat and off-road tyres, for an easy daily commute." },
  { id: "water-dispenser", name: "Brio Bottom-Load Water Dispenser", brand: "Brio", cat: "home", tags: ["home","pro","small","medium","large"],
    desc: "Hot, cold and room-temperature water. Bottom loading means no heavy lifting." }
];
