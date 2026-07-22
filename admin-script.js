// Admin Panel Script
let adminLoggedIn = false;
let currentEditProductId = null;

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    if (localStorage.getItem('isAdmin') === '1') {
        adminLoggedIn = true;
        const loginModalEl = document.getElementById('loginModal');
        if (loginModalEl) loginModalEl.classList.add('hidden');
        const adminDashboardEl = document.getElementById('adminDashboard');
        if (adminDashboardEl) adminDashboardEl.classList.remove('hidden');
        const adminNameEl = document.getElementById('adminName');
        if (adminNameEl) adminNameEl.textContent = 'Admin';
    }

    // Load data from localStorage
    loadAllData();

    // Login / Logout handlers (only if elements exist)
    const loginFormEl = document.getElementById('loginForm');
    if (loginFormEl) loginFormEl.addEventListener('submit', handleLogin);
    const logoutBtnEl = document.getElementById('logoutBtn');
    if (logoutBtnEl) logoutBtnEl.addEventListener('click', handleLogout);
    
    // Navigation tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    
    // Products (with null checks)
    const addProductBtn = document.getElementById('addProductBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const productForm = document.getElementById('productForm');
    if (addProductBtn) addProductBtn.addEventListener('click', showProductForm);
    if (cancelProductBtn) cancelProductBtn.addEventListener('click', hideProductForm);
    if (productForm) productForm.addEventListener('submit', saveProduct);

    // Sections
    const addSectionBtn = document.getElementById('addSectionBtn');
    const cancelSectionBtn = document.getElementById('cancelSectionBtn');
    const sectionForm = document.getElementById('sectionForm');
    if (addSectionBtn) addSectionBtn.addEventListener('click', showSectionForm);
    if (cancelSectionBtn) cancelSectionBtn.addEventListener('click', hideSectionForm);
    if (sectionForm) sectionForm.addEventListener('submit', saveSection);
    
    // Orders
    const clearOrdersBtn = document.getElementById('clearOrdersBtn');
    if (clearOrdersBtn) clearOrdersBtn.addEventListener('click', clearAllOrders);

    // Dashboard
    const exportDataBtn = document.getElementById('exportDataBtn');
    const clearAllDataBtn = document.getElementById('clearAllDataBtn');
    if (exportDataBtn) exportDataBtn.addEventListener('click', exportData);
    if (clearAllDataBtn) clearAllDataBtn.addEventListener('click', clearAllData);

    // Settings
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
    
    // Update product section dropdown
    try { updateSectionDropdown(); } catch(e) { console.warn('updateSectionDropdown error', e); }
    try { updateDashboard(); } catch(e) { console.warn('updateDashboard error', e); }
});

// Auth Functions
function handleLogin(e) {
    e.preventDefault();
    const adminUserEl = document.getElementById('adminUsername');
    const adminPassEl = document.getElementById('adminPassword');
    const username = adminUserEl ? adminUserEl.value : '';
    const password = adminPassEl ? adminPassEl.value : '';

    // Simple demo auth
    if (username === 'roshanshah' && password === 'killer3051Q') {
        adminLoggedIn = true;
        const loginModalEl = document.getElementById('loginModal');
        if (loginModalEl) loginModalEl.classList.add('hidden');
        const adminDashboardEl = document.getElementById('adminDashboard');
        if (adminDashboardEl) adminDashboardEl.classList.remove('hidden');
        const adminNameEl = document.getElementById('adminName');
        if (adminNameEl) adminNameEl.textContent = username;
        // Persist admin login for site header
        localStorage.setItem('isAdmin', '1');
    } else {
        alert('Invalid credentials. Demo: roshanshah / killer3051Q');
    }
}

function handleLogout() {
    adminLoggedIn = false;
    const loginModalEl = document.getElementById('loginModal');
    if (loginModalEl) loginModalEl.classList.remove('hidden');
    const adminDashboardEl = document.getElementById('adminDashboard');
    if (adminDashboardEl) adminDashboardEl.classList.add('hidden');
    const loginFormEl = document.getElementById('loginForm');
    if (loginFormEl) loginFormEl.reset();
    // clear admin flag so homepage knows
    localStorage.removeItem('isAdmin');
}

// Tab Switching
function switchTab(e) {
    const tabName = e.target.getAttribute('data-tab');
    
    // Remove active from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.remove('hidden');
    
    if (tabName === 'products') {
        displayProducts();
    } else if (tabName === 'sections') {
        displaySections();
    } else if (tabName === 'orders') {
        displayOrders();
    } else if (tabName === 'users') {
        displayUsers();
    } else if (tabName === 'dashboard') {
        updateDashboard();
    }
}

// ============ USERS ============
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('siteUsers') || '[]');
    const wrap = document.getElementById('usersList');
    if (!wrap) return;

    if (!users.length) {
        wrap.innerHTML = '<div class="empty-state"><h3>No users found</h3><p>Signups will appear here</p></div>';
        return;
    }

    let html = '<table class="orders-table" style="width:100%;border-collapse:collapse"><thead><tr><th>#</th><th>Username</th><th>Email</th><th>Created</th><th>Actions</th></tr></thead><tbody>';
    users.forEach((u, i) => {
        html += `<tr><td>${i+1}</td><td>${u.username || ''}</td><td>${u.email || ''}</td><td>${u.createdAt ? new Date(u.createdAt).toLocaleString() : ''}</td><td><button class="btn-edit" data-idx="${i}">Edit</button> <button class="btn-delete" data-idx="${i}">Delete</button></td></tr>`;
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;

    // wire delete buttons
    wrap.querySelectorAll('.btn-delete').forEach(b => {
        b.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            if (!confirm('Delete this account?')) return;
            const arr = JSON.parse(localStorage.getItem('siteUsers') || '[]');
            arr.splice(idx, 1);
            localStorage.setItem('siteUsers', JSON.stringify(arr));
            displayUsers();
            updateDashboard();
        });
    });

    // wire edit buttons
    wrap.querySelectorAll('.btn-edit').forEach(b => {
        b.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            editUser(idx);
        });
    });
}

// Users export / refresh bindings
document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshUsersBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', displayUsers);

    const exportBtn = document.getElementById('exportUsersBtn');
    if (exportBtn) exportBtn.addEventListener('click', function () {
        const users = JSON.parse(localStorage.getItem('siteUsers') || '[]');
        if (!users.length) return alert('No users to export');
        const rows = [['username', 'email', 'createdAt']].concat(users.map(u => [u.username || '', u.email || '', u.createdAt || '']));
        const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'siteUsers.csv'; a.click(); URL.revokeObjectURL(url);
    });
});

// ============ USER EDIT HANDLERS ============
let currentEditUserIdx = null;

function editUser(index) {
    const users = JSON.parse(localStorage.getItem('siteUsers') || '[]');
    const user = users[index];
    if (!user) return alert('User not found');

    currentEditUserIdx = index;
    const userModal = document.getElementById('userEditModal');
    const usernameEl = document.getElementById('editUsername');
    const emailEl = document.getElementById('editEmail');
    const passEl = document.getElementById('editPassword');
    if (usernameEl) usernameEl.value = user.username || '';
    if (emailEl) emailEl.value = user.email || '';
    if (passEl) passEl.value = user.password || '';
    if (userModal) userModal.classList.remove('hidden');
}

function hideUserModal() {
    const userModal = document.getElementById('userEditModal');
    if (userModal) userModal.classList.add('hidden');
    currentEditUserIdx = null;
}

// save edits
document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'userEditForm') {
        e.preventDefault();
        const usernameEl = document.getElementById('editUsername');
        const emailEl = document.getElementById('editEmail');
        const passEl = document.getElementById('editPassword');
        if (currentEditUserIdx === null) return alert('No user selected');
        const users = JSON.parse(localStorage.getItem('siteUsers') || '[]');
        const u = users[currentEditUserIdx];
        if (!u) return alert('User missing');
        const newUsername = usernameEl ? usernameEl.value.trim() : '';
        const newEmail = emailEl ? emailEl.value.trim().toLowerCase() : '';

        // Validation
        if (!newUsername) return alert('Username cannot be empty');

        // Ensure uniqueness among other users
        const conflict = users.some((other, idx) => {
            if (idx === currentEditUserIdx) return false;
            const otherUser = (other.username || '').trim().toLowerCase();
            const otherEmail = (other.email || '').trim().toLowerCase();
            if (otherUser && otherUser === newUsername.toLowerCase()) return true;
            if (newEmail && otherEmail && otherEmail === newEmail) return true;
            return false;
        });
        if (conflict) return alert('Username or email already in use by another account.');

        u.username = newUsername;
        u.email = newEmail;
        if (passEl && passEl.value) u.password = passEl.value;
        users[currentEditUserIdx] = u;
        localStorage.setItem('siteUsers', JSON.stringify(users));
        hideUserModal();
        displayUsers();
        updateDashboard();
        alert('User updated successfully');
    }
});

// ============ PRODUCTS ============
function showProductForm() {
    currentEditProductId = null;
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productFormContainer').classList.remove('hidden');
}

function hideProductForm() {
    document.getElementById('productFormContainer').classList.add('hidden');
}

function saveProduct(e) {
    e.preventDefault();
    
    const product = {
        id: currentEditProductId || 'prod_' + Date.now(),
        name: document.getElementById('productName').value,
        section: document.getElementById('productSection').value,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        packages: JSON.parse(document.getElementById('productPackages').value)
    };
    
    let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    
    if (currentEditProductId) {
        products = products.map(p => p.id === currentEditProductId ? product : p);
        alert('Product updated successfully!');
    } else {
        products.push(product);
        alert('Product added successfully!');
    }
    
    localStorage.setItem('adminProducts', JSON.stringify(products));
    hideProductForm();
    displayProducts();
    updateSectionDropdown();
    updateDashboard();
}

function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (product) {
        currentEditProductId = productId;
        document.getElementById('formTitle').textContent = 'Edit Product';
        document.getElementById('productName').value = product.name;
        document.getElementById('productSection').value = product.section;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPackages').value = JSON.stringify(product.packages, null, 2);
        document.getElementById('productFormContainer').classList.remove('hidden');
    }
}

function deleteProduct(productId) {
    if (confirm('Delete this product?')) {
        let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('adminProducts', JSON.stringify(products));
        displayProducts();
        updateDashboard();
    }
}

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No products yet</h3><p>Add your first product to get started</p></div>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'">
            <h4>${product.name}</h4>
            <p><strong>Section:</strong> ${product.section}</p>
            <p><strong>Packages:</strong> ${product.packages.length}</p>
            <p class="product-card__desc">${product.description}</p>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// ============ SECTIONS ============
function showSectionForm() {
    document.getElementById('sectionForm').reset();
    document.getElementById('sectionFormContainer').classList.remove('hidden');
}

function hideSectionForm() {
    document.getElementById('sectionFormContainer').classList.add('hidden');
}

function saveSection(e) {
    e.preventDefault();
    
    const section = {
        id: 'sec_' + Date.now(),
        name: document.getElementById('sectionName').value
    };
    
    let sections = JSON.parse(localStorage.getItem('adminSections') || '[]');
    sections.push(section);
    localStorage.setItem('adminSections', JSON.stringify(sections));
    
    alert('Section added successfully!');
    hideSectionForm();
    displaySections();
    updateSectionDropdown();
    updateDashboard();
}

function deleteSection(sectionId) {
    if (confirm('Delete this section? Products in this section will remain but unassigned.')) {
        let sections = JSON.parse(localStorage.getItem('adminSections') || '[]');
        sections = sections.filter(s => s.id !== sectionId);
        localStorage.setItem('adminSections', JSON.stringify(sections));
        displaySections();
        updateDashboard();
    }
}

function displaySections() {
    const sections = JSON.parse(localStorage.getItem('adminSections') || '[]');
    const list = document.getElementById('sectionsList');
    
    if (sections.length === 0) {
        list.innerHTML = '<div class="empty-state"><h3>No sections yet</h3><p>Create your first section to organize products</p></div>';
        return;
    }
    
    list.innerHTML = sections.map(section => {
        const productCount = JSON.parse(localStorage.getItem('adminProducts') || '[]')
            .filter(p => p.section === section.id).length;
        
        return `
            <div class="section-item">
                <div>
                    <h4>${section.name}</h4>
                    <p style="color: #999; font-size: 13px;">${productCount} products</p>
                </div>
                <div class="section-item-actions">
                    <button class="btn-delete" onclick="deleteSection('${section.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateSectionDropdown() {
    const sections = JSON.parse(localStorage.getItem('adminSections') || '[]');
    const select = document.getElementById('productSection');
    if (!select) return;
    
    const currentValue = select.value;
    select.innerHTML = '<option value="">Select Section</option>';
    
    sections.forEach(section => {
        select.innerHTML += `<option value="${section.id}">${section.name}</option>`;
    });
    
    select.value = currentValue;
}

// ============ ORDERS ============
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('gameCart') || '[]');
    const fullList = document.getElementById('ordersListFull');
    
    if (orders.length === 0) {
        fullList.innerHTML = '<div class="empty-state"><h3>No orders yet</h3><p>Orders will appear here when customers place them</p></div>';
        return;
    }
    
    const tableHTML = `
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Package</th>
                    <th>UID</th>
                    <th>Server ID</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>eSewa Code</th>
                    <th>Date / Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map((order, idx) => `
                    <tr>
                        <td>${order.gameTitle || 'N/A'}</td>
                        <td>${order.packLabel || order.packageLabel || 'N/A'}</td>
                        <td>${order.uid || 'N/A'}</td>
                        <td>${order.serverId || order.serverID || ''}</td>
                        <td>${order.quantity || 1}</td>
                        <td>Rs. ${order.price || 0}</td>
                        <td><strong>Rs. ${order.total || 0}</strong></td>
                        <td>${order.esewaCode || ''}</td>
                        <td>${order.timestamp ? new Date(order.timestamp).toLocaleString() : ''}</td>
                        <td><span class="order-status">${order.status || 'Pending'}</span></td>
                        <td><button class="btn-complete" onclick="markOrderCompleted(${idx})">Mark Completed</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    fullList.innerHTML = tableHTML;
}

function displayRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('gameCart') || '[]');
    const list = document.getElementById('recentOrdersList');

    const recentOrders = orders.slice(-5).reverse();
    
    if (recentOrders.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No orders yet</p>';
        return;
    }
    
    const tableHTML = `
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>UID</th>
                    <th>Server ID</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${recentOrders.map(order => `
                    <tr>
                        <td>${order.gameTitle || 'N/A'}</td>
                        <td>${order.uid || 'N/A'}</td>
                        <td>${order.serverId || order.serverID || ''}</td>
                        <td>Rs. ${order.total || 0}</td>
                        <td><span class="order-status">${order.status || 'Pending'}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    list.innerHTML = tableHTML;
}

function markOrderCompleted(index) {
    let orders = JSON.parse(localStorage.getItem('gameCart') || '[]');
    if (!orders[index]) return alert('Order not found');
    orders[index].status = 'Completed';
    localStorage.setItem('gameCart', JSON.stringify(orders));
    displayOrders();
    updateDashboard();
    alert('Order marked as Completed');
}

function clearAllOrders() {
    if (confirm('Clear all orders? This cannot be undone.')) {
        localStorage.setItem('gameCart', '[]');
        displayOrders();
        updateDashboard();
        alert('All orders cleared!');
    }
}

// ============ SETTINGS ============
function saveSettings() {
    const settings = {
        websiteStatus: document.getElementById('websiteStatus').checked,
        openingTime: document.getElementById('openingTime').value,
        closingTime: document.getElementById('closingTime').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    if (settings.websiteStatus !== undefined) {
        document.getElementById('websiteStatus').checked = settings.websiteStatus;
    }
    if (settings.openingTime) {
        document.getElementById('openingTime').value = settings.openingTime;
    }
    if (settings.closingTime) {
        document.getElementById('closingTime').value = settings.closingTime;
    }
    if (settings.contactEmail) {
        document.getElementById('contactEmail').value = settings.contactEmail;
    }
    if (settings.contactPhone) {
        document.getElementById('contactPhone').value = settings.contactPhone;
    }
}

// ============ DASHBOARD ============
function updateDashboard() {
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const sections = JSON.parse(localStorage.getItem('adminSections') || '[]');
    const orders = JSON.parse(localStorage.getItem('gameCart') || '[]');
    
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalSections').textContent = sections.length;
    document.getElementById('totalOrders').textContent = orders.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('totalRevenue').textContent = 'Rs. ' + totalRevenue;
    
    displayRecentOrders();
}

// ============ DATA MANAGEMENT ============
function loadAllData() {
    loadSettings();
    
    // Initialize with sample data if empty
    const existingProducts = localStorage.getItem('adminProducts');
    if (!existingProducts) {
        const sampleSections = [
            { id: 'sec_games', name: 'Online Games' },
            { id: 'sec_subs', name: 'Subscriptions' },
            { id: 'sec_software', name: 'Software Services' }
        ];
        localStorage.setItem('adminSections', JSON.stringify(sampleSections));
    }
}

// Export data function (for backup)
function exportData() {
    const data = {
        products: JSON.parse(localStorage.getItem('adminProducts') || '[]'),
        sections: JSON.parse(localStorage.getItem('adminSections') || '[]'),
        orders: JSON.parse(localStorage.getItem('gameCart') || '[]'),
        settings: JSON.parse(localStorage.getItem('adminSettings') || '{}')
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rs-bazar-backup.json';
    link.click();
}

// Clear all data function
function clearAllData() {
    if (confirm('Clear ALL data? This will delete all products, sections, orders, and settings. This cannot be undone.')) {
        localStorage.removeItem('adminProducts');
        localStorage.removeItem('adminSections');
        localStorage.removeItem('gameCart');
        localStorage.removeItem('adminSettings');
        alert('All data cleared successfully!');
        updateDashboard();
        // Reload the page to reset everything
        location.reload();
    }
}
