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
    image: 'https://media.licdn.com/dms/image/v2/D5622AQFGJIltSHBgyw/feedshare-shrink_800/B56Zz008fgI0Ac-/0/1773634046242?e=2147483647&v=beta&t=C824GNg6ybG5WHs7brGxzFjYwPk945ShkNmjPrq6ejo',
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
    mainCategory: 'subscriptions', subCategory: 'Designing Tools',
    delivery: 'less than 1hr',
    description: 'Unlock the full power of Canva with Canva Pro Admin Access. Create stunning designs with premium templates, AI-powered tools, and advanced collaboration features. Perfect for students, professionals, businesses, content creators, and marketers.',
    packages: [ { id: 'lu6', label: '1 year', value: 99 }
      ,{id: 'lu7', label: 'Admin Pannel', value: 1699 },
      {id: 'lu8', label: 'Team Owner', value: 3799 }
     ]
  },
  levelup_10: {
    title: 'Adobe Creative Cloud',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaxVxLHY5lp74hvquwUi8hswV5J__bMdAKeV65wgBvA&s=10',
    mainCategory: 'subscriptions', subCategory: 'Subscriptions',
    delivery: 'less than 1hr',
    description: 'Adobe creative cloud for lifetime.',
    packages: [ { id: 'lu10', label: 'Lifetime', value: 4599 } ]
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
var BUILTIN_GAME_DATA = JSON.parse(JSON.stringify(GAME_DATA));

var activeCategory = 'all';
var activeSubcat = 'all';
var catalogReady = false;
var appliedCoupon = null;
var DEFAULT_SITE_SETTINGS = {
  websiteActive: true,
  openingTime: '11:00',
  closingTime: '22:00',
  contactEmail: 'rsbazar47@gmail.com',
  contactPhone: '9813920517'
};
var activeSiteSettings = DEFAULT_SITE_SETTINGS;

var cart = [];
try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { cart = []; }

function formatStoreTime(value) {
  var match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(value || ''));
  if (!match) return null;
  var hour = Number(match[1]);
  var minute = match[2];
  return ((hour % 12) || 12) + ':' + minute + (hour < 12 ? ' AM' : ' PM');
}

function isStoreOpen(settings) {
  if (!settings.websiteActive) return false;
  var opening = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(settings.openingTime || ''));
  var closing = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(settings.closingTime || ''));
  if (!opening || !closing) return false;

  var openingMinutes = Number(opening[1]) * 60 + Number(opening[2]);
  var closingMinutes = Number(closing[1]) * 60 + Number(closing[2]);
  var now = new Date();
  var currentMinutes = now.getHours() * 60 + now.getMinutes();
  if (openingMinutes === closingMinutes) return false;
  if (openingMinutes < closingMinutes) {
    return currentMinutes >= openingMinutes && currentMinutes < closingMinutes;
  }
  return currentMinutes >= openingMinutes || currentMinutes < closingMinutes;
}

function renderSiteSettings(settings) {
  activeSiteSettings = settings;
  var status = document.getElementById('storeStatus');
  var hours = document.getElementById('storeHours');
  var helpline = document.getElementById('storeHelpline');
  var emailLink = document.getElementById('contactEmailLink');
  var phoneLink = document.getElementById('contactPhoneLink');
  var opening = formatStoreTime(settings.openingTime);
  var closing = formatStoreTime(settings.closingTime);
  var open = isStoreOpen(settings);

  if (status) {
    status.textContent = (open ? '🟢 ' : '🔴 ') + (open ? 'OPEN NOW' : 'CLOSED NOW');
    status.classList.toggle('closed', !open);
  }
  if (hours) hours.textContent = opening && closing ? '📱 ' + opening + ' - ' + closing : '📱 Hours not set';
  if (helpline) helpline.textContent = settings.contactPhone ? '📞 Helpline: ' + settings.contactPhone : '';
  if (emailLink) {
    emailLink.textContent = settings.contactEmail || 'Email not set';
    emailLink.href = settings.contactEmail ? 'mailto:' + settings.contactEmail : '#contact';
  }
  if (phoneLink) {
    phoneLink.textContent = settings.contactPhone ? 'Helpline: ' + settings.contactPhone : 'Phone not set';
    phoneLink.href = settings.contactPhone ? 'tel:' + settings.contactPhone.replace(/[^\d+]/g, '') : '#contact';
  }
}

async function loadSiteSettings() {
  try {
    var client = window.getSupabaseClient();
    var result = await client.from('site_settings').select('settings').eq('id', 'storefront').maybeSingle();
    if (result.error) throw result.error;
    var settings = result.data && result.data.settings ? result.data.settings : DEFAULT_SITE_SETTINGS;
    if (result.data && result.data.settings) {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
    }
    renderSiteSettings(settings);
  } catch (error) {
    console.error('Unable to load storefront settings from Supabase.', error);
    var cachedSettings;
    try { cachedSettings = JSON.parse(localStorage.getItem('siteSettings') || 'null'); } catch (cacheError) {
      console.error('Unable to read cached storefront settings.', cacheError);
    }
    renderSiteSettings(cachedSettings || DEFAULT_SITE_SETTINGS);
    showNotification('Store hours and contact settings could not be refreshed.');
  }
}

function categorySlug(value) {
  return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function renderCategoryRail() {
  var rail = document.getElementById('categoryRail');
  rail.textContent = '';
  var categories = [];
  Object.keys(GAME_DATA).forEach(function (id) {
    var game = GAME_DATA[id];
    if (categories.indexOf(game.mainCategory) === -1) categories.push(game.mainCategory);
    CATEGORY_LABELS[game.mainCategory] = game.mainCategoryLabel || game.mainCategory;
  });
  function addCategoryButton(category, label, active) {
    var button = document.createElement('button');
    button.className = 'cat-btn' + (active ? ' active' : '');
    button.setAttribute('data-category', category);
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', active ? 'true' : 'false');
    var icon = document.createElement('span');
    icon.className = 'cat-icon';
    icon.textContent = '◆';
    var text = document.createElement('span');
    text.textContent = label;
    button.appendChild(icon);
    button.appendChild(text);
    rail.appendChild(button);
  }
  addCategoryButton('all', 'All', true);
  categories.forEach(function (category) { addCategoryButton(category, CATEGORY_LABELS[category], false); });
  var slider = document.createElement('div');
  slider.className = 'cat-slider';
  slider.id = 'catSlider';
  rail.appendChild(slider);
}

async function loadStoreCatalog() {
  try {
    var client = window.getSupabaseClient();
    var results = await Promise.all([
      client.from('categories').select('id,name,slug,parent_id,status,sort_order').eq('status', 'active').order('sort_order'),
      client.from('products').select('id,name,description,price,discount_price,image,category_id,subcategory_id,status,delivery,account_type,needs_server,pricing_mode,min_quantity,max_quantity,packages,stock,featured').eq('status', 'active')
    ]);
    if (results[0].error) throw results[0].error;
    if (results[1].error) throw results[1].error;

    var categories = results[0].data || [];
    var byId = {};
    categories.forEach(function (category) { byId[category.id] = category; });
    GAME_DATA = {};
    CATEGORY_LABELS = {};
    (results[1].data || []).forEach(function (product) {
      var main = byId[product.category_id];
      if (!main || main.parent_id) return;
      var sub = byId[product.subcategory_id];
      var packages = Array.isArray(product.packages) ? product.packages : [];
      if (!packages.length) packages = [{ id: 'default', label: '1 item', value: Number(product.discount_price || product.price) }];
      GAME_DATA[product.id] = {
        title: product.name,
        image: product.image || 'hdl.png',
        mainCategory: main.slug || categorySlug(main.name),
        mainCategoryLabel: main.name,
        subCategory: sub ? sub.name : 'General',
        delivery: product.delivery || '1-5 min',
        description: product.description || '',
        accountType: product.account_type || (main.slug === 'games' ? 'uid' : 'email'),
        needsServer: Boolean(product.needs_server),
        pricingMode: product.pricing_mode || 'fixed',
        minQuantity: product.pricing_mode === 'per_1000' ? Math.max(Number(product.min_quantity) || 1000, 1000) : (Number(product.min_quantity) || 1),
        maxQuantity: Number(product.max_quantity) || Number.MAX_SAFE_INTEGER,
        packages: packages.map(function (pkg, index) {
          return {
            id: String(pkg.id || ('package-' + index)),
            label: String(pkg.label || 'Package ' + (index + 1)),
            value: Number(pkg.value)
          };
        }),
        productId: product.id,
        stock: Number(product.stock || 0)
      };
    });
    catalogReady = true;
    renderCategoryRail();
    initCategoryRail();
    activeCategory = 'all';
    activeSubcat = 'all';
    renderSubcatRow();
    renderProducts();
  } catch (error) {
    console.error('Unable to load the Supabase catalog.', error);
    showNotification(error.message || 'The online catalog could not be loaded.');
  }
}

async function updateAccountMenu() {
  var loginLink = document.getElementById('loginLink');
  var accountMenu = document.getElementById('accountMenu');
  var name = document.getElementById('accountName');
  var adminLink = document.getElementById('adminLink');
  var signOut = document.getElementById('signOutLink');
  try {
    var client = window.getSupabaseClient();
    var result = await client.auth.getUser();
    var user = result.data.user;
    if (result.error) throw result.error;
    if (user) {
      var profile = await client.from('profiles').select('username,is_admin').eq('id', user.id).single();
      if (profile.error) throw profile.error;
      loginLink.style.display = 'none';
      accountMenu.style.display = 'block';
      name.textContent = profile.data.username || user.email;
      adminLink.style.display = profile.data.is_admin ? 'block' : 'none';
    } else {
      loginLink.style.display = 'inline';
      accountMenu.style.display = 'none';
    }
  } catch (error) {
    console.error('Unable to check the signed-in user.', error);
    loginLink.style.display = 'inline';
    accountMenu.style.display = 'none';
    showNotification(error.message || 'Account status could not be checked.');
  }
  if (signOut) {
    signOut.addEventListener('click', async function (event) {
      event.preventDefault();
      try {
        var client = window.getSupabaseClient();
        var result = await client.auth.signOut();
        if (result.error) throw result.error;
        window.location.reload();
      } catch (error) {
        showNotification(error.message || 'Sign out failed.');
      }
    });
  }
}

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
    var ribbon = document.createElement('span');
    ribbon.className = 'card-ribbon';
    ribbon.textContent = g.subCategory;
    var delivery = document.createElement('span');
    delivery.className = 'card-delivery';
    delivery.textContent = g.delivery;
    var image = document.createElement('img');
    image.src = g.image;
    image.alt = g.title;
    image.loading = 'lazy';
    var title = document.createElement('h3');
    title.textContent = g.title;
    var priceRow = document.createElement('div');
    priceRow.className = 'card-price-row';
    var priceLabel = document.createElement('span');
    priceLabel.className = 'card-from';
    priceLabel.textContent = 'From';
    var price = document.createElement('span');
    price.className = 'card-price';
    price.textContent = 'Rs' + formatMoney(minPrice) + (g.pricingMode === 'per_1000' ? ' / 1,000' : '');
    priceRow.appendChild(priceLabel);
    priceRow.appendChild(price);
    card.appendChild(ribbon);
    card.appendChild(delivery);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(priceRow);
    grid.appendChild(card);
  });
}

function escapeHTML(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}

// ---- Product modal ----
function openProductModal(gameId) {
  var game = GAME_DATA[gameId];
  if (!game) { alert('Product not found: ' + gameId); return; }

  var isGameProduct = game.accountType === 'uid';
  var isTargetLinkProduct = game.accountType === 'url';
  var isWhatsAppProduct = game.accountType === 'whatsapp';
  var uidGroup = document.getElementById('uidGroup');
  var gmailGroup = document.getElementById('gmailGroup');
  var whatsAppGroup = document.getElementById('whatsAppGroup');
  var targetURLGroup = document.getElementById('targetURLGroup');

  document.getElementById('gameImage').src = game.image;
  document.getElementById('gameTitle').textContent = game.title;
  document.getElementById('gameCategory').textContent = (CATEGORY_LABELS[game.mainCategory] || game.mainCategory) + ' · ' + game.subCategory;
  document.getElementById('gameDescription').textContent = game.description;
  document.getElementById('gameDelivery').textContent = '⚡ Delivery in ' + game.delivery;
  document.getElementById('accountDataHeading').textContent = isTargetLinkProduct ? 'Enter the Target Link' : 'Enter Your Account Data';
  document.getElementById('accountUID').value = '';
  document.getElementById('accountEmail').value = '';
  document.getElementById('accountWhatsApp').value = '';
  document.getElementById('targetURL').value = '';
  document.getElementById('serverGroup').style.display = game.needsServer ? 'block' : 'none';
  if (uidGroup) uidGroup.style.display = isGameProduct ? 'block' : 'none';
  if (gmailGroup) gmailGroup.style.display = isGameProduct || isTargetLinkProduct || isWhatsAppProduct ? 'none' : 'block';
  if (whatsAppGroup) whatsAppGroup.style.display = isWhatsAppProduct ? 'block' : 'none';
  if (targetURLGroup) targetURLGroup.style.display = isTargetLinkProduct ? 'block' : 'none';
  document.getElementById('quantity').readOnly = true;
  document.getElementById('quantity').min = 1;
  document.getElementById('quantity').max = '';
  document.getElementById('quantity').value = 1;
  document.getElementById('quantityLabel').textContent = 'Quantity';
  if (game.pricingMode === 'per_1000') {
    var quantityInput = document.getElementById('quantity');
    quantityInput.readOnly = false;
    quantityInput.min = game.minQuantity;
    quantityInput.max = game.maxQuantity;
    quantityInput.value = game.minQuantity;
    document.getElementById('quantityLabel').textContent = 'Quantity (' + game.minQuantity + '–' + game.maxQuantity + ')';
  }

  var pkgGrid = document.getElementById('packagesGrid');
  pkgGrid.innerHTML = '';

  game.packages.forEach(function (pkg, i) {
    var div = document.createElement('div');
    div.className = 'package-option' + (i === 0 ? ' selected' : '');
    div.setAttribute('data-id', pkg.id);
    div.setAttribute('data-price', pkg.value);
    div.setAttribute('data-label', pkg.label);
    var packageName = document.createElement('div');
    packageName.className = 'package-name';
    packageName.textContent = pkg.label;
    var packagePrice = document.createElement('div');
    packagePrice.className = 'package-price';
    packagePrice.textContent = 'Rs' + formatMoney(pkg.value) + (game.pricingMode === 'per_1000' ? ' / 1,000' : '');
    div.appendChild(packageName);
    div.appendChild(packagePrice);
    div.onclick = function () {
      pkgGrid.querySelectorAll('.package-option').forEach(function (el) { el.classList.remove('selected'); });
      div.classList.add('selected');
      updateQuantityPricePreview();
    };
    pkgGrid.appendChild(div);
  });
  var modal = document.getElementById('gameShoppingModal');
  modal.setAttribute('data-game-id', gameId);
  updateQuantityPricePreview();
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
function formatMoney(value) {
  var amount = Number(value) || 0;
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

function cartItemTotal(item) {
  var total = Number(item.price) * Number(item.quantity);
  return roundMoney(item.pricingMode === 'per_1000' ? total / 1000 : total);
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function couponDiscountForItem(item, percentOff) {
  return Math.round((cartItemTotal(item) * percentOff / 100 + Number.EPSILON) * 100) / 100;
}

function updateCheckoutSummary() {
  var summary = document.getElementById('checkoutCartSummary');
  var subtotal = 0;
  var discount = 0;
  var html = '';
  cart.forEach(function (item) {
    var itemTotal = cartItemTotal(item);
    subtotal += itemTotal;
    var packageDescription = item.gameTitle + ' - ' + item.packageLabel +
      (item.pricingMode === 'per_1000' ? ' (' + item.quantity + ' units)' : '');
    html += '<div class="checkout-item"><span>' + escapeHTML(packageDescription) +
      '</span><span>Rs' + formatMoney(itemTotal) + '</span></div>';
    if (appliedCoupon) discount += couponDiscountForItem(item, appliedCoupon.percentOff);
  });
  if (summary) summary.innerHTML = html;
  var discountRow = document.getElementById('checkoutDiscountRow');
  if (discountRow) discountRow.hidden = !appliedCoupon;
  var discountLabel = document.getElementById('checkoutDiscountLabel');
  if (discountLabel) discountLabel.textContent = appliedCoupon ? 'Coupon ' + appliedCoupon.code : 'Coupon discount';
  var discountValue = document.getElementById('checkoutDiscount');
  if (discountValue) discountValue.textContent = '-Rs' + formatMoney(discount);
  var total = document.getElementById('checkoutTotal');
  if (total) total.textContent = 'Rs' + formatMoney(Math.max(0, subtotal - discount));
}

function setCouponMessage(message, state) {
  var element = document.getElementById('couponMessage');
  if (!element) return;
  element.textContent = message;
  element.className = 'coupon-message' + (state ? ' ' + state : '');
}

async function applyCheckoutCoupon() {
  var input = document.getElementById('checkoutCouponCode');
  var button = document.getElementById('applyCouponBtn');
  var code = input.value.trim().toUpperCase();
  if (!code) {
    appliedCoupon = null;
    setCouponMessage('Enter a coupon code.', 'error');
    updateCheckoutSummary();
    return;
  }

  button.disabled = true;
  setCouponMessage('Checking coupon…', '');
  try {
    var client = window.getSupabaseClient();
    var result = await client.rpc('check_coupon', { p_code: code });
    if (result.error) throw result.error;
    var percentOff = Number(result.data);
    if (!Number.isFinite(percentOff) || percentOff <= 0 || percentOff > 100) {
      throw new Error('The coupon returned an invalid discount.');
    }
    appliedCoupon = { code: code, percentOff: percentOff };
    input.value = code;
    setCouponMessage(code + ' applied — ' + formatMoney(percentOff) + '% off your order.', 'success');
    updateCheckoutSummary();
  } catch (error) {
    appliedCoupon = null;
    updateCheckoutSummary();
    setCouponMessage(error.message || 'This coupon could not be applied.', 'error');
  } finally {
    button.disabled = false;
  }
}

function generateCheckoutId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  var bytes = new Uint8Array(16);
  if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
  else for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  var hex = Array.prototype.map.call(bytes, function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
  return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
}

function setQuantity(value) {
  var input = document.getElementById('quantity');
  var minimum = Number(input.min) || 1;
  var maximum = Number(input.max) || Number.MAX_SAFE_INTEGER;
  input.value = Math.min(maximum, Math.max(minimum, parseInt(value, 10) || minimum));
  updateQuantityPricePreview();
}

function updateQuantityPricePreview() {
  var preview = document.getElementById('quantityPricePreview');
  if (!preview) return;
  var modal = document.getElementById('gameShoppingModal');
  var game = modal && GAME_DATA[modal.getAttribute('data-game-id')];
  var selected = document.querySelector('#packagesGrid .package-option.selected');
  if (!game || !selected) {
    preview.textContent = '';
    return;
  }
  var quantity = Number(document.getElementById('quantity').value) || 1;
  var price = Number(selected.getAttribute('data-price')) || 0;
  if (!Number.isInteger(quantity) || quantity < game.minQuantity || quantity > game.maxQuantity) {
    preview.textContent = 'Enter a whole quantity between ' + game.minQuantity + ' and ' + game.maxQuantity + '.';
    return;
  }
  var total = roundMoney(game.pricingMode === 'per_1000' ? price * quantity / 1000 : price * quantity);
  preview.textContent = game.pricingMode === 'per_1000'
    ? 'Rs' + formatMoney(price) + ' ÷ 1,000 × ' + quantity + ' = Rs' + formatMoney(total)
    : 'Estimated total: Rs' + formatMoney(total);
}

function decrementQuantity() {
  var input = document.getElementById('quantity');
  if (input.readOnly) {
    if (Number(input.value) > 1) input.value = Number(input.value) - 1;
    updateQuantityPricePreview();
    return;
  }
  setQuantity(Number(input.value) - 1);
}

function incrementQuantity() {
  var input = document.getElementById('quantity');
  if (input.readOnly) {
    input.value = Number(input.value) + 1;
    updateQuantityPricePreview();
    return;
  }
  setQuantity(Number(input.value) + 1);
}

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
  if (!catalogReady) {
    alert('The online catalog is not ready. Refresh the page or contact the site administrator.');
    return;
  }
  var modal = document.getElementById('gameShoppingModal');
  var gameId = modal.getAttribute('data-game-id');
  var game = GAME_DATA[gameId];
  var isGameProduct = game.accountType === 'uid';
  var isTargetLinkProduct = game.accountType === 'url';
  var isWhatsAppProduct = game.accountType === 'whatsapp';
  var accountId = '';
  var whatsAppNumber = '';
  var targetURL = '';
  var serverId = '';
  var quantityValue = document.getElementById('quantity').value;
  var qty = Number(quantityValue);
  var selected = document.querySelector('#packagesGrid .package-option.selected');
  if (game.pricingMode !== 'per_1000' && game.stock < 1) { alert('This product is currently out of stock.'); return; }
  if (!Number.isInteger(qty) || qty < game.minQuantity || qty > game.maxQuantity) {
    alert('Please enter a quantity between ' + game.minQuantity + ' and ' + game.maxQuantity + '.');
    return;
  }

  if (isGameProduct) {
    accountId = document.getElementById('accountUID').value.trim();
    if (!accountId) { alert('Please enter your UID'); return; }
    serverId = document.getElementById('serverID').value.trim();
  } else if (isTargetLinkProduct) {
    targetURL = document.getElementById('targetURL').value.trim();
    try {
      var parsedTargetURL = new URL(targetURL);
      if (!['http:', 'https:'].includes(parsedTargetURL.protocol)) throw new Error('Unsupported protocol');
    } catch (error) {
      alert('Please enter a valid video, profile, or page link starting with http:// or https://.');
      return;
    }
  } else if (isWhatsAppProduct) {
    whatsAppNumber = document.getElementById('accountWhatsApp').value.trim();
    var whatsAppDigits = whatsAppNumber.replace(/\D/g, '');
    if (!/^\+?[0-9\s()-]+$/.test(whatsAppNumber) || whatsAppDigits.length < 7 || whatsAppDigits.length > 15) {
      alert('Please enter a valid WhatsApp number with 7 to 15 digits.');
      return;
    }
  } else {
    accountId = document.getElementById('accountEmail').value.trim().toLowerCase();
    var gmailPattern = /^[^\s@]+@gmail\.com$/i;
    if (!accountId) { alert('Please enter your Gmail account'); return; }
    if (!gmailPattern.test(accountId)) { alert('Please enter a valid Gmail account'); return; }
  }

  if (!selected) { alert('Please select a package'); return; }

  cart.push({
    id: Date.now(),
    gameId: gameId,
    productId: game.productId,
    gameTitle: game.title,
    gameImage: game.image,
    packageLabel: selected.getAttribute('data-label'),
    packageId: selected.getAttribute('data-id'),
    price: Number(selected.getAttribute('data-price')),
    quantity: qty,
    pricingMode: game.pricingMode,
    accountUID: accountId,
    whatsAppNumber: whatsAppNumber,
    targetURL: targetURL,
    serverId: serverId,
    accountType: game.accountType
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
    var itemTotal = cartItemTotal(item);
    sum += itemTotal;
    html += '<div class="cart-item"><img src="' + escapeHTML(item.gameImage) + '" class="cart-item-image">' +
      '<div class="cart-item-details"><div class="cart-item-title">' + escapeHTML(item.gameTitle) + '</div>' +
      '<div class="cart-item-package">' + escapeHTML(item.packageLabel) +
      (item.pricingMode === 'per_1000' ? ' · ' + item.quantity + ' units' : '') + '</div>' +
      '<div class="cart-item-price">Rs' + formatMoney(itemTotal) + '</div></div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">×</button></div>';
  });
  list.innerHTML = html;
  if (total) total.textContent = 'Rs' + formatMoney(sum);
}

function removeFromCart(itemId) {
  cart = cart.filter(function (item) { return item.id != itemId; });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function generateOrderCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  var code = '';
  for (var i = 0; i < 5; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function updatePaymentPanels() {
  var paymentMethod = document.getElementById('paymentMethod');
  var selectedMethod = paymentMethod ? paymentMethod.value : 'esewa';
  var esewaBlock = document.getElementById('esewaBlock');
  var khaltiBlock = document.getElementById('khaltiBlock');
  var bankBlock = document.getElementById('bankBlock');

  if (esewaBlock) esewaBlock.style.display = selectedMethod === 'esewa' ? 'block' : 'none';
  if (khaltiBlock) khaltiBlock.style.display = selectedMethod === 'khalti' ? 'block' : 'none';
  if (bankBlock) bankBlock.style.display = selectedMethod === 'bank' ? 'block' : 'none';
}

function proceedToCheckout() {
  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  document.getElementById('cartDrawer').classList.remove('open');

  appliedCoupon = null;
  document.getElementById('checkoutCouponCode').value = '';
  setCouponMessage('', '');
  updateCheckoutSummary();

  var esewaCode = generateOrderCode();
  var khaltiCode = generateOrderCode();
  var bankCode = generateOrderCode();

  var esewaCodeEl = document.getElementById('esewaCode');
  if (esewaCodeEl) {
    esewaCodeEl.textContent = esewaCode;
    esewaCodeEl.setAttribute('data-code', esewaCode);
  }

  var khaltiCodeEl = document.getElementById('khaltiCode');
  if (khaltiCodeEl) {
    khaltiCodeEl.textContent = khaltiCode;
    khaltiCodeEl.setAttribute('data-code', khaltiCode);
  }

  var bankCodeEl = document.getElementById('bankCode');
  if (bankCodeEl) {
    bankCodeEl.textContent = bankCode;
    bankCodeEl.setAttribute('data-code', bankCode);
  }

  if (document.getElementById('paymentMethod')) {
    document.getElementById('paymentMethod').dispatchEvent(new Event('change'));
  }

  document.getElementById('checkoutModal').classList.add('open');
}

async function placeOrder(event) {
  event.preventDefault();

  if (cart.length === 0) { alert('Your cart is empty!'); return; }
  if (!catalogReady) { alert('The online catalog is unavailable. Please try again later.'); return; }

  var client;
  var auth;
  try {
    client = window.getSupabaseClient();
    auth = await client.auth.getUser();
    if (auth.error) throw auth.error;
  } catch (error) {
    alert(error.message || 'Could not verify your account.');
    return;
  }
  if (!auth.data.user) {
    window.location.href = 'login.html';
    return;
  }
  if (cart.some(function (item) { return !item.productId || !item.packageId; })) {
    alert('Your cart contains an outdated item. Remove it and add the product again.');
    return;
  }
  if (cart.some(function (item) {
    return item.pricingMode === 'per_1000' &&
      (!item.targetURL || !Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 1000);
  })) {
    alert('An SMM item is missing its target link or minimum quantity. Remove it and add the service again.');
    return;
  }

  var couponCode = appliedCoupon ? appliedCoupon.code : '';
  var checkoutId = appliedCoupon ? generateCheckoutId() : null;
  if (appliedCoupon) {
    try {
      var couponCheck = await client.rpc('check_coupon', { p_code: couponCode });
      if (couponCheck.error) throw couponCheck.error;
      if (Number(couponCheck.data) !== appliedCoupon.percentOff) {
        appliedCoupon = null;
        updateCheckoutSummary();
        setCouponMessage('The coupon changed. Apply it again before placing your order.', 'error');
        return;
      }
    } catch (error) {
      appliedCoupon = null;
      updateCheckoutSummary();
      setCouponMessage(error.message || 'The coupon is no longer valid.', 'error');
      return;
    }
  } else if (document.getElementById('checkoutCouponCode').value.trim()) {
    setCouponMessage('Apply the coupon before placing your order.', 'error');
    return;
  }

  var paymentMethod = document.getElementById('paymentMethod').value;
  var paymentCode = 'N/A';

  if (paymentMethod === 'esewa') {
    paymentCode = document.getElementById('esewaCode').getAttribute('data-code') || 'N/A';
  } else if (paymentMethod === 'khalti') {
    paymentCode = document.getElementById('khaltiCode').getAttribute('data-code') || 'N/A';
  } else {
    paymentCode = document.getElementById('bankCode').getAttribute('data-code') || 'N/A';
  }

  var orders = cart.map(function (item) {
    var discountAmount = appliedCoupon ? couponDiscountForItem(item, appliedCoupon.percentOff) : 0;
    return {
      user_id: auth.data.user.id,
      product_id: item.productId,
      package_id: item.packageId,
      game_title: item.gameTitle,
      pack_label: item.packageLabel,
      uid: item.accountUID,
      whatsapp_number: item.whatsAppNumber || '',
      target_url: item.targetURL || '',
      server_id: item.serverId || '',
      quantity: item.quantity,
      price: item.price,
      total: cartItemTotal(item) - discountAmount,
      coupon_code: couponCode,
      discount_amount: discountAmount,
      checkout_id: checkoutId,
      payment_method: paymentMethod,
      payment_code: paymentCode,
      status: 'Pending'
    };
  });
  try {
    var saved = await client.from('orders').insert(orders);
    if (saved.error) throw saved.error;
  } catch (error) {
    alert('Could not save your order: ' + error.message);
    return;
  }

  cart = [];
  appliedCoupon = null;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();

  document.getElementById('checkoutModal').classList.remove('open');

  alert('Order sent successfully.\n\nPayment Method: ' + paymentMethod.toUpperCase() + '\n\nCode: ' + paymentCode + '\n\nPlease use this code in the selected payment remarks before making payment.');
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

// ---- Init ----
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('categoryRail')) return;
  loadSiteSettings();
  window.addEventListener('storage', function (event) {
    if (event.key !== 'siteSettings') return;
    try {
      renderSiteSettings(JSON.parse(event.newValue || 'null') || DEFAULT_SITE_SETTINGS);
    } catch (error) {
      console.error('Unable to apply updated storefront settings.', error);
    }
  });
  window.addEventListener('focus', loadSiteSettings);
  window.setInterval(function () { renderSiteSettings(activeSiteSettings); }, 60 * 1000);
  loadStoreCatalog();
  updateAccountMenu();
  updateCartBadge();
  var paymentMethod = document.getElementById('paymentMethod');
  if (paymentMethod) {
    paymentMethod.addEventListener('change', updatePaymentPanels);
  }

  var checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) checkoutForm.addEventListener('submit', placeOrder);

  var copyBtn = document.getElementById('copyEsewaCodeBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var code = document.getElementById('esewaCode').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      showNotification('eSewa code copied!');
    });
  }

  var khaltiCopyBtn = document.getElementById('copyKhaltiCodeBtn');
  if (khaltiCopyBtn) {
    khaltiCopyBtn.addEventListener('click', function () {
      var code = document.getElementById('khaltiCode').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      showNotification('Khalti code copied!');
    });
  }

  var bankCopyBtn = document.getElementById('copyBankCodeBtn');
  if (bankCopyBtn) {
    bankCopyBtn.addEventListener('click', function () {
      var code = document.getElementById('bankCode').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(code);
      showNotification('Bank code copied!');
    });
  }

  var applyCouponBtn = document.getElementById('applyCouponBtn');
  if (applyCouponBtn) applyCouponBtn.addEventListener('click', applyCheckoutCoupon);
  var couponInput = document.getElementById('checkoutCouponCode');
  if (couponInput) couponInput.addEventListener('input', function () {
    if (appliedCoupon && couponInput.value.trim().toUpperCase() !== appliedCoupon.code) {
      appliedCoupon = null;
      setCouponMessage('', '');
      updateCheckoutSummary();
    }
  });

  updatePaymentPanels();

});