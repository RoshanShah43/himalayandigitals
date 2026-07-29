// ============ TOP UP RS-BAZAR ============

// ---- Product catalog: each product now carries mainCategory + subCategory ----
var GAME_DATA = {
  mobilelegends: {
    title: 'Mobile Legends',
    image: 'https://sm.ign.com/ign_za/cover/m/mobile-leg/mobile-legends-bang-bang_c6z8.jpg',
    mainCategory: 'games', subCategory: 'MOBA',
    delivery: '1-5 min',
    description: 'Popular MOBA game with exciting gameplay.',
    needsServer: true,
    packages: [
      { id: 'ml1', label: '55 Diamonds', value: 182 },
      { id: 'ml2', label: '275 Diamonds', value: 862 },
      { id: 'ml3', label: '565 Diamonds', value: 1712 },
      { id: 'ml4', label: '1160 Diamonds', value: 3412 },
      { id: 'ml5', label: '1770 Diamonds', value: 5112 }
    ]
  },
  freefire: {
    title: 'Free Fire',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JMInACAGRr5zMiWcijo_VX2B_9-5vxucxg&s',
    mainCategory: 'games', subCategory: 'Battle Royale',
    delivery: '1-5 min',
    description: 'Fast-paced battle royale game.',
    packages: [
      { id: 'ff1', label: '25 Diamonds', value: 35 },
      { id: 'ff2', label: '50 Diamonds', value: 65 },
      { id: 'ff3', label: '115 Diamonds', value: 99 },
      { id: 'ff4', label: '240 Diamonds', value: 194 },
      { id: 'ff5', label: '355 Diamonds', value: 284 },
      { id: 'ff6', label: '440 Diamonds', value: 379 },
      { id: 'ff7', label: '610 Diamonds', value: 474 },
      { id: 'ff8', label: '725 Diamonds', value: 560 },
      { id: 'ff9', label: '840 Diamonds', value: 655 },
      { id: 'ff10', label: '965 Diamonds', value: 755 },
      { id: 'ff11', label: '1090 Diamonds', value: 835 },
      { id: 'ff12', label: '1240 Diamonds', value: 935 },
      { id: 'ff13', label: '2530 Diamonds', value: 1864 },
      { id: 'ff14', label: '5060 Diamonds', value: 3660 }
    ]
  },
  roblox: {
    title: 'Roblox',
    image: 'https://yt3.googleusercontent.com/xTxr7gmbkxiPKjrmN5ut0Kn8UcHpkkgyTv-_EeDPphcQusrWyKfSZw13EKCYXQyYdeoC3ON1zQ=s900-c-k-c0x00ffffff-no-rj',
    mainCategory: 'games', subCategory: 'Sandbox',
    delivery: '1-5 min',
    description: 'Creative platform for building and playing games.',
    packages: [
      { id: 'r1', label: '$10 Robux', value: 1725 },
      { id: 'r2', label: '$25 Robux', value: 4270 }
    ]
  },
  pubg: {
    title: 'PUBG Mobile',
    image: 'https://www.vice.com/wp-content/uploads/sites/2/2018/12/1545803974526-40176727491_31da2b03d8_b.jpeg',
    mainCategory: 'games', subCategory: 'Battle Royale',
    delivery: '1-5 min',
    description: 'Battle royale game with intense action.',
    packages: [
      { id: 'pg1', label: '60 UC', value: 178 },
      { id: 'pg2', label: '120 UC', value: 399 },
      { id: 'pg3', label: '325 UC', value: 865 },
      { id: 'pg4', label: '385 UC', value: 1020 },
      { id: 'pg5', label: '660 UC', value: 1628 },
      { id: 'pg6', label: '720 UC', value: 1774 },
      { id: 'pg7', label: '985 UC', value: 2444 },
      { id: 'pg8', label: '1800 UC', value: 3915 },
      { id: 'pg9', label: '3850 UC', value: 7815 },
      { id: 'pg10', label: '8100 UC', value: 15142 }
    ]
  },
  genshin: {
    title: 'Genshin Impact',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202509/0403/96df20a522e1004e3da998220ab2ded47797478ccda64bd8.png',
    mainCategory: 'games', subCategory: 'Open World RPG',
    delivery: '1-5 min',
    description: 'Open-world RPG with stunning visuals.',
    packages: [
      { id: 'gi1', label: '60 Genesis Crystals', value: 180 },
      { id: 'gi2', label: '330 Genesis Crystals', value: 860 },
      { id: 'gi3', label: '1,090 Genesis Crystals', value: 2560 },
      { id: 'gi4', label: 'Blessing of the Welkin Moon', value: 860 }
    ]
  },
  bloodstrike: {
    title: 'Blood Strike',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWUdqCnnkYVy4kmDTkRycGXzMBnwyqua01S_-bnwWoxGDGCXOisqm7VuHphZxzh4b1Er5&s=10',
    mainCategory: 'games', subCategory: 'Shooter',
    delivery: '1-5 min',
    description: 'Tactical shooter with team-based gameplay.',
    packages: [
      { id: 'bs1', label: 'Level-Up Pass', value: 360 },
      { id: 'bs2', label: 'Strike Pass Elite', value: 520 },
      { id: 'bs3', label: 'Strike Pass Elite Premium', value: 1540 },
      { id: 'bs4', label: '50 Golds', value: 96 }
    ]
  },
  weekly_membership: {
    title: 'ChatGPT',
    image: 'https://playmusic.com.ua/wp-content/uploads/2025/03/chatgpt-pro.jpg',
    mainCategory: 'subscriptions', subCategory: 'AI Tools',
    delivery: 'Instant',
    description: 'Weekly membership pass.',
    packages: [ { id: 'wm1', label: 'Weekly Membership', value: 190 } ]
  },
  monthly_membership: {
    title: 'Gemini',
    image: 'https://images.seeklogo.com/logo-png/63/2/gemini-new-logo-png_seeklogo-638161.png',
    mainCategory: 'subscriptions', subCategory: 'AI Tools',
    delivery: 'less than 1 hr',
    description: 'Monthly membership pass.',
    packages: [ { id: 'mm1', label: 'Monthly Membership', value: 935 } ]
  },
  weekly_lite: {
    title: 'YouTube',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujmAKBqKS0lnBZvbNGKettJMBvIKhMqQodEf-caASL7cYOXtovlp__2o&s=10',
    mainCategory: 'subscriptions', subCategory: 'Streaming',
    delivery: 'less than 1 hr',
    description: 'Weekly lite membership pass.',
    packages: [ { id: 'wl1', label: 'Weekly Lite', value: 60 } ]
  },
  levelup_pass: {
    title: 'Spotify',
    image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/huy_spotify_premium_1_240564049e.jpg',
    mainCategory: 'subscriptions', subCategory: 'Streaming',
    delivery: 'Instant',
    description: 'Enjoy unlimited music without interruptions with Spotify Premium. Listen ad-free, download songs for offline listening, skip tracks as much as you want, and stream in high-quality audio. Access millions of songs, podcasts, and playlists on your phone, tablet, or computer.',
    packages: [ { id: 'lp1', label: '1 month', value:  749},
      { id: 'lp2', label: '3 months', value:  1999}, 
      {id : 'lp3', label: '6 months', value:  3499},
      {id : 'lp4', label: '1 year', value:  5999}
     ]
  },
  levelup_6: {
    title: 'Canva Pro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmdfOJXGE30dtFCLHsALTS9wT0nz7a8wArkpUemm_eIY89792EBpNaGc7g&s=10',
    mainCategory: 'levelup', subCategory: 'Subscriptions',
    delivery: 'less than 1hr',
    description: 'Unlock the full power of Canva with Canva Pro Admin Access. Create stunning designs with premium templates, AI-powered tools, and advanced collaboration features. Perfect for students, professionals, businesses, content creators, and marketers.',
    packages: [ { id: 'lu6', label: '1 year', value: 99 }
      ,{id: 'lu7', label: 'Admin Pannel', value: 1699 },
      {id: 'lu8', label: 'Team Owner', value: 3799 }
     ]
  },
  levelup_10: {
    title: 'Level Up · Level 10',
    image: 'https://topup.tusargautam.com.np/storage/products/01K8QCPCKP5HPXJPHE7TP1ZRWD.png',
    mainCategory: 'levelup', subCategory: 'Free Fire Leveling',
    delivery: '5-10 min',
    description: 'Level Up Package to reach Level 10.',
    packages: [ { id: 'lu10', label: 'Level 10 Package', value: 100 } ]
  },
  levelup_15: {
    title: 'Level Up · Level 15',
    image: 'https://topup.tusargautam.com.np/storage/products/01K8QCPCKP5HPXJPHE7TP1ZRWD.png',
    mainCategory: 'levelup', subCategory: 'Free Fire Leveling',
    delivery: '5-10 min',
    description: 'Level Up Package to reach Level 15.',
    packages: [ { id: 'lu15', label: 'Level 15 Package', value: 120 } ]
  },
  levelup_20: {
    title: 'Level Up · Level 20',
    image: 'https://topup.tusargautam.com.np/storage/products/01K8QCPCKP5HPXJPHE7TP1ZRWD.png',
    mainCategory: 'levelup', subCategory: 'Free Fire Leveling',
    delivery: '5-10 min',
    description: 'Level Up Package to reach Level 20.',
    packages: [ { id: 'lu20', label: 'Level 20 Package', value: 130 } ]
  },
  levelup_25: {
    title: 'Level Up · Level 25',
    image: 'https://topup.tusargautam.com.np/storage/products/01K8QCPCKP5HPXJPHE7TP1ZRWD.png',
    mainCategory: 'levelup', subCategory: 'Free Fire Leveling',
    delivery: '5-10 min',
    description: 'Level Up Package to reach Level 25.',
    packages: [ { id: 'lu25', label: 'Level 25 Package', value: 150 } ]
  }
};

var CATEGORY_LABELS = { games: 'Games', subscriptions: 'Subscriptions', levelup: 'Level Up' };

var activeCategory = 'all';
var activeSubcat = 'all';

var cart = [];
try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { cart = []; }

// ---- Category rail ----
function initCategoryRail() {
  var rail = document.getElementById('categoryRail');
  var buttons = rail.querySelectorAll('.cat-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeCategory = btn.getAttribute('data-category');
      activeSubcat = 'all';
      positionSlider(btn);
      renderSubcatRow();
      renderProducts();
    });
  });
  // position slider under initial active button once fonts/layout settle
  requestAnimationFrame(function () { positionSlider(rail.querySelector('.cat-btn.active')); });
  window.addEventListener('resize', function () {
    positionSlider(rail.querySelector('.cat-btn.active'));
  });
}

function positionSlider(btn) {
  var slider = document.getElementById('catSlider');
  if (!btn || !slider) return;
  slider.style.left = btn.offsetLeft + 'px';
  slider.style.width = btn.offsetWidth + 'px';
}

// ---- Sub-category chip row ----
function renderSubcatRow() {
  var row = document.getElementById('subcatRow');
  row.innerHTML = '';

  var relevant = Object.keys(GAME_DATA).filter(function (id) {
    return activeCategory === 'all' || GAME_DATA[id].mainCategory === activeCategory;
  });

  var subcats = [];
  relevant.forEach(function (id) {
    var s = GAME_DATA[id].subCategory;
    if (subcats.indexOf(s) === -1) subcats.push(s);
  });

  if (subcats.length <= 1) return; // nothing meaningful to filter further

  var allChip = document.createElement('button');
  allChip.className = 'subcat-chip' + (activeSubcat === 'all' ? ' active' : '');
  allChip.textContent = 'All types';
  allChip.onclick = function () { activeSubcat = 'all'; renderSubcatRow(); renderProducts(); };
  row.appendChild(allChip);

  subcats.forEach(function (s) {
    var chip = document.createElement('button');
    chip.className = 'subcat-chip' + (activeSubcat === s ? ' active' : '');
    chip.textContent = s;
    chip.onclick = function () { activeSubcat = s; renderSubcatRow(); renderProducts(); };
    row.appendChild(chip);
  });
}

// ---- Product grid ----
function renderProducts() {
  var grid = document.getElementById('productsGrid');
  var emptyState = document.getElementById('emptyState');
  grid.innerHTML = '';

  var ids = Object.keys(GAME_DATA).filter(function (id) {
    var g = GAME_DATA[id];
    if (activeCategory !== 'all' && g.mainCategory !== activeCategory) return false;
    if (activeSubcat !== 'all' && g.subCategory !== activeSubcat) return false;
    return true;
  });

  if (ids.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  ids.forEach(function (id) {
    var g = GAME_DATA[id];
    var minPrice = Math.min.apply(null, g.packages.map(function (p) { return p.value; }));
    var card = document.createElement('div');
    card.className = 'game-card';
    card.onclick = function () { openProductModal(id); };
    card.innerHTML =
      '<span class="card-ribbon">' + g.subCategory + '</span>' +
      '<span class="card-delivery">' + g.delivery + '</span>' +
      '<img src="' + g.image + '" alt="' + g.title + '" loading="lazy">' +
      '<h3>' + g.title + '</h3>' +
      '<div class="card-price-row"><span class="card-from">From</span><span class="card-price">Rs' + minPrice + '</span></div>';
    grid.appendChild(card);
  });
}

// ---- Product modal ----
function openProductModal(gameId) {
  var game = GAME_DATA[gameId];
  if (!game) { alert('Product not found: ' + gameId); return; }

  document.getElementById('gameImage').src = game.image;
  document.getElementById('gameTitle').textContent = game.title;
  document.getElementById('gameCategory').textContent = CATEGORY_LABELS[game.mainCategory] + ' · ' + game.subCategory;
  document.getElementById('gameDescription').textContent = game.description;
  document.getElementById('gameDelivery').textContent = '⚡ Delivery in ' + game.delivery;
  document.getElementById('accountUID').value = '';
  document.getElementById('quantity').value = 1;
  document.getElementById('serverGroup').style.display = game.needsServer ? 'block' : 'none';

  var pkgGrid = document.getElementById('packagesGrid');
  pkgGrid.innerHTML = '';

  game.packages.forEach(function (pkg, i) {
    var div = document.createElement('div');
    div.className = 'package-option' + (i === 0 ? ' selected' : '');
    div.setAttribute('data-id', pkg.id);
    div.setAttribute('data-price', pkg.value);
    div.setAttribute('data-label', pkg.label);
    div.innerHTML = '<div class="package-name">' + pkg.label + '</div><div class="package-price">Rs' + pkg.value + '</div>';
    div.onclick = function () {
      pkgGrid.querySelectorAll('.package-option').forEach(function (el) { el.classList.remove('selected'); });
      div.classList.add('selected');
    };
    pkgGrid.appendChild(div);
  });

  var modal = document.getElementById('gameShoppingModal');
  modal.setAttribute('data-game-id', gameId);
  modal.style.display = 'flex';
  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  var modal = document.getElementById('gameShoppingModal');
  modal.style.display = 'none';
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

// ---- Cart ----
function toggleCart() {
  var drawer = document.getElementById('cartDrawer');
  if (drawer.classList.contains('open')) {
    drawer.classList.remove('open');
  } else {
    drawer.classList.add('open');
    renderCartItems();
  }
}

function handleAddToCart() {
  var modal = document.getElementById('gameShoppingModal');
  var gameId = modal.getAttribute('data-game-id');
  var game = GAME_DATA[gameId];
  var uid = document.getElementById('accountUID').value.trim();
  var qty = parseInt(document.getElementById('quantity').value) || 1;
  var selected = document.querySelector('#packagesGrid .package-option.selected');

  if (!uid) { alert('Please enter your UID'); return; }
  if (!selected) { alert('Please select a package'); return; }

  cart.push({
    id: Date.now(),
    gameId: gameId,
    gameTitle: game.title,
    gameImage: game.image,
    packageLabel: selected.getAttribute('data-label'),
    price: parseInt(selected.getAttribute('data-price')),
    quantity: qty,
    accountUID: uid
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  closeProductModal();
  showNotification(game.title + ' added to cart!');
}

function updateCartBadge() {
  var badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? 'flex' : 'none';
  }
}

function renderCartItems() {
  var list = document.getElementById('cartItemsList');
  var empty = document.getElementById('emptyCartMsg');
  var total = document.getElementById('cartTotal');

  if (cart.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (total) total.textContent = 'Rs0';
    return;
  }

  if (empty) empty.style.display = 'none';

  var html = '';
  var sum = 0;
  cart.forEach(function (item) {
    sum += item.price * item.quantity;
    html += '<div class="cart-item"><img src="' + item.gameImage + '" class="cart-item-image">' +
      '<div class="cart-item-details"><div class="cart-item-title">' + item.gameTitle + '</div>' +
      '<div class="cart-item-package">' + item.packageLabel + '</div>' +
      '<div class="cart-item-price">Rs' + (item.price * item.quantity) + '</div></div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">×</button></div>';
  });
  list.innerHTML = html;
  if (total) total.textContent = 'Rs' + sum;
}

function removeFromCart(itemId) {
  cart = cart.filter(function (item) { return item.id != itemId; });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function proceedToCheckout() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  document.getElementById('cartDrawer').classList.remove('open');

  var summary = document.getElementById('checkoutCartSummary');
  var total = document.getElementById('checkoutTotal');
  var html = '';
  var sum = 0;

  cart.forEach(function (item) {
    sum += item.price * item.quantity;
    html += '<div class="checkout-item"><span>' + item.gameTitle + ' - ' + item.packageLabel + '</span><span>Rs' + (item.price * item.quantity) + '</span></div>';
  });

  if (summary) summary.innerHTML = html;
  if (total) total.textContent = 'Rs' + sum;

  var code = '';
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 5; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));

  var codeEl = document.getElementById('esewaCode');
  if (codeEl) {
    codeEl.textContent = code;
    codeEl.setAttribute('data-code', code);
  }

  document.getElementById('checkoutModal').classList.add('open');
}

function placeOrder(event) {
  event.preventDefault();

  var user = localStorage.getItem('loggedInUser');
  if (!user) {
    alert('Please login to place an order');
    window.location.href = 'login.html';
    return;
  }

  if (cart.length === 0) { alert('Your cart is empty!'); return; }

  var code = document.getElementById('esewaCode').getAttribute('data-code') || 'N/A';

  var orders = [];
  try { orders = JSON.parse(localStorage.getItem('gameCart')) || []; } catch (e) { orders = []; }

  cart.forEach(function (item, i) {
    orders.push({
      id: 'ORD-' + Date.now() + '-' + i,
      gameTitle: item.gameTitle,
      packLabel: item.packageLabel,
      uid: item.accountUID,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
      username: user,
      esewaCode: code,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    });
  });

  localStorage.setItem('gameCart', JSON.stringify(orders));

  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();

  document.getElementById('checkoutModal').classList.remove('open');

  alert('Order placed successfully!\n\neSewa Code: ' + code + '\n\nPlease use this code in eSewa remarks when making payment.');
  showNotification('Order placed successfully!');
}

function showNotification(msg) {
  var n = document.createElement('div');
  n.className = 'notification show';
  n.textContent = msg;
  n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#221a16;color:#f5ede4;border:1px solid #382a20;padding:12px 20px;border-radius:10px;z-index:9999;';
  document.body.appendChild(n);
  setTimeout(function () { n.remove(); }, 3000);
}

// ---- Auth display ----
function checkLogin() {
  var user = localStorage.getItem('loggedInUser');
  var isAdmin = localStorage.getItem('isAdmin') === '1';
  var loginBtn = document.getElementById('loginBtn');
  var profileSection = document.getElementById('profileSection');
  var profileUsername = document.getElementById('profileUsername');
  var adminLink = document.getElementById('adminPanelLink');

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileSection) profileSection.style.display = 'block';
    if (profileUsername) profileUsername.textContent = user;
    if (adminLink) adminLink.style.display = isAdmin ? 'block' : 'none';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (profileSection) profileSection.style.display = 'none';
  }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
  initCategoryRail();
  renderSubcatRow();
  renderProducts();
  updateCartBadge();
  checkLogin();

  var checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', placeOrder);

  var copyBtn = document.getElementById('copyEsewaCodeBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var code = document.getElementById('esewaCode').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      showNotification('Code copied!');
    });
  }

  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('isAdmin');
      location.reload();
    });
  }
});