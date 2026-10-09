// Builds the menu, dish detail screen and order cart from menu-data.js

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const money = (n) => "$" + n.toFixed(2);

function parsePrice(priceText) {
  const match = priceText.replace(",", "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function store(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
}

const ICON_PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_TRASH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V4h4v3m-8 0 1 13h10l1-13"/></svg>';

// ---------- Extras ----------
const FOOD_EXTRAS = [
  { name: "Extra Sauce", price: 1.5 },
  { name: "Extra Cheese", price: 2.0 },
  { name: "Side of Bread", price: 2.5 }
];
const COFFEE_EXTRAS = [
  { name: "Extra Shot", price: 1.5 },
  { name: "Oat Milk", price: 1.0 },
  { name: "Almond Milk", price: 1.0 }
];
const PASTA_EXTRAS = [
  { name: "Shaved Truffle", price: 35.0 },
  { name: "Extra Parmigiano", price: 2.0 },
  { name: "Side of Bread", price: 2.5 }
];
const PIZZA_EXTRAS = [
  { name: "Extra Cheese", price: 3.0 },
  { name: "Chili Oil", price: 1.0 },
  { name: "Add Burrata", price: 8.0 }
];
const NO_EXTRAS = [];

const extrasByCategory = {
  "Coffee & Tea": COFFEE_EXTRAS,
  "Pasta & Risotto": PASTA_EXTRAS,
  "Wood Oven Pizza": PIZZA_EXTRAS,
  "Cold Pressed Juices & Beverages": NO_EXTRAS,
  "Desserts": NO_EXTRAS,
  "All Day Sides": NO_EXTRAS,
  "Breakfast Sides": NO_EXTRAS,
  "Pastries": NO_EXTRAS
};

function extrasFor(categoryName) {
  return extrasByCategory[categoryName] || FOOD_EXTRAS;
}

// ---------- Flatten menu data into one list with stable ids ----------
const dishes = [];
menuData.forEach(function (category) {
  category.items.forEach(function (dish) {
    dishes.push(Object.assign({}, dish, {
      id: dish.name,
      group: category.group,
      category: category.category,
      basePrice: dish.options ? dish.options[0].price : parsePrice(dish.price)
    }));
  });
});

const groups = ["Breakfast", "Lunch", "Drinks", "Saved"];

// ---------- State ----------
const state = {
  group: "Lunch",
  category: "All",
  query: ""
};
let cart = store("mb-cart", []);
let favorites = store("mb-favorites", []);

// ---------- Screens ----------
const welcomeScreen = $("welcome-screen");
const menuScreen = $("menu-screen");
const detailScreen = $("detail-screen");

let lastScroll = 0;

function showMenu() {
  welcomeScreen.classList.add("hidden");
  detailScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
  document.body.classList.remove("on-welcome");
  updateCartUI();
}

$("view-menu-button").addEventListener("click", function () {
  showMenu();
  window.scrollTo(0, 0);
});

// ---------- Toast ----------
let toastTimer;
function toast(message) {
  const node = $("toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { node.classList.remove("show"); }, 2200);
}

// ---------- Menu rendering ----------
const dishList = $("dish-list");
const groupTabs = $("group-tabs");
const categoryChips = $("category-chips");

function categoriesFor(group) {
  const names = [];
  dishes.forEach(function (d) {
    if (d.group === group && names.indexOf(d.category) === -1) names.push(d.category);
  });
  return names;
}

function renderGroupTabs() {
  groupTabs.innerHTML = "";
  groups.forEach(function (name) {
    const tab = el("button", "group-tab", name === "Saved" ? "\u2665 Saved" : name);
    tab.setAttribute("role", "tab");
    const active = !state.query && name === state.group;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
    tab.addEventListener("click", function () {
      state.group = name;
      state.category = "All";
      state.query = "";
      $("search-input").value = "";
      render();
    });
    groupTabs.appendChild(tab);
  });
}

function renderChips() {
  categoryChips.innerHTML = "";
  categoryChips.classList.toggle("hidden", !!state.query);
  if (state.query) return;

  ["All"].concat(categoriesFor(state.group)).forEach(function (name) {
    const chip = el("button", "chip", name);
    chip.classList.toggle("active", name === state.category);
    chip.addEventListener("click", function () {
      state.category = name;
      render();
    });
    categoryChips.appendChild(chip);
  });
  categoryChips.scrollLeft = 0;
}

function visibleDishes() {
  const q = state.query.trim().toLowerCase();
  if (q) {
    return dishes.filter(function (d) {
      return (d.name + " " + d.description + " " + d.category).toLowerCase().indexOf(q) !== -1;
    });
  }
  if (state.group === "Saved") {
    return dishes.filter(function (d) { return favorites.indexOf(d.id) !== -1; });
  }
  return dishes.filter(function (d) {
    return d.group === state.group && (state.category === "All" || d.category === state.category);
  });
}

function buildDishCard(dish, index) {
  const card = el("article", "dish-card");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", dish.name + ", " + dish.price);
  card.style.animationDelay = Math.min(index, 12) * 30 + "ms";

  const photo = el("div", "dish-photo");
  const img = document.createElement("img");
  img.loading = "lazy";
  img.alt = "";
  img.src = dish.image;
  img.addEventListener("load", function () { photo.classList.add("loaded"); });
  img.addEventListener("error", function () { img.src = "images/placeholder.svg"; });
  photo.appendChild(img);

  if (dish.popular) photo.appendChild(el("span", "popular-pill", "Popular"));

  if (favorites.indexOf(dish.id) !== -1) {
    const heart = el("span", "fav-dot", "♥");
    heart.setAttribute("aria-label", "Favourite");
    photo.appendChild(heart);
  }

  const info = el("div", "dish-info");
  info.appendChild(el("h3", "", dish.name));
  info.appendChild(el("p", "description", dish.description));

  const footer = el("div", "dish-info-footer");
  footer.appendChild(el("p", "price", dish.price));

  const add = el("button", "add-button");
  add.innerHTML = ICON_PLUS;
  add.setAttribute("aria-label", "Add " + dish.name + " to order");
  add.addEventListener("click", function (event) {
    event.stopPropagation();
    // Dishes with variants open the detail screen so the guest can pick one
    if (dish.options) { showDetail(dish); return; }
    addToCart({ dish: dish, option: null, extras: [], qty: 1 });
  });
  footer.appendChild(add);
  info.appendChild(footer);

  card.appendChild(photo);
  card.appendChild(info);

  card.addEventListener("click", function () { showDetail(dish); });
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showDetail(dish);
    }
  });
  return card;
}

function renderDishes() {
  dishList.innerHTML = "";
  const list = visibleDishes();

  if (state.query) {
    const heading = el("p", "results-heading", list.length + (list.length === 1 ? " result" : " results") + " for “" + state.query.trim() + "”");
    dishList.appendChild(heading);
  }

  if (!list.length) {
    const none = state.group === "Saved" && !state.query
      ? "No saved dishes yet. Tap the heart on any dish to save it here."
      : "No dishes found. Try another word.";
    dishList.appendChild(el("p", "empty", none));
    return;
  }

  const grid = el("div", "dish-grid");
  list.forEach(function (dish, i) { grid.appendChild(buildDishCard(dish, i)); });
  dishList.appendChild(grid);
}

function render() {
  renderGroupTabs();
  renderChips();
  renderDishes();
}

// Search (debounced)
let searchTimer;
$("search-input").addEventListener("input", function (event) {
  clearTimeout(searchTimer);
  const value = event.target.value;
  searchTimer = setTimeout(function () {
    state.query = value;
    render();
  }, 150);
});

// ---------- Detail screen ----------
let currentDish = null;
let currentOption = null;
let quantity = 1;

const detailExtras = $("detail-extras");
const detailOptions = $("detail-options");

function selectedExtras() {
  const extras = extrasFor(currentDish.category);
  return Array.from(detailExtras.querySelectorAll("input:checked")).map(function (box) {
    return extras[Number(box.dataset.index)];
  });
}

function currentUnitPrice() {
  const base = currentOption ? currentOption.price : currentDish.basePrice;
  return base + selectedExtras().reduce(function (sum, e) { return sum + e.price; }, 0);
}

function updateDetailTotal() {
  $("detail-add-button").textContent = "Add to Order · " + money(currentUnitPrice() * quantity);
  if (currentOption) $("detail-price").textContent = money(currentOption.price);
}

function setQuantity(value) {
  quantity = Math.max(1, Math.min(20, value));
  $("quantity-value").textContent = quantity;
  updateDetailTotal();
}

function updateSaveButton() {
  const saved = favorites.indexOf(currentDish.id) !== -1;
  const btn = $("save-button");
  btn.classList.toggle("saved", saved);
  btn.setAttribute("aria-pressed", saved);
  btn.setAttribute("aria-label", saved ? "Remove from favourites" : "Save to favourites");
}

function showDetail(dish) {
  currentDish = dish;
  currentOption = dish.options ? dish.options[0] : null;
  lastScroll = window.scrollY;

  const img = $("detail-image");
  img.src = dish.image;
  img.alt = dish.name;
  $("detail-name").textContent = dish.name;
  $("detail-price").textContent = dish.price;
  $("detail-category-tag").textContent = dish.category;
  $("detail-description").textContent = dish.description;

  // Variants (e.g. Eggs Benedict: spinach / avocado / ham / salmon)
  detailOptions.innerHTML = "";
  $("detail-options-section").classList.toggle("hidden", !dish.options);
  if (dish.options) {
    dish.options.forEach(function (option, i) {
      const label = el("label", "option-row");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "dish-option";
      radio.checked = i === 0;
      radio.addEventListener("change", function () {
        currentOption = option;
        updateDetailTotal();
      });
      const name = el("span", "option-name", option.name);
      const price = el("span", "extra-price", money(option.price));
      label.appendChild(radio);
      label.appendChild(name);
      label.appendChild(price);
      detailOptions.appendChild(label);
    });
  }

  // Extras for this kind of dish
  const extras = extrasFor(dish.category);
  detailExtras.innerHTML = "";
  $("detail-extras-section").classList.toggle("hidden", !extras.length);
  extras.forEach(function (extra, index) {
    const label = el("label", "extra-row");
    const left = el("span", "extra-name");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.dataset.index = index;
    box.addEventListener("change", updateDetailTotal);
    left.appendChild(box);
    left.appendChild(document.createTextNode(extra.name));
    label.appendChild(left);
    label.appendChild(el("span", "extra-price", "+" + money(extra.price)));
    detailExtras.appendChild(label);
  });

  updateSaveButton();
  setQuantity(1);

  menuScreen.classList.add("hidden");
  $("cart-bar").classList.add("hidden");
  detailScreen.classList.remove("hidden");
  window.scrollTo(0, 0);
  history.pushState({ detail: true }, "");
}

function closeDetail(fromHistory) {
  if (detailScreen.classList.contains("hidden")) return;
  detailScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
  updateCartUI();
  window.scrollTo(0, lastScroll);
  if (!fromHistory && history.state && history.state.detail) history.back();
}

$("back-button").addEventListener("click", function () { closeDetail(false); });
window.addEventListener("popstate", function () { closeDetail(true); });

$("quantity-minus").addEventListener("click", function () { setQuantity(quantity - 1); });
$("quantity-plus").addEventListener("click", function () { setQuantity(quantity + 1); });

$("save-button").addEventListener("click", function () {
  const i = favorites.indexOf(currentDish.id);
  if (i === -1) {
    favorites.push(currentDish.id);
    toast("Saved to favourites");
  } else {
    favorites.splice(i, 1);
    toast("Removed from favourites");
  }
  save("mb-favorites", favorites);
  updateSaveButton();
  renderDishes();
});

$("share-button").addEventListener("click", function () {
  const text = currentDish.name + " – " + currentDish.price + " at Miami Beach";
  if (navigator.share) {
    navigator.share({ title: currentDish.name, text: text, url: location.href }).catch(function () {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text + " " + location.href).then(function () { toast("Link copied"); });
  } else {
    toast("Sharing isn't supported on this device");
  }
});

$("detail-add-button").addEventListener("click", function () {
  addToCart({ dish: currentDish, option: currentOption, extras: selectedExtras(), qty: quantity });
  closeDetail(false);
});

// ---------- Cart ----------
const SERVICE_RATE = 0.18;

function lineKey(dish, option, extras) {
  return [dish.id, option ? option.name : "", extras.map(function (e) { return e.name; }).sort().join("+")].join("|");
}

function addToCart(entry) {
  const key = lineKey(entry.dish, entry.option, entry.extras);
  const unit = (entry.option ? entry.option.price : entry.dish.basePrice) +
    entry.extras.reduce(function (sum, e) { return sum + e.price; }, 0);

  const existing = cart.find(function (line) { return line.key === key; });
  if (existing) {
    existing.qty += entry.qty;
  } else {
    cart.push({
      key: key,
      name: entry.dish.name,
      image: entry.dish.image,
      option: entry.option ? entry.option.name : "",
      extras: entry.extras.map(function (e) { return e.name; }),
      unit: unit,
      qty: entry.qty
    });
  }
  persistCart();
  toast("Added · " + entry.dish.name);
}

function persistCart() {
  save("mb-cart", cart);
  updateCartUI();
}

function cartCount() {
  return cart.reduce(function (sum, l) { return sum + l.qty; }, 0);
}

function cartSubtotal() {
  return cart.reduce(function (sum, l) { return sum + l.unit * l.qty; }, 0);
}

function updateCartUI() {
  const count = cartCount();
  const subtotal = cartSubtotal();

  const badge = $("cart-badge");
  badge.textContent = count;
  badge.classList.toggle("hidden", !count);

  const bar = $("cart-bar");
  const menuVisible = !menuScreen.classList.contains("hidden");
  bar.classList.toggle("hidden", !count || !menuVisible);
  $("cart-bar-count").textContent = count;
  $("cart-bar-total").textContent = money(subtotal);

  renderCartItems();
}

function renderCartItems() {
  const wrap = $("cart-items");
  wrap.innerHTML = "";

  if (!cart.length) {
    wrap.appendChild(el("p", "empty", "Your order is empty. Add something delicious!"));
  }

  cart.forEach(function (line) {
    const row = el("div", "cart-line");

    const img = document.createElement("img");
    img.src = line.image;
    img.alt = "";
    img.loading = "lazy";
    row.appendChild(img);

    const info = el("div", "cart-line-info");
    info.appendChild(el("p", "cart-line-name", line.name));
    const meta = [line.option].concat(line.extras).filter(Boolean).join(", ");
    if (meta) info.appendChild(el("p", "cart-line-meta", meta));

    const controls = el("div", "cart-line-controls");
    const stepper = el("div", "mini-stepper");
    const minus = el("button", "", "−");
    minus.setAttribute("aria-label", "Decrease " + line.name);
    const qty = el("span", "", String(line.qty));
    const plus = el("button", "", "+");
    plus.setAttribute("aria-label", "Increase " + line.name);
    minus.addEventListener("click", function () {
      line.qty -= 1;
      if (line.qty <= 0) cart = cart.filter(function (l) { return l !== line; });
      persistCart();
    });
    plus.addEventListener("click", function () {
      line.qty += 1;
      persistCart();
    });
    stepper.appendChild(minus);
    stepper.appendChild(qty);
    stepper.appendChild(plus);
    controls.appendChild(stepper);
    controls.appendChild(el("span", "cart-line-price", money(line.unit * line.qty)));
    info.appendChild(controls);
    row.appendChild(info);

    const remove = el("button", "icon-button small");
    remove.innerHTML = ICON_TRASH;
    remove.setAttribute("aria-label", "Remove " + line.name);
    remove.addEventListener("click", function () {
      cart = cart.filter(function (l) { return l !== line; });
      persistCart();
    });
    row.appendChild(remove);

    wrap.appendChild(row);
  });

  const subtotal = cartSubtotal();
  const service = subtotal * SERVICE_RATE;
  $("cart-subtotal").textContent = money(subtotal);
  $("cart-service").textContent = money(service);
  $("cart-total").textContent = money(subtotal + service);
  $("checkout-button").disabled = !cart.length;
  $("clear-cart-button").classList.toggle("hidden", !cart.length);
}

// Drawer open / close
const drawer = $("cart-drawer");
const backdrop = $("cart-backdrop");

function openCart() {
  renderCartItems();
  backdrop.classList.remove("hidden");
  requestAnimationFrame(function () {
    backdrop.classList.add("show");
    drawer.classList.add("open");
  });
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("cart-close-button").focus();
}

function closeCart() {
  backdrop.classList.remove("show");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  setTimeout(function () { backdrop.classList.add("hidden"); }, 250);
}

$("cart-open-button").addEventListener("click", openCart);
$("cart-bar").addEventListener("click", openCart);
$("cart-close-button").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

$("clear-cart-button").addEventListener("click", function () {
  cart = [];
  persistCart();
});

$("checkout-button").addEventListener("click", function () {
  const count = cartCount();
  const total = cartSubtotal() * (1 + SERVICE_RATE);
  $("success-text").textContent = count + (count === 1 ? " item" : " items") + " · " + money(total) + " incl. service";
  cart = [];
  persistCart();
  closeCart();
  $("success-modal").classList.remove("hidden");
  $("success-close").focus();
});

$("success-close").addEventListener("click", function () {
  $("success-modal").classList.add("hidden");
});

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;
  if (!$("success-modal").classList.contains("hidden")) $("success-modal").classList.add("hidden");
  else if (drawer.classList.contains("open")) closeCart();
  else closeDetail(false);
});

// ---------- Start ----------
document.body.classList.add("on-welcome");
render();
updateCartUI();
