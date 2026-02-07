// Aguarda a página carregar totalmente
document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema carregado e pronto.");

    // --- 1. LÓGICA DE LOGIN ---
    const btnEntrar = document.getElementById('btnEntrar');
    if (btnEntrar) {
        btnEntrar.onclick = function() {
            const resp = document.getElementById('respInput').value.trim();
            const unid = document.getElementById('unidadeInput').value.trim();

            if (resp === "" || unid === "") {
                alert("Preencha todos os campos!");
                return;
            }

            localStorage.setItem("usuarioAtivo", resp);
            localStorage.setItem("unidadeAtiva", unid);
            window.location.href = "usuarioLogado.html";
        };
    }

    // --- 2. LÓGICA DE BOAS VINDAS (Página Relatório) ---
    const nomeFixo = document.getElementById('nomeFixo');
    const unidadeFixa = document.getElementById('unidadeFixa');

    if (nomeFixo && unidadeFixa) {
        nomeFixo.textContent = localStorage.getItem("usuarioAtivo") || "---";
        unidadeFixa.textContent = localStorage.getItem("unidadeAtiva") || "---";
    }
});

// --- 3. LÓGICA DE ADICIONAR ITEM (Unificada) ---
// Esta função é chamada pelo botão "Adicionar" no seu HTML
function adicionarNota() {
    const cod = document.getElementById('inputCodigo').value.trim();
    const prod = document.getElementById('inputProduto').value.trim();
    const tam = document.getElementById('inputTamanho').value.trim();
    const forn = document.getElementById('inputFornecedor').value.trim();
    
    // Captura qual opção foi marcada (Leve, Média ou Pesada)
    // Importante: no HTML o name dos radios deve ser "manut"
    const radioMarcado = document.querySelector('input[name="manut"]:checked');
    const valorManutencao = radioMarcado ? radioMarcado.value : "Não informada";

    if (cod === "" || prod === "") {
        alert("Código e Produto são obrigatórios!");
        return;
    }

    const lista = document.getElementById('lista-anotacoes');
    
    // Cria o elemento da nota
    const item = document.createElement('div');
    item.className = 'item-nota'; // Usa o estilo que definimos no CSS
    
    // Escreve na lista as informações + a manutenção por escrito
    item.innerHTML = `
        <p><strong>ITEM:</strong> ${prod.toUpperCase()} (Cód: ${cod})</p>
        <p><strong>TAMANHO:</strong> ${tam} | <strong>FORNECEDOR:</strong> ${forn}</p>
        <p><strong>MANUTENÇÃO:</strong> ${valorManutencao.toUpperCase()}</p>
    `;

    lista.appendChild(item);

    // Limpa os campos de texto para a próxima digitação
    document.getElementById('inputCodigo').value = "";
    document.getElementById('inputProduto').value = "";
    document.getElementById('inputTamanho').value = "";
    document.getElementById('inputFornecedor').value = "";
    
    console.log("Item adicionado com sucesso!");
}

// Função de imprimir
function imprimirPDF() {
    window.print();
}