// All menu data lives here as one JavaScript array.
// Each entry is a category with a list of dishes.
// script.js will read this array and build the page automatically.

const menuData = [
  {
    category: "Yogurt & Bowls",
    group: "Breakfast",
    items: [
      { name: "Yogurt Natural, Granola & Berries", price: "$15.00", description: "Yogurt with granola and fresh berries", image: "images/yogurt-natural-granola-berries.jpg" },
      { name: "Yogurt Coconut, Granola & Berries", price: "$17.00", description: "Coconut yogurt with granola and fresh berries", image: "images/yogurt-coconut-granola-berries-v2.jpg" },
      { name: "Fruit Plate", price: "$18.00", description: "Selection of fresh seasonal fruit", image: "images/fruit plate.webp" },
      { name: "Acai Bowl", price: "$20.00", description: "Acai, granola, banana, goji berries, coconut", image: "images/acai-bowl.jpg" },
      { name: "Oatmeal", price: "$18.00", description: "Oatmeal with apple, buckwheat granola, pomegranate", image: "images/oatmeal.jpg" }
    ]
  },
  {
    category: "Eggs",
    group: "Breakfast",
    items: [
      { name: "Eggs Arrabbiata", price: "$23.00", description: "Eggs in spicy tomato sauce", image: "images/eggs-arrabbiata-final.jpg" },
      { name: "Egg White Omelette", price: "$22.00", description: "Egg white omelette with spinach, served with toast", image: "images/egg-white-omelette.jpg" },
      { name: "Quinoa Bowl", price: "$21.00", description: "Black rice, spinach, romesco, poached eggs", image: "images/quinoa-bowl.jpg" },
      { name: "Lemon Ricotta Pancakes", price: "$20.00", description: "With fresh blueberries", image: "images/lemon-ricotta-pancakes.jpg" },
      { name: "Avocado on Toast", price: "$27.00", description: "Poached eggs, chili", image: "images/avocado on toast.webp" },
      { name: "Smoked Salmon & Scrambled Eggs", price: "$27.00", description: "Served on sourdough", image: "images/scrambled smoke salmon.webp" },
      { name: "English Breakfast", price: "$30.00", description: "Eggs, sausage, bacon, beans, roasted tomato, mushroom, toast", image: "images/fulenglish.webp" },
      { name: "Prosciutto, Stracciatella & Egg", price: "$31.00", description: "With truffle and toast", image: "images/prosciutto toast.webp" },
      { name: "Eggs Benedict", price: "$21.00–$25.00", description: "Spinach, avocado, ham, or smoked salmon", image: "images/egg benegdit.webp" }
    ]
  },
  {
    category: "Pastries",
    group: "Breakfast",
    items: [
      { name: "Croissant", price: "$12.00", description: "Classic butter croissant", image: "images/croissant-v2.jpg" },
      { name: "Chocolate Croissant", price: "$12.00", description: "Croissant filled with chocolate", image: "images/chocolate-croissant.jpg" },
      { name: "Blueberry Muffin", price: "$12.00", description: "Fresh baked blueberry muffin", image: "images/blueberry-muffin-final.jpg" },
      { name: "Chocolate Muffin", price: "$12.00", description: "Fresh baked chocolate muffin", image: "images/mufin.webp" }
    ]
  },
  {
    category: "Breakfast Sides",
    group: "Breakfast",
    items: [
      { name: "Toast", price: "$10.00", description: "Sourdough or multigrain", image: "images/toast.jpg" },
      { name: "Baked Beans", price: "$10.00", description: "Slow-cooked beans in tomato sauce", image: "images/baked-beans-final.jpg" },
      { name: "Roasted Tomato", price: "$10.00", description: "Oven-roasted vine tomato", image: "images/roasted-tomato.jpg" },
      { name: "Hash Browns", price: "$10.00", description: "Crispy shredded potato", image: "images/hash-browns.jpg" },
      { name: "Avocado", price: "$12.00", description: "Sliced fresh avocado", image: "images/avocado.jpg" },
      { name: "Mushrooms", price: "$12.00", description: "Sauteed seasonal mushrooms", image: "images/mushrooms-final.jpg" },
      { name: "Spinach", price: "$12.00", description: "Sauteed fresh spinach", image: "images/spinach.jpg" },
      { name: "Smoked Salmon", price: "$12.00", description: "Thinly sliced smoked salmon", image: "images/smoked-salmon.jpg" },
      { name: "Bacon", price: "$12.00", description: "Crispy smoked bacon", image: "images/bacon.jpg" },
      { name: "Sausage", price: "$12.00", description: "Grilled breakfast sausage", image: "images/sausage.jpg" },
      { name: "Bagel", price: "$8.00", description: "Toasted bagel", image: "images/bagel salmon.webp" }
    ]
  },
  {
    category: "Cold Pressed Juices & Beverages",
    group: "Drinks",
    items: [
      { name: "Greens Juice", price: "$14.00", description: "Cold-pressed kale, cucumber, and celery", image: "images/greens-juice-final.jpg" },
      { name: "Roots Juice", price: "$14.00", description: "Cold-pressed beet, carrot, and ginger", image: "images/roots-juice-v2.jpg" },
      { name: "Mango Turmeric Juice", price: "$14.00", description: "Cold-pressed mango and turmeric", image: "images/mango-turmeric-juice-v2.jpg" },
      { name: "Trip CBD Drink", price: "$14.00", description: "Lemon & Basil, Elderflower & Mint, or Peach & Ginger", image: "images/placeholder.svg" },
      { name: "La Colombe Cold Brew", price: "$12.00", description: "Smooth, slow-steeped iced coffee", image: "images/la-colombe-cold-brew.jpg" },
      { name: "Draft Latte", price: "$12.00", description: "Espresso with steamed milk, on draft", image: "images/draft-latte-final.jpg" }
    ]
  },
  {
    category: "Coffee & Tea",
    group: "Drinks",
    items: [
      { name: "Espresso", price: "$7.00", description: "Rich, concentrated shot of coffee", image: "images/espresso-final.jpg" },
      { name: "Macchiato", price: "$7.00", description: "Espresso with a dash of foamed milk", image: "images/macchiato-v2.jpg" },
      { name: "Americano", price: "$8.00", description: "Espresso diluted with hot water", image: "images/americano-v2.jpg" },
      { name: "Cappuccino", price: "$8.00", description: "Espresso with steamed milk and foam", image: "images/cappuccino-v2.jpg" },
      { name: "Café Latte", price: "$8.00", description: "Espresso with steamed milk", image: "images/caf-latte-v2.jpg" },
      { name: "Matcha Latte", price: "$9.00", description: "Japanese green tea with steamed milk", image: "images/matcha-latte.jpg" },
      { name: "Rishi Tea", price: "$5.00", description: "Selection of teas", image: "images/rishi-tea.jpg" },
      { name: "Fresh Juice", price: "$7.00", description: "Grapefruit, orange, pineapple, watermelon, or apple", image: "images/fresh-juice-v2.jpg" },
      { name: "Health & Functional Drink", price: "$10.00", description: "Wellness tonic with functional ingredients", image: "images/placeholder.svg" }
    ]
  },
  {
    category: "Cicchetti",
    group: "Drinks",
    items: [
      { name: "Zucchini Fritti", price: "$21.00", description: "With lemon aioli", image: "images/zucchini-fritti-v2.jpg" },
      { name: "Meatballs", price: "$23.00", description: "Tomato sauce, basil", image: "images/meatballs.webp" },
      { name: "Cured Meat & Cheeses", price: "$43.00", description: "Selection of Italian cured meats and cheeses", image: "images/cured-meat-cheeses.jpg" },
      { name: "Whipped Ricotta", price: "$27.00", description: "Whipped ricotta with olive oil and herbs", image: "images/whipped-ricotta.jpg" },
      { name: "Baked Gnocchi Romana", price: "$22.00", description: "Semolina gnocchi baked with butter and parmesan", image: "images/baked noki.webp" },
      { name: "Avocado Dip", price: "$31.00", description: "Creamy avocado dip with lime and chili", image: "images/avocado-dip.jpg" }
    ]
  },
  {
    category: "Appetizers",
    group: "Lunch",
    items: [
      { name: "Burrata, Beets, Avocado", price: "$26.00", description: "Creamy burrata with roasted beets and avocado", image: "images/burata.webp" },
      { name: "Grilled Octopus", price: "$33.00", description: "Chargrilled octopus with olive oil and lemon", image: "images/octopus.webp" },
      { name: "Calamari Fritti", price: "$25.00", description: "Crispy fried calamari with lemon aioli", image: "images/calamari.webp" },
      { name: "Vegetable Minestrone Soup", price: "$21.00", description: "Classic Italian vegetable and bean soup", image: "images/vegetable-minestrone-soup.jpg" },
      { name: "Artichokes, Cacio & Pepe", price: "$26.00", description: "Artichokes with pecorino cheese and cracked black pepper", image: "images/placeholder.svg" },
      { name: "Vitello Tonnato", price: "$28.00", description: "Thinly sliced veal with creamy tuna caper sauce", image: "images/vitello tonnato.webp" }
    ]
  },
  {
    category: "Carpaccio & Tartare",
    group: "Lunch",
    items: [
      { name: "Beef Carpaccio", price: "$30.00", description: "Thinly sliced raw beef with arugula and parmesan", image: "images/Beef Carpaccio.jpg" },
      { name: "Ahi Tuna Tartare", price: "$31.00", description: "Diced raw ahi tuna with citrus and avocado", image: "images/tuna tartare.webp" },
      { name: "Beef Tartare", price: "$34.00", description: "Hand-cut raw beef with capers, egg yolk, and shallot", image: "images/beef tartare.webp" },
      { name: "Hamachi Crudo", price: "$27.00", description: "Thinly sliced raw yellowtail with citrus and chili", image: "images/hamachi-crudo.jpg" }
    ]
  },
  {
    category: "Salads",
    group: "Lunch",
    items: [
      { name: "Butter Lettuce", price: "$22.00", description: "Butter lettuce with a light vinaigrette", image: "images/butter-lettuce-v2.jpg" },
      { name: "Chopped Salad with Chicken", price: "$31.00", description: "Chopped vegetables, grilled chicken, and vinaigrette", image: "images/chopped-salad-with-chicken.jpg" },
      { name: "Caesar Salad", price: "$23.00", description: "Romaine, parmesan, and croutons with Caesar dressing", image: "images/caesar-salad-v2.jpg" },
      { name: "Tuscan Kale", price: "$25.00", description: "Tuscan kale with lemon and parmesan", image: "images/tuscan-kale.jpg" },
      { name: "Add Protein Upgrade", price: "$14.00", description: "Add chicken, salmon, or shrimp to any salad", image: "images/placeholder.svg" }
    ]
  },
  {
    category: "Wood Oven Pizza",
    group: "Lunch",
    items: [
      { name: "Buffalo Mozzarella Pizza", price: "$30.00", description: "Wood-fired pizza with tomato and buffalo mozzarella", image: "images/buffalo-mozzarella-pizza-final.jpg" },
      { name: "Burrata Pizza", price: "$36.00", description: "Wood-fired pizza topped with creamy burrata", image: "images/pizza.webp" },
      { name: "Calabrian Sausage Pizza", price: "$32.00", description: "Wood-fired pizza with spicy Calabrian sausage", image: "images/calabrian-sausage-pizza.jpg" },
      { name: "Black Truffle Pizza", price: "$60.00", description: "White pizza with black truffle and mozzarella", image: "images/black-truffle-pizza.jpg" },
      { name: "Spicy Salami Pizza", price: "$34.00", description: "Wood-fired pizza with spicy salami", image: "images/spicy-salami-pizza-v2.jpg" },
      { name: "Artichokes Pizza", price: "$30.00", description: "Wood-fired pizza with artichokes and mozzarella", image: "images/artichokes-pizza.jpg" }
    ]
  },
  {
    category: "Pasta & Risotto",
    group: "Lunch",
    items: [
      { name: "Fusilli Zucchini", price: "$28.00", description: "Fusilli pasta with zucchini and pecorino", image: "images/fusilli-zucchini-final.jpg" },
      { name: "Spaghetti Lobster", price: "$62.00", description: "Spaghetti with fresh lobster in a light tomato sauce", image: "images/spaghetti-lobster.jpg" },
      { name: "Agnolotti del Plin", price: "$45.00", description: "Piedmontese stuffed pasta with butter and sage", image: "images/agnolotti-del-plin-final.jpg" },
      { name: "Rigatoni Bolognese", price: "$34.00", description: "Rigatoni with slow-cooked meat sauce", image: "images/rigatoni.webp" },
      { name: "Cavatelli Lamb Ragu", price: "$39.00", description: "Cavatelli pasta with braised lamb ragu", image: "images/cavatelli-lamb-ragu-v2.jpg" },
      { name: "Risotto Porcini", price: "$34.00", description: "Creamy risotto with porcini mushrooms", image: "images/risotto-porcini-final.jpg" },
      { name: "Tonnarelli Cacio e Pepe", price: "$35.00", description: "Tonnarelli pasta with pecorino and black pepper", image: "images/pasta.webp" },
      { name: "Shaved Truffle Add-On", price: "$35.00", description: "Add to any pasta or risotto", image: "images/placeholder.svg" }
    ]
  },
  {
    category: "Mains",
    group: "Lunch",
    items: [
      { name: "Salmon with Broccolini", price: "$42.00", description: "Pan-seared salmon with broccolini", image: "images/salmon.webp" },
      { name: "Branzino", price: "$47.00", description: "Whole roasted Mediterranean sea bass", image: "images/branzino.jpg" },
      { name: "Lamb Chops Scottadito", price: "$53.00", description: "Grilled lamb chops with rosemary", image: "images/lamb-chops-scottadito.jpg" },
      { name: "Chicken Paillard", price: "$34.00", description: "Pounded grilled chicken breast with lemon", image: "images/chicken paillard.webp" },
      { name: "Filet Mignon", price: "$75.00", description: "Grilled beef tenderloin", image: "images/filet mignon.webp" },
      { name: "Eggplant Parmigiana", price: "$34.00", description: "Layered eggplant with tomato sauce and mozzarella", image: "images/eggplant-parmigiana.jpg" },
      { name: "Dover Sole", price: "$95.00", description: "Pan-seared Dover sole", image: "images/dover-sole-final.jpg" },
      { name: "Whole Cauliflower", price: "$29.00", description: "Whole roasted cauliflower with herbs", image: "images/whole-cauliflower-final.jpg" },
      { name: "Veal Milanese", price: "$85.00", description: "Breaded and fried veal cutlet", image: "images/veal milanese.webp" },
      { name: "Bistecca alla Fiorentina", price: "$240.00", description: "Grilled Florentine T-bone steak", image: "images/bistecca-alla-fiorentina.jpg" }
    ]
  },
  {
    category: "All Day Sides",
    group: "Lunch",
    items: [
      { name: "Roasted Rosemary Potatoes", price: "$14.00", description: "Oven-roasted potatoes with rosemary", image: "images/roasted-rosemary-potatoes-final.jpg" },
      { name: "Arugula & Parmigiano", price: "$14.00", description: "Arugula with shaved parmesan and lemon", image: "images/arugula-parmigiano-v2.jpg" },
      { name: "Green Leaves", price: "$14.00", description: "Mixed green leaves with olive oil", image: "images/green-leaves.jpg" },
      { name: "Sautéed Spinach", price: "$14.00", description: "Fresh spinach sauteed with garlic", image: "images/saut-ed-spinach.jpg" },
      { name: "Broccolini, Chili", price: "$14.00", description: "Broccolini sauteed with chili flakes", image: "images/broccolini-chili.jpg" },
      { name: "Brussel Sprout", price: "$14.00", description: "Roasted brussels sprouts", image: "images/brussel-sprout.jpg" }
    ]
  },
  {
    category: "Desserts",
    group: "Lunch",
    items: [
      { name: "Tiramisu", price: "$16.00", description: "Classic Italian layered coffee dessert", image: "images/tiramisu.webp" },
      { name: "Key Lime Pie", price: "$16.00", description: "Miami classic, tart and creamy", image: "images/key lime pie.webp" },
      { name: "Flourless Chocolate Cake", price: "$16.00", description: "Rich flourless chocolate cake", image: "images/flourless-chocolate-cake.jpg" },
      { name: "Pannacotta", price: "$16.00", description: "With strawberry", image: "images/panacote.webp" },
      { name: "Fruit Bowl", price: "$16.00", description: "Seasonal fresh fruit", image: "images/fruit-bowl-final.jpg" },
      { name: "Profiteroles", price: "$20.00", description: "Cream-filled choux pastry with chocolate sauce", image: "images/profiteroles.jpg" },
      { name: "Mayer Lemon Meringata", price: "$20.00", description: "Meyer lemon tart with torched meringue", image: "images/mayer-lemon-meringata-final.jpg" },
      { name: "Apple Crostata", price: "$20.00", description: "Rustic Italian apple tart", image: "images/placeholder.svg" },
      { name: "Gelato & Sorbet", price: "$7.00", description: "Selection of flavors", image: "images/gelato-sorbet-final.jpg" }
    ]
  }
];
