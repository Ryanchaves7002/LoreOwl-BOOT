const botoes = document.querySelectorAll('.add-to-cart');

function adicionarAoCarrinho(titulo, preco){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({titulo , preco});

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Item adicionado ao carrinho!");
}
botoes.forEach((btn)=> {
    btn.addEventListener('click',() => {
        const item = btn.parentElement;
        const titulo = item.querySelector(".card-title").innerText;
        const preco = item.querySelector(".preco").innerText;
        adicionarAoCarrinho(titulo, preco);
    });

});