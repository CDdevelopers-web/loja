// Produtos novos
const newProducts = [
    {
        id: 101,
        name: 'Vestido Floral Verão',
        price: 179.90,
        image: 'images/vestido-floral.jpg',
        description: 'Vestido floral perfeito para o verão',
        isNew: true
    },
    {
        id: 102,
        name: 'Blusa Cropped',
        price: 89.90,
        image: 'images/blusa-cropped.jpg',
        description: 'Blusa cropped tendência da estação',
        isNew: true
    },
    {
        id: 103,
        name: 'Shorts Jeans',
        price: 129.90,
        image: 'images/shorts-jeans.jpg',
        description: 'Shorts jeans destroyed',
        isNew: true
    }
];

// Carregar produtos novos
const loadNewProducts = () => {
    const productsContainer = $('.products-container');
    productsContainer.empty();

    newProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="card product-card fade-in">
                    <div class="new-badge">Novo</div>
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

// Newsletter subscription
$('.newsletter-form').submit(function(e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();
    alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
    $(this).find('input[type="email"]').val('');
});

// Initialize
$(document).ready(function() {
    loadNewProducts();
});
