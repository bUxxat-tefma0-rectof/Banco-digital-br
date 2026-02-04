function login(){
  if(document.getElementById("senha").value === "admin123"){
    document.getElementById("painel").style.display = "block";
  } else {
    alert("Senha errada");
  }
}

function salvarSobre(){
  localStorage.setItem("sobre", document.getElementById("sobre").value);
  alert("Salvo!");
}

function addProduto(){
  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  produtos.push({
    nome: nome.value,
    tipo: tipo.value,
    desc: desc.value
  });
  localStorage.setItem("produtos", JSON.stringify(produtos));
  alert("Produto adicionado");
}
