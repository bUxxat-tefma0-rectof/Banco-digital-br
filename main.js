/* ============================================
   BEAUTYLUX E-COMMERCE - JAVASCRIPT PRINCIPAL
   ============================================ */

// ============================================
// ESTADO GLOBAL
// ============================================

let currentSlide = 0;
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let filteredProducts = [...products];

// ============================================
// CARROSSEL DE BANNERS
// ============================================

/**
 * Inicializa carrossel
 */
function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Cria dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Auto-play
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

/**
 * Muda slide
 */
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active atual
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Calcula novo slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Adiciona active novo
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Vai para slide específico
 */
function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// ============================================
// EXIBIÇÃO DE PRODUTOS
// ============================================

/**
 * Renderiza produtos em destaque
 */
function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    const featured = products.filter(p => p.featured).slice(0, 4);
    
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

/**
 * Renderiza produtos em promoção
 */
function renderPromoProducts() {
    const container = document.getElementById('promoProducts');
    const promo = products.filter(p => p.badge === 'promo').slice(0, 4);
    
    container.innerHTML = promo.map(product => createProductCard(product)).join('');
}

/**
 * Renderiza todos os produtos
 */
function renderAllProducts() {
    const container = document.getElementById('allProducts');
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

/**
 * Cria card de produto
 */
function createProductCard(product) {
    const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    
    return `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `
                    <span class="product-badge ${product.badge}">
                        ${product.badge === 'promo' ? discount + '% OFF' : 'NOVO'}
                    </span>
                ` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">R$ ${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="price-old">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Adicionar
                    </button>
                    <button class="btn-favorite" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderiza estrelas de avaliação
 */
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
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

// ============================================
// MODAL DE PRODUTO
// ============================================

/**
 * Mostra modal de produto
 */
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productModalContent');
    
    // Busca avaliações do produto
    const productReviews = reviews[productId] || [];
    
    content.innerHTML = `
        <div class="product-modal-grid">
            <div class="product-gallery">
                <div class="main-image" id="mainImage">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                ${product.images.length > 1 ? `
                    <div class="thumbnail-images">
                        ${product.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', ${index})">
                                <img src="${img}" alt="${product.name}">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="product-details">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-count">${product.rating} (${product.reviews} avaliações)</span>
                </div>
                
                <div class="product-price">
                    <span class="price-current">R$ ${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="price-old">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                
                <p class="product-description">${product.description}</p>
                
                ${product.variations && product.variations.length > 0 ? `
                    <div class="product-options">
                        <label>Escolha uma opção:</label>
                        <select id="productVariation">
                            ${product.variations.map((v, i) => `
                                <option value='${JSON.stringify(v)}'>
                                    ${Object.values(v).filter(val => typeof val === 'string').join(' - ')}
                                    ${v.price ? ' - R$ ' + v.price.toFixed(2) : ''}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                ` : ''}
                
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addProductToCart(${productId})">
                        <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                    </button>
                </div>
                
                <div class="product-info-tabs">
                    <p><i class="fas fa-truck"></i> <strong>Frete grátis</strong> em compras acima de R$ 199</p>
                    <p><i class="fas fa-shield-alt"></i> <strong>Compra segura</strong> e protegida</p>
                    <p><i class="fas fa-sync"></i> <strong>Troca grátis</strong> em até 30 dias</p>
                    <p><i class="fas fa-box"></i> <strong>Estoque:</strong> ${product.stock} unidades disponíveis</p>
                </div>
                
                ${productReviews.length > 0 ? `
                    <div class="reviews-section">
                        <h3>Avaliações dos Clientes</h3>
                        ${productReviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="reviewer-name">${review.name}</span>
                                    <div class="stars">${renderStars(review.rating)}</div>
                                </div>
                                <p>${review.comment}</p>
                                <small>${formatDate(review.date)}</small>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

/**
 * Fecha modal de produto
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
}

/**
 * Muda imagem principal
 */
function changeMainImage(imageSrc, index) {
    const mainImage = document.getElementById('mainImage');
    mainImage.querySelector('img').src = imageSrc;
    
    // Atualiza thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

/**
 * Adiciona produto ao carrinho do modal
 */
function addProductToCart(productId) {
    const variationSelect = document.getElementById('productVariation');
    let variation = null;
    
    if (variationSelect) {
        variation = JSON.parse(variationSelect.value);
    }
    
    addToCart(productId, variation);
    closeProductModal();
}

// ============================================
// BUSCA E FILTROS
// ============================================

/**
 * Busca produtos
 */
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    renderAllProducts();
    
    // Se estiver na home, vai para produtos
    if (searchTerm && document.querySelector('#home').classList.contains('active')) {
        showSection('produtos');
    }
}

/**
 * Filtra por categoria
 */
function filterByCategory(category) {
    if (category === 'promocao') {
        filteredProducts = products.filter(p => p.badge === 'promo');
    } else if (category === 'lancamento') {
        filteredProducts = products.filter(p => p.badge === 'new');
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    // Atualiza select
    const filterSelect = document.getElementById('filterCategory');
    if (filterSelect) {
        filterSelect.value = category === 'promocao' || category === 'lancamento' ? '' : category;
    }
    
    renderAllProducts();
    showSection('produtos');
}

/**
 * Aplica filtros
 */
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const priceRange = document.getElementById('filterPrice').value;
    const sortBy = document.getElementById('filterSort').value;
    
    // Filtra por categoria
    filteredProducts = category ? 
        products.filter(p => p.category === category) : 
        [...products];
    
    // Filtra por preço
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => 
            p.price >= min && p.price <= max
        );
    }
    
    // Ordena
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Relevância (featured primeiro)
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.reviews - a.reviews;
            });
    }
    
    renderAllProducts();
}

// ============================================
// NAVEGAÇÃO
// ============================================

/**
 * Mostra seção
 */
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostra seção solicitada
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        
        // Renderiza produtos se for a seção de produtos
        if (sectionId === 'produtos') {
            renderAllProducts();
        }
    }
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// AUTENTICAÇÃO
// ============================================

/**
 * Mostra modal de login
 */
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
}

/**
 * Fecha modal de login
 */
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
}

/**
 * Processa login
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simula login
    currentUser = {
        name: email.split('@')[0],
        email: email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeLoginModal();
    showNotification('Login realizado com sucesso!', 'success');
}

/**
 * Mostra modal de cadastro
 */
function showRegisterModal() {
    closeLoginModal();
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

/**
 * Mostra pedidos do usuário
 */
function showOrdersModal() {
    const userOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const modal = document.getElementById('loginModal');
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
        <span class="close" onclick="closeLoginModal()">&times;</span>
        <h2>Meus Pedidos</h2>
        
        ${userOrders.length === 0 ? `
            <div style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Você ainda não fez nenhum pedido</p>
                <button class="btn-primary" style="margin-top: 20px;" onclick="closeLoginModal(); showSection('produtos')">
                    Começar a Comprar
                </button>
            </div>
        ` : `
            <div style="max-height: 500px; overflow-y: auto;">
                ${userOrders.map(order => `
                    <div style="border: 2px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <div>
                                <strong>Pedido #${order.id}</strong>
                                <br>
                                <small>${formatDate(order.date)}</small>
                            </div>
                            <div>
                                <span style="background: ${orderStatus[order.status].color}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px;">
                                    ${orderStatus[order.status].label}
                                </span>
                            </div>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <strong>${order.items.length} ${order.items.length === 1 ? 'item' : 'itens'}</strong>
                        </div>
                        <div style="font-size: 20px; font-weight: 700; color: #D4AF37;">
                            R$ ${order.total.toFixed(2)}
                        </div>
                        ${order.tracking ? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <small>Código de rastreio: <strong>${order.tracking}</strong></small>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `}
    `;
    
    modal.classList.add('active');
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Mostra notificação
 */
function showNotification(message, type = 'info') {
    // Cria elemento de notificação
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
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
 * Toggle favorito
 */
function toggleFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removido dos favoritos', 'info');
    } else {
        favorites.push(productId);
        showNotification('Adicionado aos favoritos!', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ============================================
// ANIMAÇÕES CSS ADICIONAIS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa carrossel
    initCarousel();
    
    // Renderiza produtos
    renderFeaturedProducts();
    renderPromoProducts();
    
    // Fecha modais ao clicar fora
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    };
    
    console.log('🛍️ BeautyLux E-commerce inicializado!');
    console.log('📦 Total de produtos:', products.length);
    console.log('🎫 Cupons disponíveis:', coupons.map(c => c.code).join(', '));
});
