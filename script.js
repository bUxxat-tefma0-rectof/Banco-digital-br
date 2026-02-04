let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  { nome:"Perfume Doce", tipo:"doce", desc:"Aroma suave" },
  { nome:"Perfume Amadeirado", tipo:"amadeirado", desc:"Aroma intenso" }
];

function render(lista){
  const div = document.getElementById("produtos");
  div.innerHTML = "";
  lista.forEach(p => {
    div.innerHTML += `
      <div class="produto">
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <button>Comprar</button>
      </div>`;
  });
}

function filtrar(tipo){
  render(produtos.filter(p => p.tipo === tipo));
}

render(produtos);

document.getElementById("sobreTexto").innerText =
  localStorage.getItem("sobre") || "Somos uma loja especializada em perfumes.";
