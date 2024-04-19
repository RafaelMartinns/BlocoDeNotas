

function fecharBloco(){
    document.getElementById("novo_bloco").style.display= "none" 
    
      

    

}

function adicionarBloco(){
    var titulo = document.getElementById("titulo_notas").value;
    var texto = document.getElementById("texto_notas").value;

    // Criar um objeto para representar a nota
    var novaNota = {
        titulo: titulo,
        texto: texto
    };

    // Verificar se já existem notas no LocalStorage
    var notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];

    // Adicionar a nova nota ao array de notas
    notasSalvas.push(novaNota);

    // Salvar o array atualizado de notas no LocalStorage
    localStorage.setItem('notas', JSON.stringify(notasSalvas));

    // Atualizar a exibição das notas na página
    atualizarListaNotas();

    // Fechar o bloco de notas
    fecharBloco();
}

// Função para atualizar a exibição das notas na página
function atualizarListaNotas() {
    var listaNotasDiv = document.getElementById("lista_notas");
    listaNotasDiv.innerHTML = "";

    var notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];

    notasSalvas.forEach(function(nota) {
        var notaDiv = document.createElement("div");
        notaDiv.className = "nota";

        var tituloNota = document.createElement("h3");
        tituloNota.textContent = nota.titulo;

        var textoNota = document.createElement("p");
        textoNota.textContent = nota.texto;

        

        var iconeExcluir = document.createElement("img");

        iconeExcluir.src = "icone-excluir.png"; 
        iconeExcluir.alt = "icone-excluir";
        iconeExcluir.className= "icone-excluir";
        iconeExcluir.addEventListener("click", function(event) {
            
            var blocoNota = event.target.parentNode;
            blocoNota.remove(); 

            
            
            notasSalvas = notasSalvas.filter(function(notaSalva) {
                return notaSalva.titulo !== nota.titulo || notaSalva.texto !== nota.texto;
            });

    
    localStorage.setItem('notas', JSON.stringify(notasSalvas));
        });
        
        notaDiv.appendChild(tituloNota);
        notaDiv.appendChild(textoNota);
        notaDiv.appendChild(iconeExcluir);
        

        

        listaNotasDiv.appendChild(notaDiv);

        
    });
}


window.onload = function() {
    atualizarListaNotas();
};

function abrirBloco(){
    document.getElementById("novo_bloco").style.display="flex"
}

