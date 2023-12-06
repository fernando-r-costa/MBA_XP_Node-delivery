import DeliveryRepository from "../repositories/delivery.repository.js"

async function buscaPedido(id) {
    return await DeliveryRepository.buscaPedido(id)
}

async function criarPedido(pedido) {
    return await DeliveryRepository.criarPedido(pedido)
}

async function atualizarPedido(pedido) {
    return await DeliveryRepository.atualizarPedido(pedido)
}

async function atualizarEntrega(pedido) {
    const dadosPedido = await DeliveryRepository.buscaPedido(pedido.id)
    dadosPedido.entregue = pedido.entregue
    return await DeliveryRepository.atualizarPedido(dadosPedido)
}

async function excluirPedido(id) {
    return await DeliveryRepository.excluirPedido(id)
}

async function buscaTotalValorCliente(cliente) {
    return await DeliveryRepository.buscaTotalValorCliente(cliente)
}

async function buscaTotalValorProduto(produto) {
    return await DeliveryRepository.buscaTotalValorProduto(produto)
}

async function buscaMaisVendidos() {
    return await DeliveryRepository.buscaMaisVendidos()
}

export default {
    buscaPedido,
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    excluirPedido,
    buscaTotalValorCliente,
    buscaTotalValorProduto,
    buscaMaisVendidos
}