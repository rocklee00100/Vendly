/* ============================================
   Vendly — product data
   Replace SEED_PRODUCTS with your API response later.
   ============================================ */

const CURRENCY = '$';  // Change to '₦', '£', '€', 'KSh', etc.

const CATEGORIES = ['All', 'Food & Drink', 'Crafts', 'Home', 'Beauty', 'Clothing'];

const SEED_PRODUCTS = [
  { id: 1, name: 'Sourdough Loaf', price: 8.5, category: 'Food & Drink', emoji: '🍞',
    seller: "Maya's Kitchen", location: 'Eastwood',
    desc: 'Slow-fermented for 24 hours with a 100-year-old starter. Crackly crust, open crumb.',
    c1: '#f5d9b0', c2: '#e8b877', badge: 'Bestseller' },

  { id: 2, name: 'Raw Wildflower Honey', price: 12.0, category: 'Food & Drink', emoji: '🍯',
    seller: 'Hilltop Apiary', location: 'Greenfield',
    desc: 'Unfiltered, unpasteurised honey from hives on the meadow ridge. 340g jar.',
    c1: '#ffe08a', c2: '#f0b429', badge: '' },

  { id: 3, name: 'Hand-knitted Wool Scarf', price: 34.0, category: 'Clothing', emoji: '🧶',
    seller: 'Nana Ruth', location: 'Riverside',
    desc: 'Chunky merino wool, hand-knitted on needles. Choose any colour — made to order.',
    c1: '#d8c7f0', c2: '#a98fd6', badge: 'Handmade' },

  { id: 4, name: 'Soy Wax Candle', price: 16.5, category: 'Home', emoji: '🕯️',
    seller: 'Ember & Oak', location: 'Old Town',
    desc: 'Natural soy wax with cedarwood and vanilla. Burns clean for 45 hours.',
    c1: '#f7cfc0', c2: '#e39a80', badge: '' },

  { id: 5, name: 'Lavender Soap Bar', price: 6.0, category: 'Beauty', emoji: '🧼',
    seller: 'Field & Foam', location: 'Greenfield',
    desc: 'Cold-process soap with homegrown lavender and olive oil. Kind to sensitive skin.',
    c1: '#ded6f2', c2: '#b6a8e0', badge: 'Vegan' },

  { id: 6, name: 'Chocolate Chip Cookies', price: 9.0, category: 'Food & Drink', emoji: '🍪',
    seller: "Maya's Kitchen", location: 'Eastwood',
    desc: 'Box of eight, baked the morning you order. Brown butter and dark chocolate.',
    c1: '#e8c9a0', c2: '#c99a63', badge: '' },

  { id: 7, name: 'Strawberry Preserve', price: 7.5, category: 'Food & Drink', emoji: '🫙',
    seller: 'The Jam Shed', location: 'Riverside',
    desc: 'Small-batch jam from pick-your-own strawberries. No pectin, no nonsense.',
    c1: '#ffc2c2', c2: '#e8777a', badge: '' },

  { id: 8, name: 'Watercolour Print', price: 22.0, category: 'Crafts', emoji: '🎨',
    seller: 'Lila Draws', location: 'Old Town',
    desc: 'Giclée print of an original watercolour of the town bridge. A3, signed.',
    c1: '#bfe3f0', c2: '#7db9d6', badge: 'Limited' },

  { id: 9, name: 'Macramé Plant Hanger', price: 18.0, category: 'Home', emoji: '🌻',
    seller: 'Knot & Stem', location: 'Eastwood',
    desc: 'Hand-knotted cotton rope hanger. Fits pots up to 18cm. Plant not included.',
    c1: '#d6e8c4', c2: '#a3c47c', badge: '' },

  { id: 10, name: 'Reversible Tote Bag', price: 25.0, category: 'Clothing', emoji: '🧵',
    seller: 'Stitch House', location: 'Riverside',
    desc: 'Heavy cotton canvas, sewn in small runs. Reinforced straps, inner pocket.',
    c1: '#f0e0c8', c2: '#cdb493', badge: '' },

  { id: 11, name: 'Walnut Serving Board', price: 42.0, category: 'Home', emoji: '🪵',
    seller: 'Grain & Saw', location: 'Greenfield',
    desc: 'Hand-planed solid walnut, finished with food-safe oil. Each one unique.',
    c1: '#dcc4a8', c2: '#a87f57', badge: 'Handmade' },

  { id: 12, name: 'Cupcakes (Half Dozen)', price: 14.0, category: 'Food & Drink', emoji: '🧁',
    seller: 'Sugar Lane', location: 'Old Town',
    desc: 'Six cupcakes with Swiss meringue buttercream. Tell us your flavour mix.',
    c1: '#ffd6e8', c2: '#f0a0c4', badge: '' }
];
