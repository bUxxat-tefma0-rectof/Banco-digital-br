/* ============================================
   BEAUTYLUX E-COMMERCE - BANCO DE DADOS
   ============================================ */

// PRODUTOS
const products = [
    {
        id: 1,
        name: "Perfume Luxury Gold",
        category: "perfumes",
        price: 289.90,
        oldPrice: 349.90,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop"
        ],
        description: "Fragrância sofisticada com notas amadeiradas e florais. Longa duração de até 12 horas.",
        rating: 4.8,
        reviews: 234,
        badge: "promo",
        stock: 45,
        featured: true,
        variations: [
            { size: "30ml", price: 189.90 },
            { size: "50ml", price: 289.90 },
            { size: "100ml", price: 399.90 }
        ]
    },
    {
        id: 2,
        name: "Base Matte HD",
        category: "maquiagem",
        price: 79.90,
        oldPrice: 99.90,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
        ],
        description: "Base de alta cobertura com acabamento matte. Ideal para todos os tipos de pele.",
        rating: 4.9,
        reviews: 567,
        badge: "promo",
        stock: 120,
        featured: true,
        variations: [
            { color: "Bege Claro", code: "#F5D5B8" },
            { color: "Bege Médio", code: "#E8C4A0" },
            { color: "Bege Escuro", code: "#C68B59" }
        ]
    },
    {
        id: 3,
        name: "Sérum Vitamina C Premium",
        category: "skincare",
        price: 149.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop"
        ],
        description: "Sérum anti-idade com 20% de vitamina C pura. Ilumina e uniformiza o tom da pele.",
        rating: 4.7,
        reviews: 189,
        badge: "new",
        stock: 78,
        featured: true,
        variations: [
            { size: "30ml", price: 149.90 },
            { size: "60ml", price: 249.90 }
        ]
    },
    {
        id: 4,
        name: "Hidratante Corporal Luxo",
        category: "corpo",
        price: 69.90,
        oldPrice: 89.90,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop"
        ],
        description: "Hidratação intensa por 24 horas. Textura leve e rápida absorção.",
        rating: 4.6,
        reviews: 423,
        badge: "promo",
        stock: 200,
        featured: false,
        variations: [
            { size: "200ml", price: 69.90 },
            { size: "400ml", price: 119.90 }
        ]
    },
    {
        id: 5,
        name: "Batom Matte Luxe",
        category: "maquiagem",
        price: 49.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"
        ],
        description: "Batom matte de longa duração. Fórmula enriquecida com vitamina E.",
        rating: 4.8,
        reviews: 891,
        badge: null,
        stock: 350,
        featured: true,
        variations: [
            { color: "Nude Rosé", code: "#C98986" },
            { color: "Vermelho Clássico", code: "#B91C1C" },
            { color: "Rosa Coral", code: "#F472B6" }
        ]
    },
    {
        id: 6,
        name: "Perfume Floral Dreams",
        category: "perfumes",
        price: 199.90,
        oldPrice: 259.90,
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&h=400&fit=crop"
        ],
        description: "Fragrância delicada com notas de flores brancas e frutas cítricas.",
        rating: 4.5,
        reviews: 156,
        badge: "promo",
        stock: 67,
        featured: true,
        variations: [
            { size: "50ml", price: 199.90 },
            { size: "100ml", price: 329.90 }
        ]
    },
    {
        id: 7,
        name: "Creme Anti-Idade Noturno",
        category: "skincare",
        price: 189.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4a2b2e2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1570194065650-d99fb4a2b2e2?w=400&h=400&fit=crop"
        ],
        description: "Creme noturno com retinol e ácido hialurônico. Reduz linhas de expressão.",
        rating: 4.9,
        reviews: 278,
        badge: "new",
        stock: 95,
        featured: false,
        variations: [
            { size: "50ml", price: 189.90 }
        ]
    },
    {
        id: 8,
        name: "Kit Sabonetes Premium",
        category: "corpo",
        price: 89.90,
        oldPrice: 129.90,
        image: "https://images.unsplash.com/photo-1600857062241-98e5e6bc1029?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600857062241-98e5e6bc1029?w=400&h=400&fit=crop"
        ],
        description: "Kit com 3 sabonetes artesanais de lavanda, rosas e aloe vera.",
        rating: 4.7,
        reviews: 445,
        badge: "promo",
        stock: 180,
        featured: false,
        variations: [
            { type: "Kit 3 unidades", price: 89.90 },
            { type: "Kit 6 unidades", price: 159.90 }
        ]
    },
    {
        id: 9,
        name: "Máscara Facial Detox",
        category: "skincare",
        price: 59.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop"
        ],
        description: "Máscara de argila verde que purifica e revitaliza a pele.",
        rating: 4.6,
        reviews: 312,
        badge: null,
        stock: 145,
        featured: true,
        variations: [
            { size: "50g", price: 59.90 },
            { size: "100g", price: 99.90 }
        ]
    },
    {
        id: 10,
        name: "Paleta de Sombras Glamour",
        category: "maquiagem",
        price: 129.90,
        oldPrice: 179.90,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop"
        ],
        description: "Paleta com 12 cores matte e metálicas. Alta pigmentação.",
        rating: 4.8,
        reviews: 623,
        badge: "promo",
        stock: 88,
        featured: true,
        variations: [
            { type: "Tons Neutros", price: 129.90 },
            { type: "Tons Vibrantes", price: 129.90 }
        ]
    },
    {
        id: 11,
        name: "Óleo Corporal Dourado",
        category: "corpo",
        price: 79.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop"
        ],
        description: "Óleo multifuncional com brilho dourado. Para corpo e cabelo.",
        rating: 4.5,
        reviews: 201,
        badge: "new",
        stock: 112,
        featured: false,
        variations: [
            { size: "100ml", price: 79.90 },
            { size: "200ml", price: 139.90 }
        ]
    },
    {
        id: 12,
        name: "Perfume Intense Black",
        category: "perfumes",
        price: 319.90,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop"
        ],
        description: "Fragrância masculina intensa com notas de especiarias e couro.",
        rating: 4.9,
        reviews: 387,
        badge: null,
        stock: 54,
        featured: true,
        variations: [
            { size: "50ml", price: 219.90 },
            { size: "100ml", price: 319.90 }
        ]
    }
];

// AVALIAÇÕES (exemplos)
const reviews = {
    1: [
        {
            name: "Maria Silva",
            rating: 5,
            date: "2024-01-15",
            comment: "Perfume maravilhoso! Muito sofisticado e duradouro."
        },
        {
            name: "João Santos",
            rating: 4,
            date: "2024-01-10",
            comment: "Ótima fragrância, mas poderia ser um pouco mais em conta."
        },
        {
            name: "Ana Paula",
            rating: 5,
            date: "2024-01-05",
            comment: "Amei! Recebi vários elogios."
        }
    ],
    2: [
        {
            name: "Carla Mendes",
            rating: 5,
            date: "2024-01-20",
            comment: "Melhor base que já usei! Cobertura perfeita."
        },
        {
            name: "Juliana Costa",
            rating: 5,
            date: "2024-01-18",
            comment: "Acabamento impecável e dura o dia todo."
        }
    ]
};

// CUPONS DE DESCONTO
const coupons = [
    {
        code: "BEMVINDO10",
        discount: 10,
        type: "percent",
        minValue: 0,
        active: true,
        description: "10% de desconto para primeira compra"
    },
    {
        code: "FRETEGRATIS",
        discount: 0,
        type: "shipping",
        minValue: 150,
        active: true,
        description: "Frete grátis em compras acima de R$ 150"
    },
    {
        code: "SUPER20",
        discount: 20,
        type: "percent",
        minValue: 200,
        active: true,
        description: "20% de desconto em compras acima de R$ 200"
    },
    {
        code: "50OFF",
        discount: 50,
        type: "fixed",
        minValue: 100,
        active: true,
        description: "R$ 50 de desconto em compras acima de R$ 100"
    }
];

// BANNERS DO CARROSSEL (gerenciáveis pelo admin)
const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&h=500&fit=crop",
        title: "Novidades da Temporada",
        subtitle: "Descubra os melhores produtos para você",
        button: "Comprar Agora",
        link: "#produtos",
        active: true,
        order: 1
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1631214540242-e2c2e1aae133?w=1200&h=500&fit=crop",
        title: "Até 50% OFF",
        subtitle: "Produtos selecionados em promoção",
        button: "Ver Ofertas",
        link: "#promocoes",
        active: true,
        order: 2
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=500&fit=crop",
        title: "Frete Grátis",
        subtitle: "Em compras acima de R$ 199",
        button: "Aproveitar",
        link: "#produtos",
        active: true,
        order: 3
    }
];

// CONFIGURAÇÕES DE FRETE
const shippingConfig = {
    freeShippingMinValue: 199,
    rates: [
        { name: "PAC", days: "10-15 dias", price: 15.90 },
        { name: "SEDEX", days: "5-7 dias", price: 29.90 },
        { name: "Transportadora", days: "3-5 dias", price: 39.90 }
    ]
};

// PEDIDOS (simulação)
let orders = [
    {
        id: "PED001",
        date: "2024-02-01",
        customer: {
            name: "Maria Silva",
            email: "maria@email.com",
            phone: "(11) 98765-4321"
        },
        items: [
            { productId: 1, quantity: 1, price: 289.90 },
            { productId: 3, quantity: 1, price: 149.90 }
        ],
        subtotal: 439.80,
        shipping: 15.90,
        discount: 0,
        total: 455.70,
        status: "pending",
        payment: "pix",
        tracking: null
    }
];

// STATUS DE PEDIDOS
const orderStatus = {
    pending: { label: "Aguardando Pagamento", color: "#FFA500" },
    paid: { label: "Pagamento Confirmado", color: "#4CAF50" },
    processing: { label: "Em Preparação", color: "#2196F3" },
    shipped: { label: "Enviado", color: "#9C27B0" },
    delivered: { label: "Entregue", color: "#4CAF50" },
    cancelled: { label: "Cancelado", color: "#F44336" }
};

// CLIENTES (simulação)
let customers = [
    {
        id: 1,
        name: "Maria Silva",
        email: "maria@email.com",
        phone: "(11) 98765-4321",
        cpf: "123.456.789-00",
        birthdate: "1990-05-15",
        registered: "2024-01-10",
        totalOrders: 5,
        totalSpent: 1289.90
    }
];

// CONFIGURAÇÕES DO SISTEMA
const siteConfig = {
    siteName: "BeautyLux",
    tagline: "Beleza Premium",
    logo: null,
    primaryColor: "#D4AF37",
    accentColor: "#FF69B4",
    email: "contato@beautylux.com.br",
    phone: "(11) 3000-0000",
    whatsapp: "(11) 99999-9999",
    instagram: "@beautylux",
    facebook: "beautylux",
    address: {
        street: "Av. Paulista, 1000",
        city: "São Paulo",
        state: "SP",
        zip: "01310-100"
    }
};

// EXPORTAR DADOS (para uso em outros arquivos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        reviews,
        coupons,
        banners,
        shippingConfig,
        orders,
        orderStatus,
        customers,
        siteConfig
    };
}
