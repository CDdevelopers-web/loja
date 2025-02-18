// Produtos em promoção
const promoProducts = [
    {
        id: 201,
        name: 'Camiseta Básica',
        originalPrice: 79.90,
        price: 49.90,
        image: 'images/camiseta-basica.jpg',
        description: 'Camiseta básica em algodão',
        category: 'camisetas',
        discount: 38
    },
    {
        id: 202,
        name: 'Calça Jeans Skinny',
        originalPrice: 199.90,
        price: 129.90,
        image: 'images/calca-jeans.jpg',
        description: 'Calça jeans skinny destroyed',
        category: 'calcas',
        discount: 35
    },
    {
        id: 203,
        name: 'Vestido Midi',
        originalPrice: 259.90,
        price: 159.90,
        image: 'images/vestido-midi.jpg',
        description: 'Vestido midi elegante',
        category: 'vestidos',
        discount: 38
    }
];

// Countdown Timer
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 3); // 3 dias a partir de hoje

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('#days').text(String(days).padStart(2, '0'));
    $('#hours').text(String(hours).padStart(2, '0'));
    $('#minutes').text(String(minutes).padStart(2, '0'));
    $('#seconds').text(String(seconds).padStart(2, '0'));

    if (distance < 0) {
        clearInterval(countdownTimer);
        $('.countdown-timer').html('<h3>Promoção Encerrada!</h3>');
    }
}

// Carregar produtos em promoção
const loadPromoProducts = (category = 'all') => {
    const productsContainer = $('.products-container');
    productsContainer.empty();

    const filteredProducts = category === 'all' 
        ? promoProducts 
        : promoProducts.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card product-card fade-in">
                    <div class="discount-badge">-${product.discount}%</div>
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="product-price">
                            <span class="original-price">${formatPrice(product.originalPrice)}</span>
                            ${formatPrice(product.price)}
                        </p>
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

// Filter products
$('[data-filter]').click(function() {
    const category = $(this).data('filter');
    $('[data-filter]').removeClass('active');
    $(this).addClass('active');
    loadPromoProducts(category);
});

// Copy coupon
$('.copy-coupon').click(function() {
    const coupon = $(this).data('coupon');
    navigator.clipboard.writeText(coupon).then(() => {
        alert('Cupom copiado com sucesso!');
    });
});

// Initialize
$(document).ready(function() {
    loadPromoProducts();
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
});
