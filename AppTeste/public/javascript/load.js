function preencherHeader() {
    var header = document.querySelector('header');
    
    if (header) {
        var htmlPadrao = ``;
        header.innerHTML = htmlPadrao;
    } else {
        console.log("Elemento <header> não encontrado.");
    }
}

window.onload = preencherHeader;