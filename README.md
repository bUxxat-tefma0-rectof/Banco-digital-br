# 🛍️ BeautyLux E-commerce - Sistema Completo

## 📋 Sobre o Projeto

Sistema completo de e-commerce de cosméticos premium, estilo Boticário, com frontend moderno e animado, painel administrativo completo e integração com sistemas de pagamento.

## ✨ Funcionalidades

### 👥 ÁREA DO CLIENTE

- **Página Inicial**
  - Carrossel animado de banners promocionais
  - Produtos em destaque
  - Categorias de produtos
  - Produtos em promoção

- **Catálogo de Produtos**
  - Vitrine com todos os produtos
  - Sistema de busca inteligente
  - Filtros avançados (categoria, preço, ordenação)
  - Modal de produto com galeria de imagens
  - Sistema de avaliações
  - Variações de produto (tamanhos, cores)

- **Carrinho de Compras**
  - Carrinho lateral deslizante
  - Adicionar/remover produtos
  - Alterar quantidades
  - Aplicação de cupons de desconto
  - Cálculo automático de frete
  - Frete grátis acima de R$ 199

- **Checkout**
  - 3 passos: Dados pessoais, Endereço, Pagamento
  - Busca automática de endereço por CEP
  - Múltiplas formas de pagamento:
    - PIX (com QR Code)
    - Cartão de Crédito
    - Mercado Pago
  - Confirmação de pedido
  - Envio de e-mail confirmação

- **Área do Cliente**
  - Login/Cadastro
  - Histórico de pedidos
  - Rastreamento de entregas
  - Lista de favoritos

### 🔧 PAINEL ADMINISTRATIVO

- **Dashboard**
  - Estatísticas de vendas
  - Gráficos e indicadores
  - Pedidos recentes
  - Produtos mais vendidos

- **Gerenciamento de Produtos**
  - Cadastro completo de produtos
  - Upload de múltiplas imagens
  - Variações (tamanhos, cores, etc)
  - Controle de estoque
  - Categorização
  - Badge (Promoção/Novo)
  - Produtos em destaque

- **Gerenciamento de Pedidos**
  - Visualização completa de pedidos
  - Filtros por status
  - Atualização de status
  - Código de rastreio
  - Impressão de pedidos
  - Dados completos do cliente

- **Gerenciamento de Clientes**
  - Lista de clientes cadastrados
  - Histórico de compras
  - Total gasto por cliente
  - Exportação de dados

- **Sistema de Cupons**
  - Criação de cupons de desconto
  - Tipos: Percentual, Valor fixo, Frete grátis
  - Valor mínimo de compra
  - Ativação/desativação

- **Gerenciamento de Banners**
  - Cadastro de banners do carrossel
  - Upload de imagens
  - Textos e botões
  - Ordenação
  - Ativação/desativação

- **Relatório Financeiro**
  - Receita total
  - Ticket médio
  - Taxa de conversão
  - Vendas por categoria
  - Período personalizável

- **Configurações**
  - Informações da loja
  - Configurações de frete
  - Dados de contato
  - Redes sociais

## 🚀 Como Usar no Koder (App Store)

### 1. Estrutura de Pastas

Crie a seguinte estrutura no seu projeto Koder:

```
beautylux/
├── index.html          (Página principal da loja)
├── admin.html          (Painel administrativo)
├── css/
│   ├── style.css       (Estilos da loja)
│   └── admin.css       (Estilos do admin)
└── js/
    ├── data.js         (Banco de dados)
    ├── main.js         (JavaScript principal)
    ├── cart.js         (Sistema de carrinho)
    └── admin.js        (JavaScript do admin)
```

### 2. Copiar os Arquivos

1. Crie cada arquivo no Koder
2. Copie o conteúdo de cada arquivo fornecido
3. Salve todos os arquivos

### 3. Acessar a Loja

- Abra o arquivo `index.html` no navegador
- A loja estará funcionando completamente

### 4. Acessar o Admin

- Abra o arquivo `admin.html` no navegador
- Painel administrativo completo funcionando

## 📦 Banco de Dados

O sistema utiliza um "banco de dados" em JavaScript (arquivo `data.js`) que contém:

- **12 produtos** pré-cadastrados com imagens reais
- **Categorias**: Perfumes, Maquiagem, Skincare, Corpo & Banho
- **4 cupons** de desconto prontos para usar
- **3 banners** para o carrossel
- **Configurações** de frete
- **Estrutura** de pedidos e clientes

### Cupons Disponíveis:

| Código | Desconto | Condição |
|--------|----------|----------|
| BEMVINDO10 | 10% | Sem valor mínimo |
| FRETEGRATIS | Frete grátis | Acima de R$ 150 |
| SUPER20 | 20% | Acima de R$ 200 |
| 50OFF | R$ 50 | Acima de R$ 100 |

## 🎨 Personalização

### Cores

Edite as variáveis CSS no arquivo `style.css`:

```css
:root {
    --primary: #D4AF37;        /* Cor principal (dourado) */
    --primary-dark: #B8941F;   /* Cor principal escura */
    --accent: #FF69B4;         /* Cor de destaque (rosa) */
    --bg-light: #F8F8F8;       /* Fundo claro */
    --bg-white: #FFFFFF;       /* Fundo branco */
}
```

### Informações da Loja

Edite o objeto `siteConfig` no arquivo `data.js`:

```javascript
const siteConfig = {
    siteName: "BeautyLux",
    tagline: "Beleza Premium",
    email: "contato@beautylux.com.br",
    phone: "(11) 3000-0000",
    whatsapp: "(11) 99999-9999",
    // ...
};
```

### Adicionar Produtos

No arquivo `data.js`, adicione novos produtos ao array `products`:

```javascript
{
    id: 13,
    name: "Nome do Produto",
    category: "perfumes", // ou maquiagem, skincare, corpo
    price: 99.90,
    oldPrice: 129.90, // opcional
    image: "URL_DA_IMAGEM",
    images: ["URL1", "URL2"], // múltiplas imagens
    description: "Descrição do produto",
    rating: 4.5,
    reviews: 100,
    badge: "promo", // ou "new", ou null
    stock: 50,
    featured: true, // ou false
    variations: [
        { size: "50ml", price: 99.90 },
        { size: "100ml", price: 149.90 }
    ]
}
```

## 💳 Integração de Pagamentos

### PIX

O sistema gera um QR Code simulado. Para integração real:

1. Obtenha credenciais da API do seu banco
2. No arquivo `cart.js`, função `finishOrder()`, adicione:

```javascript
// Chamada à API do banco para gerar PIX
const pixResponse = await fetch('API_DO_BANCO/pix', {
    method: 'POST',
    body: JSON.stringify({
        valor: total,
        chave: 'SUA_CHAVE_PIX'
    })
});
```

### Cartão de Crédito

Para integração real com gateway de pagamento:

```javascript
// Exemplo com API de pagamento
const paymentResponse = await fetch('API_GATEWAY/charge', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer TOKEN' },
    body: JSON.stringify({
        cardNumber: cardNumber,
        amount: total
    })
});
```

### Mercado Pago

1. Cadastre-se no Mercado Pago Developers
2. Obtenha suas credenciais (Public Key e Access Token)
3. Adicione o SDK:

```html
<script src="https://sdk.mercadopago.com/js/v2"></script>
```

4. Configure o checkout:

```javascript
const mp = new MercadoPago('PUBLIC_KEY');
const checkout = mp.checkout({
    preference: {
        items: cartItems,
        payer: {
            email: customerEmail
        }
    }
});
```

## 📮 Integração de Frete

### Correios (Simulação)

O sistema já calcula frete automaticamente:

- **PAC**: R$ 15,90 (10-15 dias)
- **SEDEX**: R$ 29,90 (5-7 dias)
- **Transportadora**: R$ 39,90 (3-5 dias)
- **Grátis**: Acima de R$ 199

### API dos Correios (Real)

Para cálculo real de frete:

```javascript
async function calculateShipping(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const address = await response.json();
    
    // Calcular frete com API dos Correios
    // Ou usar serviço como Melhor Envio, Kangu, etc.
}
```

## 📧 E-mails Transacionais

Para enviar e-mails de confirmação:

### Usando EmailJS (Gratuito)

1. Cadastre-se em [EmailJS](https://www.emailjs.com/)
2. Configure um template de e-mail
3. Adicione o código:

```javascript
emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
    to_email: customerEmail,
    order_id: orderId,
    total: orderTotal
});
```

## 📊 Analytics

Para adicionar Google Analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU_GA_ID');
</script>
```

## 🔒 Segurança

### Dicas importantes:

1. **Nunca** exponha chaves de API no frontend
2. Use HTTPS em produção
3. Valide dados no backend
4. Implemente rate limiting
5. Use tokens JWT para autenticação
6. Criptografe senhas com bcrypt
7. Proteja contra SQL Injection e XSS

## 🌐 Deploy

### GitHub Pages (Gratuito)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará em: `https://seuusuario.github.io/beautylux`

### Netlify (Gratuito)

1. Arraste a pasta do projeto para [Netlify Drop](https://app.netlify.com/drop)
2. Pronto! Site no ar em segundos

### Vercel (Gratuito)

1. Instale o Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Smartphones
- 📱 Tablets
- 💻 Desktops
- 🖥️ Monitores grandes

## 🎯 Próximos Passos

Para tornar o sistema ainda mais completo:

1. **Backend Real**
   - Node.js + Express
   - MongoDB ou PostgreSQL
   - API RESTful

2. **Autenticação**
   - JWT
   - OAuth (Google, Facebook)
   - Recuperação de senha

3. **Notificações**
   - E-mail marketing
   - Push notifications
   - WhatsApp Business API

4. **SEO**
   - Meta tags dinâmicas
   - Sitemap XML
   - Schema.org markup

5. **Performance**
   - Lazy loading de imagens
   - CDN para assets
   - Service Workers (PWA)

## 🤝 Suporte

Para dúvidas ou sugestões:
- 📧 E-mail: contato@beautylux.com.br
- 💬 WhatsApp: (11) 99999-9999

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ por BeautyLux**

*Transformando beleza em experiência digital*
