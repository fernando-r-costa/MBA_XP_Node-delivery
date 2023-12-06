import { promises as fs } from 'fs';

const { readFile, writeFile } = fs

async function buscaPedido(id) {
    const dados = JSON.parse(await readFile(fileName))
    const index = dados.pedidos.findIndex(p => p.id === parseInt(id))
    if (index === -1) {
        throw new Error("Pedido não encontrado.")
    }
    return dados.pedidos[index]
}

async function criarPedido(pedido) {
    const dados = JSON.parse(await readFile(fileName))
    const dataAtual = (new Date()).toISOString()
    pedido = {
        id: dados.nextId++,
        cliente: pedido.cliente,
        produto: pedido.produto,
        valor: pedido.valor,
        entregue: false,
        timestamp: dataAtual
    }
    dados.pedidos.push(pedido)
    await writeFile(fileName, JSON.stringify(dados, null, 2))
    return pedido
}

async function atualizarPedido(pedido) {
    const dados = JSON.parse(await readFile(fileName))
    const dataAtual = (new Date()).toISOString()
    const index = dados.pedidos.findIndex(p => p.id === pedido.id)
    if (index === -1) {
        throw new Error("Pedido não encontrado.")
    }
    dados.pedidos[index].cliente = pedido.cliente
    dados.pedidos[index].produto = pedido.produto
    dados.pedidos[index].valor = pedido.valor
    dados.pedidos[index].entregue = pedido.entregue
    dados.pedidos[index].timestamp = dataAtual
    await writeFile(fileName, JSON.stringify(dados, null, 2))
    return dados.pedidos[index]
}

async function excluirPedido(id) {
    const dados = JSON.parse(await readFile(fileName))
    dados.pedidos = dados.pedidos.filter(p => p.id !== parseInt(id))
    await writeFile(fileName, JSON.stringify(dados, null, 2))
}

async function buscaTotalValorCliente(cliente) {
    const dados = JSON.parse(await readFile(fileName))
    dados.pedidos = dados.pedidos.filter(c => c.cliente === cliente && c.entregue === true)
    if (dados.pedidos.length === 0) {
        throw new Error("Cliente não encontrado.")
    }
    const totalValorCliente = dados.pedidos.reduce((acumulador, pedido) => {
        return acumulador + pedido.valor;
    }, 0);
    return `O valor total do cliente ${cliente} é: ${totalValorCliente}`;
}

async function buscaTotalValorProduto(produto) {
    const dados = JSON.parse(await readFile(fileName))
    dados.pedidos = dados.pedidos.filter(p => p.produto === produto && p.entregue === true)
    if (dados.pedidos.length === 0) {
        throw new Error("Produto não encontrado.")
    }
    const totalValorProduto = dados.pedidos.reduce((acumulador, pedido) => {
        return acumulador + pedido.valor;
    }, 0);
    return `O valor total do produto ${produto} é: ${totalValorProduto}`;
}

async function buscaMaisVendidos() {
    const dados = JSON.parse(await readFile(fileName));
    const produtosQuantidades = {};
    dados.pedidos
        .filter(pedido => pedido.entregue === true)
        .forEach((pedido) => {
            const produto = pedido.produto;
            produtosQuantidades[produto] = (produtosQuantidades[produto] || 0) + 1;
        });
    const maisVendidos = Object.fromEntries(
        Object.entries(produtosQuantidades)
            .sort((a, b) => b[1] - a[1]))
    return maisVendidos;
}


export default {
    buscaPedido,
    criarPedido,
    atualizarPedido,
    excluirPedido,
    buscaTotalValorCliente,
    buscaTotalValorProduto,
    buscaMaisVendidos
}