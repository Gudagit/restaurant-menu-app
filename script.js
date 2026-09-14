// This file builds the menu page using the data from menu-data.js

// --- Welcome screen -> Menu screen ---
const viewMenuButton = document.getElementById("view-menu-button");
const welcomeScreen = document.getElementById("welcome-screen");
const menuScreen = document.getElementById("menu-screen");

viewMenuButton.addEventListener("click", function () {
  welcomeScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
});

// --- Detail screen elements ---
const detailScreen = document.getElementById("detail-screen");
const detailImage = document.getElementById("detail-image");
const detailName = document.getElementById("detail-name");
const detailPrice = document.getElementById("detail-price");
const detailCategoryTag = document.getElementById("detail-category-tag");
const detailDescription = document.getElementById("detail-description");
const detailExtras = document.getElementById("detail-extras");
const detailAddButton = document.getElementById("detail-add-button");
const backButton = document.getElementById("back-button");

const quantityValue = document.getElementById("quantity-value");
const quantityMinus = document.getElementById("quantity-minus");
const quantityPlus = document.getElementById("quantity-plus");
let quantity = 1;

// A generic set of add-ons, since individual dishes don't have their own extras defined yet
const genericExtras = [
  { name: "Extra Sauce", price: 1.5 },
  { name: "Extra Cheese", price: 2.0 },
  { name: "Side of Bread", price: 2.5 }
];

let currentDish = null;

function parsePrice(priceText) {
  const match = priceText.replace(",", "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function updateTotal() {
  const basePrice = parsePrice(currentDish.price);
  const extrasTotal = Array.from(detailExtras.querySelectorAll("input:checked"))
    .reduce(function (sum, checkbox) { return sum + parseFloat(checkbox.dataset.price); }, 0);

  const total = (basePrice + extrasTotal) * quantity;
  detailAddButton.textContent = "Add to Cart · $" + total.toFixed(2);
}

function setQuantity(newValue) {
  quantity = Math.max(1, newValue);
  quantityValue.textContent = quantity;
  updateTotal();
}

quantityMinus.addEventListener("click", function () {
  setQuantity(quantity - 1);
});

quantityPlus.addEventListener("click", function () {
  setQuantity(quantity + 1);
});

function showDetail(dish, categoryName) {
  currentDish = dish;

  detailImage.src = dish.image;
  detailImage.alt = dish.name;
  detailName.textContent = dish.name;
  detailPrice.textContent = dish.price;
  detailCategoryTag.textContent = categoryName;
  detailDescription.textContent = dish.description;

  detailExtras.innerHTML = "";
  genericExtras.forEach(function (extra, index) {
    const label = document.createElement("label");
    label.className = "extra-row";
    label.innerHTML = `
      <span class="extra-name">
        <input type="checkbox" data-price="${extra.price}" id="extra-${index}">
        ${extra.name}
      </span>
      <span class="extra-price">+$${extra.price.toFixed(2)}</span>
    `;
    label.querySelector("input").addEventListener("change", updateTotal);
    detailExtras.appendChild(label);
  });

  setQuantity(1);

  menuScreen.classList.add("hidden");
  detailScreen.classList.remove("hidden");
}

backButton.addEventListener("click", function () {
  detailScreen.classList.add("hidden");
  menuScreen.classList.remove("hidden");
});

// --- Build one stacked dish card (photo on top, name, description, price + Add button) ---
function buildDishCard(dish, categoryName) {
  const card = document.createElement("div");
  card.className = "dish-card";

  card.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <div class="dish-info">
      <h3>${dish.name}</h3>
      <p class="description">${dish.description}</p>
      <div class="dish-info-footer">
        <p class="price">${dish.price}</p>
        <button class="add-button">Add to Order</button>
      </div>
    </div>
  `;

  // Tapping the card opens the detail screen for this dish
  card.addEventListener("click", function () {
    showDetail(dish, categoryName);
  });

  // The "Add to Order" button shouldn't also trigger the card's click
  const addButton = card.querySelector(".add-button");
  addButton.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  return card;
}

// --- Accordion: Breakfast / Lunch / Drinks, each slides open in place ---
const accordionContainer = document.getElementById("accordion");
const groups = ["Breakfast", "Lunch", "Drinks"];

function resizeOpenPanel() {
  const openItem = accordionContainer.querySelector(".accordion-item.open");
  if (openItem) {
    const panel = openItem.querySelector(".accordion-panel");
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}

groups.forEach(function (groupName) {
  const item = document.createElement("div");
  item.className = "accordion-item";

  const header = document.createElement("button");
  header.className = "accordion-header";
  header.innerHTML = `<span>${groupName}</span><span class="accordion-arrow">&#9662;</span>`;
  item.appendChild(header);

  const panel = document.createElement("div");
  panel.className = "accordion-panel";

  const panelInner = document.createElement("div");
  panelInner.className = "accordion-panel-inner";
  panel.appendChild(panelInner);

  // Sub-category button group for this group (Pizza, Pasta, etc.)
  const categoryNames = [];
  menuData.forEach(function (category) {
    if (category.group === groupName && categoryNames.indexOf(category.category) === -1) {
      categoryNames.push(category.category);
    }
  });

  const subcategoryTabs = document.createElement("div");
  subcategoryTabs.className = "subcategory-tabs";

  const dishesContainer = document.createElement("div");
  dishesContainer.className = "dish-list-inner";

  function renderDishes(categoryName) {
    dishesContainer.innerHTML = "";
    menuData.forEach(function (category) {
      if (category.group !== groupName) return;
      if (categoryName !== "All" && category.category !== categoryName) return;

      category.items.forEach(function (dish) {
        dishesContainer.appendChild(buildDishCard(dish, category.category));
      });
    });

    subcategoryTabs.querySelectorAll(".subtab-button").forEach(function (chip) {
      chip.classList.toggle("active", chip.dataset.category === categoryName);
    });

    resizeOpenPanel();
  }

  const allChip = document.createElement("button");
  allChip.textContent = "All";
  allChip.className = "subtab-button active";
  allChip.dataset.category = "All";
  allChip.addEventListener("click", function () {
    renderDishes("All");
  });
  subcategoryTabs.appendChild(allChip);

  categoryNames.forEach(function (categoryName) {
    const chip = document.createElement("button");
    chip.textContent = categoryName;
    chip.className = "subtab-button";
    chip.dataset.category = categoryName;
    chip.addEventListener("click", function () {
      renderDishes(categoryName);
    });
    subcategoryTabs.appendChild(chip);
  });

  renderDishes("All");

  panelInner.appendChild(subcategoryTabs);
  panelInner.appendChild(dishesContainer);
  item.appendChild(panel);

  header.addEventListener("click", function () {
    const isOpen = item.classList.contains("open");

    accordionContainer.querySelectorAll(".accordion-item").forEach(function (el) {
      el.classList.remove("open");
      el.querySelector(".accordion-panel").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  accordionContainer.appendChild(item);
});
