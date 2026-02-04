let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  {
    nome: "Perfume Doce",
    tipo: "doce",
    desc: "Aroma suave e marcante",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231692"
  },
  {
    nome: "Perfume Amadeirado",
    tipo: "amadeirado",
    desc: "Elegante e intenso",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
  },
  {
    nome: "Perfume Cítrico",
    tipo: "citrico",
    desc: "Refrescante e leve",
    img: "https://images.unsplash.com/photo-1600180758890-6b94519b196b"
  }
];

function render(lista) {
  const div = document.getElementById("produtos");
  div.innerHTML = "";

  lista.forEach(p => {
    div.innerHTML += `
      <div class="produto">
        <img src="${p.img}">
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <button>Comprar</button>
      </div>
    `;
  });
}

function filtrar(tipo) {
  render(produtos.filter(p => p.tipo === tipo));
}

render(produtos);

document.getElementById("sobreTexto").innerText =
  localStorage.getItem("sobre") ||
  "Somos uma loja especializada em perfumes de alto padrão.";
const banners = [
  "https://images.unsplash.com/photo-1612198264509-6c1f49e3f9a4",
  "https://images.unsplash.com/photo-1585386959984-a41552231692",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
];

let bannerIndex = 0;
const bannerImg = document.getElementById("bannerImg");

setInterval(() => {
  bannerIndex = (bannerIndex + 1) % banners.length;
  bannerImg.src = banners[bannerIndex];
}, 3000);
