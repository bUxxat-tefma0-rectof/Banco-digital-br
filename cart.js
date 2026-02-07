/* ============================================
   BEAUTYLUX E-COMMERCE - CARRINHO DE COMPRAS
   ============================================ */

// ESTADO DO CARRINHO
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedCoupon = null;
let selectedShipping = null;

// ============================================
// FUNÇÕES DO CARRINHO
// ============================================

/**
 * Adiciona produto ao carrinho
 */
function addToCart(productId, variation = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Verifica se já existe no carrinho
    const existingItem = cart.find(item => 
        item.productId === productId && 
        JSON.stringify(item.variation) === JSON.stringify(variation)
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            name: product.name,
            image: product.image,
            price: variation ? variation.price : product.price,
            quantity: 1,
            variation: variation
        });
    }

    saveCart();
    updateCartUI();
    showNotification('Produto adicionado ao carrinho!', 'success');
}

/**
 * Remove produto do carrinho
 */
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showNotification('Produto removido do carrinho', 'info');
}

/**
 * Atualiza quantidade de item
 */
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

/**
 * Limpa carrinho
 */
function clearCart() {
    cart = [];
    appliedCoupon = null;
    selectedShipping = null;
    saveCart();
    updateCartUI();
}

/**
 * Salva carrinho no localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Calcula subtotal
 */
function getSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calcula desconto
 */
function getDiscount() {
    if (!appliedCoupon) return 0;
    
    const subtotal = getSubtotal();
    
    if (appliedCoupon.type === 'percent') {
        return subtotal * (appliedCoupon.discount / 100);
    } else if (appliedCoupon.type === 'fixed') {
        return appliedCoupon.discount;
    }
    
    return 0;
}

/**
 * Calcula frete
 */
function getShipping() {
    const subtotal = getSubtotal();
    
    // Frete grátis
    if (subtotal >= shippingConfig.freeShippingMinValue) {
        return 0;
    }
    
    // Cupom de frete grátis
    if (appliedCoupon && appliedCoupon.type === 'shipping') {
        return 0;
    }
    
    // Frete selecionado
    if (selectedShipping) {
        return selectedShipping.price;
    }
    
    // Frete padrão (PAC)
    return shippingConfig.rates[0].price;
}

/**
 * Calcula total
 */
function getTotal() {
    return getSubtotal() - getDiscount() + getShipping();
}

/**
 * Aplica cupom de desconto
 */
function applyCoupon() {
    const couponCode = document.getElementById('couponInput').value.trim().toUpperCase();
    
    if (!couponCode) {
        showNotification('Digite um cupom válido', 'error');
        return;
    }
    
    const coupon = coupons.find(c => c.code === couponCode && c.active);
    
    if (!coupon) {
        showNotification('Cupom inválido ou expirado', 'error');
        return;
    }
    
    const subtotal = getSubtotal();
    
    if (subtotal < coupon.minValue) {
        showNotification(`Valor mínimo de R$ ${coupon.minValue.toFixed(2)} não atingido`, 'error');
        return;
    }
    
    appliedCoupon = coupon;
    updateCartUI();
    showNotification(`Cupom ${couponCode} aplicado com sucesso!`, 'success');
    
    document.getElementById('couponInput').value = '';
}

/**
 * Atualiza interface do carrinho
 */
function updateCartUI() {
    // Atualiza contador
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    // Atualiza lista de itens
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-shopping-bag" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${item.variation ? `<small>${Object.values(item.variation).join(' - ')}</small>` : ''}
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <i class="fas fa-trash remove-item" onclick="removeFromCart(${index})"></i>
            </div>
        `).join('');
    }
    
    // Atualiza valores
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const shipping = getShipping();
    const total = getTotal();
    
    document.getElementById('cartSubtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2)}`;
    
    // Mostra/esconde linha de desconto
    const discountLine = document.getElementById('discountLine');
    if (discount > 0) {
        discountLine.style.display = 'flex';
        document.getElementById('cartDiscount').textContent = `- R$ ${discount.toFixed(2)}`;
    } else {
        discountLine.style.display = 'none';
    }
}

/**
 * Toggle carrinho lateral
 */
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

/**
 * Mostra modal de checkout
 */
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Adicione produtos ao carrinho primeiro', 'error');
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.add('active');
    
    // Reseta para o primeiro passo
    const steps = document.querySelectorAll('.checkout-step');
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
}

/**
 * Fecha modal de checkout
 */
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
}

/**
 * Avança para próximo passo do checkout
 */
function nextCheckoutStep() {
    const activeStep = document.querySelector('.checkout-step.active');
    const currentStep = parseInt(activeStep.dataset.step);
    
    // Valida formulário atual
    const form = activeStep.querySelector('form');
    if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Avança para próximo passo
    activeStep.classList.remove('active');
    const nextStep = document.querySelector(`.checkout-step[data-step="${currentStep + 1}"]`);
    if (nextStep) {
        nextStep.classList.add('active');
        
        // Se for o passo de pagamento, configura método
        if (currentStep + 1 === 3) {
            setupPaymentMethod();
        }
    }
}

/**
 * Volta para passo anterior
 */
function prevCheckoutStep() {
    const activeStep = document.querySelector('.checkout-step.active');
    const currentStep = parseInt(activeStep.dataset.step);
    
    activeStep.classList.remove('active');
    const prevStep = document.querySelector(`.checkout-step[data-step="${currentStep - 1}"]`);
    if (prevStep) {
        prevStep.classList.add('active');
    }
}

/**
 * Configura método de pagamento
 */
function setupPaymentMethod() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const paymentDetails = document.getElementById('paymentDetails');
            const method = e.target.value;
            
            if (method === 'pix') {
                paymentDetails.innerHTML = `
                    <div style="text-align: center; padding: 20px; background: #f8f8f8; border-radius: 8px;">
                        <h4>Pagamento via PIX</h4>
                        <p>Após finalizar o pedido, você receberá o QR Code para pagamento</p>
                        <p style="color: #4CAF50; font-weight: 600;">Aprovação Imediata</p>
                    </div>
                `;
            } else if (method === 'credit') {
                paymentDetails.innerHTML = `
                    <div style="padding: 20px; background: #f8f8f8; border-radius: 8px;">
                        <h4>Cartão de Crédito</h4>
                        <input type="text" placeholder="Número do Cartão" style="width: 100%; margin-bottom: 10px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <input type="text" placeholder="Validade (MM/AA)">
                            <input type="text" placeholder="CVV">
                        </div>
                        <input type="text" placeholder="Nome no Cartão" style="width: 100%; margin-top: 10px;">
                        <select style="width: 100%; margin-top: 10px;">
                            <option>1x sem juros</option>
                            <option>2x sem juros</option>
                            <option>3x sem juros</option>
                            <option>4x sem juros</option>
                        </select>
                    </div>
                `;
            } else if (method === 'mercadopago') {
                paymentDetails.innerHTML = `
                    <div style="text-align: center; padding: 20px; background: #f8f8f8; border-radius: 8px;">
                        <h4>Mercado Pago</h4>
                        <p>Você será redirecionado para o Mercado Pago para concluir o pagamento</p>
                        <p style="color: #666;">Cartão, PIX, Boleto e mais opções disponíveis</p>
                    </div>
                `;
            }
        });
    });
    
    // Dispara o evento para o método selecionado
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment) {
        selectedPayment.dispatchEvent(new Event('change'));
    }
}

/**
 * Finaliza pedido
 */
function finishOrder() {
    // Coleta dados do formulário
    const orderData = {
        id: `PED${String(orders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        customer: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            cpf: document.getElementById('checkoutCPF').value
        },
        address: {
            cep: document.getElementById('checkoutCEP').value,
            street: document.getElementById('checkoutStreet').value,
            number: document.getElementById('checkoutNumber').value,
            complement: document.getElementById('checkoutComplement').value,
            neighborhood: document.getElementById('checkoutNeighborhood').value,
            city: document.getElementById('checkoutCity').value,
            state: document.getElementById('checkoutState').value
        },
        items: cart.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            variation: item.variation
        })),
        subtotal: getSubtotal(),
        shipping: getShipping(),
        discount: getDiscount(),
        total: getTotal(),
        status: 'pending',
        payment: document.querySelector('input[name="payment"]:checked').value,
        coupon: appliedCoupon ? appliedCoupon.code : null,
        tracking: null
    };
    
    // Salva pedido
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Limpa carrinho
    clearCart();
    
    // Fecha modal
    closeCheckoutModal();
    toggleCart();
    
    // Mostra confirmação
    showOrderConfirmation(orderData);
}

/**
 * Mostra confirmação de pedido
 */
function showOrderConfirmation(order) {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
    
    document.querySelector('.checkout-modal').innerHTML = `
        <span class="close" onclick="closeCheckoutModal()">&times;</span>
        <div style="text-align: center; padding: 40px 20px;">
            <div style="width: 80px; height: 80px; background: #4CAF50; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-check" style="font-size: 40px; color: white;"></i>
            </div>
            <h2 style="color: #4CAF50; margin-bottom: 15px;">Pedido Realizado!</h2>
            <p style="font-size: 18px; color: #666; margin-bottom: 30px;">
                Número do pedido: <strong>${order.id}</strong>
            </p>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                <h3 style="margin-bottom: 15px;">Resumo do Pedido</h3>
                <div style="text-align: left;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Subtotal:</span>
                        <span>R$ ${order.subtotal.toFixed(2)}</span>
                    </div>
                    ${order.discount > 0 ? `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #4CAF50;">
                            <span>Desconto:</span>
                            <span>- R$ ${order.discount.toFixed(2)}</span>
                        </div>
                    ` : ''}
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>Frete:</span>
                        <span>${order.shipping === 0 ? 'GRÁTIS' : 'R$ ' + order.shipping.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 2px solid #ddd; font-size: 20px; font-weight: 700; color: #D4AF37;">
                        <span>Total:</span>
                        <span>R$ ${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            ${order.payment === 'pix' ? `
                <div style="background: #FFF8E1; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h4 style="margin-bottom: 15px;">Pagamento via PIX</h4>
                    <div style="width: 200px; height: 200px; background: white; margin: 0 auto 15px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-qrcode" style="font-size: 100px; color: #D4AF37;"></i>
                    </div>
                    <p style="font-size: 14px; color: #666;">Escaneie o QR Code ou copie o código PIX</p>
                    <button class="btn-primary" style="margin-top: 15px;">Copiar Código PIX</button>
                </div>
            ` : ''}
            <p style="color: #666; margin-bottom: 25px;">
                Enviamos um e-mail de confirmação para <strong>${order.customer.email}</strong>
            </p>
            <button class="btn-primary" onclick="closeCheckoutModal(); showSection('home')">
                Continuar Comprando
            </button>
            <button class="btn-secondary" onclick="closeCheckoutModal(); showOrdersModal()" style="margin-left: 10px;">
                Ver Meus Pedidos
            </button>
        </div>
    `;
}

/**
 * Busca endereço por CEP (simulação)
 */
function fetchAddress() {
    const cep = document.getElementById('checkoutCEP').value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    // Simulação - em produção, use uma API real como ViaCEP
    setTimeout(() => {
        document.getElementById('checkoutStreet').value = 'Av. Paulista';
        document.getElementById('checkoutNeighborhood').value = 'Bela Vista';
        document.getElementById('checkoutCity').value = 'São Paulo';
        document.getElementById('checkoutState').value = 'SP';
    }, 500);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Carrega carrinho ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
