// Função que abre a página do livro usando URL
function openBookPage(titulo, preco, author, img) {
    const url = `./páginas/livro.html?title=${encodeURIComponent(titulo)}&price=${encodeURIComponent(preco)}&auzthor=${encodeURIComponent(author)}&img=${encodeURIComponent(img)}`;
    window.location.href = url;
}

// Se você quiser, ainda pode usar localStorage como fallback:
const livros = document.querySelectorAll(".livro");
livros.forEach(livro => {
    livro.addEventListener("click", () => {
        const titulo = livro.querySelector(".titulo").textContent;
        const descricao = livro.querySelector(".descricao").textContent;
        const author = livro.querySelector(".author")?.textContent || "Autor desconhecido";
        const preco = livro.querySelector(".preco")?.textContent || "0.00";
        const img = livro.querySelector("img").getAttribute("src");

        // salva no localStorage (opcional, caso queira usar)
        localStorage.setItem("livroSelecionado", JSON.stringify({ titulo, descricao, author, preco, img }));

        // redireciona usando a função
        openBookPage(titulo, preco, author, img);
    });
});
