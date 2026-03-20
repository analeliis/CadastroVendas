// criar vetores
let valores = [];
let nomes = [];
let proximoId = 1;
let descontos = [];
let valoresFinais = [];
let datas = [];
let ids = [];

document.getElementById("formVenda").addEventListener("submit", function (event) {
    event.preventDefault();

    let campoNome = document.getElementById("vendedor");
    let campoValor = document.getElementById("valor");

    let nome = campoNome.value.trim();
    let valor = parseFloat(campoValor.value);

    // validações
    if (nome === "") {
        alert("ERRO, insira um nome.");
        campoNome.focus();
        return;
    }

    if (isNaN(valor)) {
        alert("ERRO, insira um valor válido.");
        campoValor.focus();
        return;
    }

    if (valor <= 0) {
        alert("Número inválido.");
        campoValor.focus();
        return;
    }

    // cálculo
    let valorDesconto = valor * 0.10;
    let valorFinal = valor - valorDesconto;

    // data atual
    let dataAtual = new Date().toLocaleString("pt-BR");

    // inserindo nos vetores
    ids.push(proximoId);
    nomes.push(nome);
    valores.push(valor);
    descontos.push(valorDesconto);
    valoresFinais.push(valorFinal);
    datas.push(dataAtual);

    proximoId++;

    // limpar campos
    campoNome.value = "";
    campoValor.value = "";
    campoNome.focus();

    atualizarLista();
});

// atualiza a tabela
function atualizarLista() {
    const tabelaVendas = document.getElementById("tabelaVendas");

    tabelaVendas.innerHTML = "";

    if (ids.length === 0) {
        tabelaVendas.innerHTML = '<tr><td colspan="7">Nenhum valor cadastrado</td></tr>';
        return;
    }

    for (let i = 0; i < ids.length; i++) {
        const item = document.createElement("tr");

        item.innerHTML = `
            <td>${ids[i]}</td>
            <td>${nomes[i]}</td>
            <td>R$ ${valores[i].toFixed(2)}</td>
            <td>R$ ${descontos[i].toFixed(2)}</td>
            <td>R$ ${valoresFinais[i].toFixed(2)}</td>
            <td>${datas[i]}</td>
            <td>
                <button class="btn-remover" onclick="removerItem(${i})">Remover</button>
            </td>
        `;

        tabelaVendas.appendChild(item);
    }
}

// remove item específico
function removerItem(indice) {
    ids.splice(indice, 1);
    nomes.splice(indice, 1);
    valores.splice(indice, 1);
    descontos.splice(indice, 1);
    valoresFinais.splice(indice, 1);
    datas.splice(indice, 1);

    atualizarLista();
}

// remove último item
function removerUltimo() {
    if (ids.length === 0) {
        alert("A lista já está vazia.");
        return;
    }

    ids.pop();
    nomes.pop();
    valores.pop();
    descontos.pop();
    valoresFinais.pop();
    datas.pop();

    atualizarLista();
}

// limpa tudo
function limparTudo() {
    if (ids.length === 0) {
        alert("Não há vendas para remover.");
        return;
    }

    if (confirm('Deseja realmente limpar todos os números?')) {
        ids = [];
        nomes = [];
        valores = [];
        descontos = [];
        valoresFinais = [];
        datas = [];
        proximoId = 1;

        atualizarLista();
    }


}

// mostra mensagem inicial
atualizarLista();