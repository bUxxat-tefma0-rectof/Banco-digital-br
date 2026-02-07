/* ============================================
   BEAUTYLUX - PAINEL ADMINISTRATIVO JS
   ============================================ */

// ============================================
// NAVEGAÇÃO
// ============================================

/**
 * Mostra seção do admin
 */
function showAdminSection(sectionId) {
    // Atualiza navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.nav-item').classList.add('active');
    
    // Atualiza seções
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // Atualiza título
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'Gerenciar Produtos',
        'orders': 'Gerenciar Pedidos',
        'customers': 'Clientes',
        'coupons': 'Cupons de Desconto',
        'banners': 'Banners do Carrossel',
        'finance': 'Relatório Financeiro',
        'settings': 'Configurações'
    };
    
    document.getElementById('adminTitle').textContent = titles[sectionId] || 'Admin';
    
    // Carrega dados da seção
    loadSectionData(sectionId);
}

/**
 * Carrega dados da seção
 */
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'products':
            renderProductsTable();
            break;
        case 'orders':
            renderOrdersTable();
            break;
        case 'customers':
            renderCustomersTable();
            break;
        case 'coupons':
            renderCouponsGrid();
            break;
        case 'banners':
            renderBannersGrid();
            break;
        case 'finance':
            renderFinanceReport();
            break;
    }
}

// ============================================
// DASHBOARD
// ============================================

/**
 * Renderiza dashboard
 */
function renderDashboard() {
    // Pedidos recentes
    const recentOrdersHtml = orders.slice(-5).reverse().map(order => `
        <div style="padding: 15px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>#${order.id}</strong>
                <br>
                <small>${order.customer.name}</small>
            </div>
            <div style="text-align: right;">
                <strong style="color: var(--admin-primary);">R$ ${order.total.toFixed(2)}</strong>
                <br>
                <span class="status-badge ${order.status}">${orderStatus[order.status].label}</span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('recentOrders').innerHTML = recentOrdersHtml || '<p style="text-align: center; color: #999;">Nenhum pedido recente</p>';
    
    // Produtos mais vendidos
    const productSales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
        });
    });
    
    const topProductsArray = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, qty]) => {
            const product = products.find(p => p.id === parseInt(id));
            return { product, qty };
        });
    
    const topProductsHtml = topProductsArray.map(({ product, qty }) => `
        <div style="padding: 15px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${product.image}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
                <div>
                    <strong>${product.name}</strong>
                    <br>
                    <small>${qty} vendidos</small>
                </div>
            </div>
            <strong style="color: var(--admin-primary);">R$ ${product.price.toFixed(2)}</strong>
        </div>
    `).join('');
    
    document.getElementById('topProducts').innerHTML = topProductsHtml;
}

// ============================================
// PRODUTOS
// ============================================

/**
 * Renderiza tabela de produtos
 */
function renderProductsTable() {
    const html = products.map(product => `
        <tr>
            <td><img src="${product.image}" class="product-thumb" alt="${product.name}"></td>
            <td><strong>${product.name}</strong></td>
            <td>${getCategoryName(product.category)}</td>
            <td><strong>R$ ${product.price.toFixed(2)}</strong></td>
            <td>${product.stock} un.</td>
            <td><span class="status-badge active">Ativo</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-sm btn-edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('productsTable').innerHTML = html;
}

/**
 * Mostra formulário de produto
 */
function showProductForm(productId = null) {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        document.getElementById('productModalTitle').textContent = 'Editar Produto';
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productOldPrice').value = product.oldPrice || '';
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productBadge').value = product.badge || '';
        document.getElementById('productFeatured').checked = product.featured;
    } else {
        document.getElementById('productModalTitle').textContent = 'Novo Produto';
        form.reset();
    }
    
    form.onsubmit = (e) => {
        e.preventDefault();
        saveProduct(productId);
    };
    
    modal.classList.add('active');
}

/**
 * Fecha modal de produto
 */
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

/**
 * Salva produto
 */
function saveProduct(productId) {
    const productData = {
        id: productId || products.length + 1,
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        images: [document.getElementById('productImage').value],
        price: parseFloat(document.getElementById('productPrice').value),
        oldPrice: parseFloat(document.getElementById('productOldPrice').value) || null,
        stock: parseInt(document.getElementById('productStock').value),
        badge: document.getElementById('productBadge').value || null,
        featured: document.getElementById('productFeatured').checked,
        rating: 4.5,
        reviews: 0,
        variations: []
    };
    
    if (productId) {
        const index = products.findIndex(p => p.id === productId);
        products[index] = { ...products[index], ...productData };
    } else {
        products.push(productData);
    }
    
    closeProductModal();
    renderProductsTable();
    showNotification('Produto salvo com sucesso!', 'success');
}

/**
 * Edita produto
 */
function editProduct(productId) {
    showProductForm(productId);
}

/**
 * Deleta produto
 */
function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const index = products.findIndex(p => p.id === productId);
        products.splice(index, 1);
        renderProductsTable();
        showNotification('Produto excluído com sucesso', 'success');
    }
}

/**
 * Busca produtos no admin
 */
function searchAdminProducts(term) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.category.toLowerCase().includes(term.toLowerCase())
    );
    
    const html = filtered.map(product => `
        <tr>
            <td><img src="${product.image}" class="product-thumb" alt="${product.name}"></td>
            <td><strong>${product.name}</strong></td>
            <td>${getCategoryName(product.category)}</td>
            <td><strong>R$ ${product.price.toFixed(2)}</strong></td>
            <td>${product.stock} un.</td>
            <td><span class="status-badge active">Ativo</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-sm btn-edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('productsTable').innerHTML = html;
}

// ============================================
// PEDIDOS
// ============================================

/**
 * Renderiza tabela de pedidos
 */
function renderOrdersTable(filter = '') {
    const filtered = filter ? orders.filter(o => o.status === filter) : orders;
    
    const html = filtered.map(order => `
        <tr>
            <td><strong>#${order.id}</strong></td>
            <td>
                ${order.customer.name}<br>
                <small>${order.customer.email}</small>
            </td>
            <td>${formatDate(order.date)}</td>
            <td>${order.items.length} itens</td>
            <td><strong style="color: var(--admin-primary);">R$ ${order.total.toFixed(2)}</strong></td>
            <td><span class="status-badge ${order.status}">${orderStatus[order.status].label}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-sm btn-view" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 5px; border-radius: 4px; border: 1px solid #ddd;">
                        ${Object.keys(orderStatus).map(status => `
                            <option value="${status}" ${order.status === status ? 'selected' : ''}>
                                ${orderStatus[status].label}
                            </option>
                        `).join('')}
                    </select>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('ordersTable').innerHTML = html || '<tr><td colspan="7" style="text-align: center; color: #999;">Nenhum pedido encontrado</td></tr>';
}

/**
 * Filtra pedidos
 */
function filterOrders(status) {
    renderOrdersTable(status);
}

/**
 * Visualiza pedido
 */
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const content = document.getElementById('orderModalContent');
    
    content.innerHTML = `
        <h2>Pedido #${order.id}</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 25px;">
            <div>
                <h3>Informações do Cliente</h3>
                <p><strong>Nome:</strong> ${order.customer.name}</p>
                <p><strong>E-mail:</strong> ${order.customer.email}</p>
                <p><strong>Telefone:</strong> ${order.customer.phone}</p>
                <p><strong>CPF:</strong> ${order.customer.cpf}</p>
            </div>
            
            <div>
                <h3>Dados do Pedido</h3>
                <p><strong>Data:</strong> ${formatDate(order.date)}</p>
                <p><strong>Status:</strong> <span class="status-badge ${order.status}">${orderStatus[order.status].label}</span></p>
                <p><strong>Pagamento:</strong> ${order.payment.toUpperCase()}</p>
                ${order.tracking ? `<p><strong>Rastreio:</strong> ${order.tracking}</p>` : ''}
            </div>
        </div>
        
        ${order.address ? `
            <div style="margin-top: 25px;">
                <h3>Endereço de Entrega</h3>
                <p>
                    ${order.address.street}, ${order.address.number}
                    ${order.address.complement ? ' - ' + order.address.complement : ''}<br>
                    ${order.address.neighborhood}, ${order.address.city} - ${order.address.state}<br>
                    CEP: ${order.address.cep}
                </p>
            </div>
        ` : ''}
        
        <div style="margin-top: 25px;">
            <h3>Itens do Pedido</h3>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Unit.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>R$ ${item.price.toFixed(2)}</td>
                            <td><strong>R$ ${(item.quantity * item.price).toFixed(2)}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 25px; padding: 20px; background: #f8f8f8; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Subtotal:</span>
                <span>R$ ${order.subtotal.toFixed(2)}</span>
            </div>
            ${order.discount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: var(--admin-success);">
                    <span>Desconto:</span>
                    <span>- R$ ${order.discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Frete:</span>
                <span>${order.shipping === 0 ? 'GRÁTIS' : 'R$ ' + order.shipping.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #ddd; font-size: 20px; font-weight: 700;">
                <span>Total:</span>
                <span style="color: var(--admin-primary);">R$ ${order.total.toFixed(2)}</span>
            </div>
        </div>
        
        <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: flex-end;">
            <button class="btn-secondary" onclick="closeOrderModal()">Fechar</button>
            <button class="btn-primary" onclick="printOrder('${order.id}')">
                <i class="fas fa-print"></i> Imprimir
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Fecha modal de pedido
 */
function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

/**
 * Atualiza status do pedido
 */
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        
        // Adiciona código de rastreio se enviar
        if (newStatus === 'shipped' && !order.tracking) {
            order.tracking = 'BR' + Math.random().toString(36).substring(2, 15).toUpperCase();
        }
        
        renderOrdersTable();
        showNotification('Status atualizado com sucesso!', 'success');
    }
}

/**
 * Imprime pedido
 */
function printOrder(orderId) {
    showNotification('Funcionalidade de impressão em desenvolvimento', 'info');
}

// ============================================
// CLIENTES
// ============================================

/**
 * Renderiza tabela de clientes
 */
function renderCustomersTable() {
    const html = customers.map(customer => `
        <tr>
            <td><strong>${customer.name}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.totalOrders}</td>
            <td><strong style="color: var(--admin-primary);">R$ ${customer.totalSpent.toFixed(2)}</strong></td>
            <td>${formatDate(customer.registered)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-sm btn-view" onclick="viewCustomer(${customer.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('customersTable').innerHTML = html;
}

/**
 * Busca clientes
 */
function searchCustomers(term) {
    const filtered = customers.filter(c => 
        c.name.toLowerCase().includes(term.toLowerCase()) ||
        c.email.toLowerCase().includes(term.toLowerCase())
    );
    
    // Renderiza filtrados (implementação similar a renderCustomersTable)
}

/**
 * Exporta clientes
 */
function exportCustomers() {
    showNotification('Exportando lista de clientes...', 'info');
}

/**
 * Visualiza cliente
 */
function viewCustomer(customerId) {
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

// ============================================
// CUPONS
// ============================================

/**
 * Renderiza grid de cupons
 */
function renderCouponsGrid() {
    const html = coupons.map(coupon => `
        <div class="coupon-card">
            <div class="coupon-code">${coupon.code}</div>
            <p><strong>Desconto:</strong> ${
                coupon.type === 'percent' ? coupon.discount + '%' :
                coupon.type === 'fixed' ? 'R$ ' + coupon.discount.toFixed(2) :
                'Frete Grátis'
            }</p>
            <p><strong>Valor Mínimo:</strong> R$ ${coupon.minValue.toFixed(2)}</p>
            <p>${coupon.description}</p>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn-sm btn-edit" onclick="editCoupon('${coupon.code}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-sm btn-delete" onclick="deleteCoupon('${coupon.code}')">
                    <i class="fas fa-trash"></i>
                </button>
                <span class="status-badge ${coupon.active ? 'active' : 'inactive'}" style="margin-left: auto;">
                    ${coupon.active ? 'Ativo' : 'Inativo'}
                </span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('couponsGrid').innerHTML = html;
}

/**
 * Mostra formulário de cupom
 */
function showCouponForm() {
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Edita cupom
 */
function editCoupon(code) {
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Deleta cupom
 */
function deleteCoupon(code) {
    if (confirm('Deseja realmente excluir este cupom?')) {
        const index = coupons.findIndex(c => c.code === code);
        coupons.splice(index, 1);
        renderCouponsGrid();
        showNotification('Cupom excluído com sucesso', 'success');
    }
}

// ============================================
// BANNERS
// ============================================

/**
 * Renderiza grid de banners
 */
function renderBannersGrid() {
    const html = banners.map(banner => `
        <div class="banner-card">
            <img src="${banner.image}" class="banner-preview" alt="${banner.title}">
            <h4>${banner.title}</h4>
            <p>${banner.subtitle}</p>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn-sm btn-edit" onclick="editBanner(${banner.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-sm btn-delete" onclick="deleteBanner(${banner.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <span class="status-badge ${banner.active ? 'active' : 'inactive'}" style="margin-left: auto;">
                    ${banner.active ? 'Ativo' : 'Inativo'}
                </span>
            </div>
        </div>
    `).join('');
    
    document.getElementById('bannersGrid').innerHTML = html;
}

/**
 * Mostra formulário de banner
 */
function showBannerForm() {
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Edita banner
 */
function editBanner(id) {
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Deleta banner
 */
function deleteBanner(id) {
    if (confirm('Deseja realmente excluir este banner?')) {
        const index = banners.findIndex(b => b.id === id);
        banners.splice(index, 1);
        renderBannersGrid();
        showNotification('Banner excluído com sucesso', 'success');
    }
}

// ============================================
// FINANCEIRO
// ============================================

/**
 * Renderiza relatório financeiro
 */
function renderFinanceReport() {
    const categorySales = {};
    
    orders.forEach(order => {
        order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const category = getCategoryName(product.category);
                categorySales[category] = (categorySales[category] || 0) + (item.quantity * item.price);
            }
        });
    });
    
    const html = Object.entries(categorySales)
        .sort((a, b) => b[1] - a[1])
        .map(([category, value]) => `
            <div style="padding: 15px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center;">
                <strong>${category}</strong>
                <span style="font-size: 20px; font-weight: 700; color: var(--admin-primary);">
                    R$ ${value.toFixed(2)}
                </span>
            </div>
        `).join('');
    
    document.getElementById('salesByCategory').innerHTML = html;
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Mostra notificações
 */
function showNotifications() {
    showNotification('3 novos pedidos aguardando processamento', 'info');
}

/**
 * Nome da categoria
 */
function getCategoryName(category) {
    const names = {
        'perfumes': 'Perfumes',
        'maquiagem': 'Maquiagem',
        'skincare': 'Skincare',
        'corpo': 'Corpo & Banho'
    };
    return names[category] || category;
}

/**
 * Formata data
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Mostra notificação
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    console.log('✨ Painel administrativo BeautyLux inicializado!');
});
