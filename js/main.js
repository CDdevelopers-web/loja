// Produtos exemplo
const products = [
    {
        id: 1,
        name: 'Camiseta Básica',
        price: 49.90,
        image: 'images/camiseta.jpg',
        description: 'Camiseta básica em algodão'
    },
    {
        id: 2,
        name: 'Calça Jeans',
        price: 159.90,
        image: 'images/calca.jpg',
        description: 'Calça jeans slim fit'
    },
    {
        id: 3,
        name: 'Vestido Floral',
        price: 129.90,
        image: 'images/vestido.jpg',
        description: 'Vestido floral de verão'
    },
    // Adicione mais produtos conforme necessário
];

// Carrinho de compras
let cart = [];

// Função para formatar preço
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};

// Carregar produtos
const loadProducts = () => {
    const productsContainer = $('.products-container');
    productsContainer.empty();

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6">
                <div class="card product-card fade-in">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="product-price">${formatPrice(product.price)}</p>
                        <button class="btn btn-dark add-to-cart" data-id="${product.id}">
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.append(productCard);
    });
};

// Atualizar carrinho
const updateCart = () => {
    const cartItems = $('.cart-items');
    const cartCount = $('.cart-count');
    const totalAmount = $('.total-amount');
    
    cartItems.empty();
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h6 class="cart-item-title">${item.name}</h6>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItems.append(cartItem);
    });

    cartCount.text(cart.reduce((acc, item) => acc + item.quantity, 0));
    totalAmount.text(formatPrice(total).replace('R$', ''));
};

// Adicionar ao carrinho
$(document).on('click', '.add-to-cart', function() {
    const productId = $(this).data('id');
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
    $('#cartModal').modal('show');
});

// Aumentar quantidade
$(document).on('click', '.increase-quantity', function() {
    const productId = $(this).data('id');
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
});

// Diminuir quantidade
$(document).on('click', '.decrease-quantity', function() {
    const productId = $(this).data('id');
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
});

// Checkout
$('.checkout-btn').click(function() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    $('#cartModal').modal('hide');
    $('#checkoutModal').modal('show');
});

// Finalizar no WhatsApp
$('#whatsappCheckout').click(function() {
    const form = $('#checkoutForm')[0];
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = $('#name').val();
    const email = $('#email').val();
    const address = $('#address').val();
    const payment = $('#payment').val();

    let message = `*Novo Pedido*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Email:* ${email}\n`;
    message += `*Endereço:* ${address}\n`;
    message += `*Forma de Pagamento:* ${payment}\n\n`;
    message += `*Pedido:*\n`;
    
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total:* ${formatPrice(total)}`;

    // Número do WhatsApp da loja (substitua pelo número real)
    const phoneNumber = '5511999999999';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho após enviar
    cart = [];
    updateCart();
    $('#checkoutModal').modal('hide');
});

// Inicializar
$(document).ready(function() {
    loadProducts();
});
