

function fecharBloco(){
    document.getElementById("novo_bloco").style.display= "none" 
    document.getElementById("editar_bloco").style.display= "none" 
    form_editar.removeChild(botao_salvar)  

    

}

function adicionarBloco(){
    var titulo = document.getElementById("titulo_notas").value;
    var texto = document.getElementById("texto_notas").value;
 
    var novaNota = {
        titulo: titulo,
        texto: texto
    };
   
    var notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];

    
    notasSalvas.push(novaNota);

    
    localStorage.setItem('notas', JSON.stringify(notasSalvas));

    
    atualizarListaNotas();

    
    fecharBloco();
}


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

        notaDiv.innerHTML=" <img src='editar.png' alt='editar' class= 'editar'>"

        var editar = notaDiv.querySelector('.editar')
   
        
        editar.addEventListener("click", function() {
          
            

            var bloco = this.parentNode;
        
            
            var titulo = bloco.querySelector("h3");
            var paragrafo = bloco.querySelector("p");
        
            document.getElementById("titulo_notas_editar").value = titulo.textContent;
            document.getElementById("texto_notas_editar").value = paragrafo.textContent;
        
            document.getElementById("editar_bloco").style.display = "flex";
            var form_editar=document.getElementById("form_editar");
            
            var botao_salvar = document.createElement("button");
            botao_salvar.className = "botao_salvar";
            botao_salvar.type = "reset"
            botao_salvar.textContent = "Salvar"
            botao_salvar.id="botao_salvar"

            form_editar.appendChild(botao_salvar);

            
            
            var salvarAnonimo = function(){
                salvar(titulo,paragrafo)
                console.log("foi")
                
            }

            

            botao_salvar.addEventListener("click",salvarAnonimo)
            
            

            

            

        });

        
        

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
    function salvar(titulo,paragrafo){
    
        
         var notasSalvas = JSON.parse(localStorage.getItem('notas')) || [];

     
        var index = notasSalvas.findIndex(function(notaSalva) {
            return notaSalva.titulo === titulo.textContent && notaSalva.texto === paragrafo.textContent;
        });
                          
        titulo.textContent=document.getElementById("titulo_notas_editar").value
        paragrafo.textContent=document.getElementById("texto_notas_editar").value
        document.getElementById("editar_bloco").style.display="none";
        form_editar.removeChild(botao_salvar)
        
    

    

    if (index !== -1) {
        notasSalvas[index].titulo = titulo.textContent;
        notasSalvas[index].texto = paragrafo.textContent;

        
        localStorage.setItem('notas', JSON.stringify(notasSalvas));
    }
        
    }

    




window.onload = function() {
    atualizarListaNotas();
};

function abrirBloco(){
    document.getElementById("novo_bloco").style.display="flex"
}



