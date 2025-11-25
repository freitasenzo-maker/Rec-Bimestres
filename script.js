// Selecionando elementos
const input = document.getElementById("item-input");
const btnAdd = document.getElementById("btn-add");
const lista = document.getElementById("lista");

// Carregar itens do localStorage ao iniciar
let itens = JSON.parse(localStorage.getItem("listaItens")) || [];

// Atualiza a tela
function exibirLista() {
    lista.innerHTML = ""; // limpar lista

    itens.forEach((item, index) => {
        const li = document.createElement("li");

        // Se estiver marcado como comprado, adiciona classe
        if (item.comprado) {
            li.classList.add("comprado");
        }

        li.textContent = item.nome;

        // Clicar no item para marcar/desmarcar como comprado
        li.addEventListener("click", () => {
            item.comprado = !item.comprado;
            salvar();
            exibirLista();
        });

        // Criar botão de remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "X";
        btnRemover.classList.add("remover");

        btnRemover.addEventListener("click", (e) => {
            e.stopPropagation(); // impede o clique no li
            itens.splice(index, 1);
            salvar();
            exibirLista();
        });

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

// Salvar lista no localStorage
function salvar() {
    localStorage.setItem("listaItens", JSON.stringify(itens));
}

// Adicionar item
btnAdd.addEventListener("click", () => {
    const nomeItem = input.value.trim();

    if (nomeItem === "") return;

    itens.push({ nome: nomeItem, comprado: false });
    salvar();
    exibirLista();
    input.value = "";
});

// Enter também adiciona
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnAdd.click();
});

// Exibir lista ao abrir
exibirLista();
