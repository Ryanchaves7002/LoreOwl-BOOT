// Função que abre a página do livro usando URL
function openBookPage(titulo, preco, author, img, publisher, year, description) {
    const url = `./páginas/livro.html?title=${encodeURIComponent(titulo)}&price=${encodeURIComponent(preco)}&author=${encodeURIComponent(author)}&img=${encodeURIComponent(img)}&publisher=${encodeURIComponent(publisher)}&year=${encodeURIComponent(year)}&description=${encodeURIComponent(description)}`;
    window.location.href = url;
}

// Se você quiser, ainda pode usar localStorage como fallback:
const livros = document.querySelectorAll(".livro");
livros.forEach(livro => {
    livro.addEventListener("click", () => {
        const titulo = livro.querySelector(".titulo").textContent;
        const author = livro.querySelector(".author")?.textContent || "Autor desconhecido";
        const preco = livro.querySelector(".preco")?.textContent || "0.00";
        const img = livro.querySelector("img").getAttribute("src");
        const publisher = livro.querySelector(".publisher")?.textContent || "Editora desconhecida";
        const year = livro.querySelector(".year")?.textContent || "Ano desconhecido";
        const description = livro.querySelector(".description")?.textContent || "Descrição não disponível";
        // salva no localStorage (opcional, caso queira usar)
        localStorage.setItem("livroSelecionado", JSON.stringify({ titulo, author, preco, img, publisher, year, description }));

        // redireciona usando a função
        openBookPage(titulo, preco, author, img, publisher, year, description);
    });
});
