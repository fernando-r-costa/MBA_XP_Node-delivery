import DeliveryService from "../services/delivery.service.js"

async function buscaPedido(req, res, next) {
    try {
        res.send(await DeliveryService.buscaPedido(req.params.id))
    } catch (err) {
        next(err)
    }
}

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body
        if (!pedido.cliente || !pedido.produto || pedido.valor == null) {
            throw new Error("Cliente, Produto e Valor são obrigatórios.")
        }
        pedido = await DeliveryService.criarPedido(pedido)
        res.send(pedido)
    } catch (err) {
        next(err)
    }
}

async function atualizarPedido(req, res, next) {
    try {
        const pedido = req.body
        if (!pedido.id || !pedido.cliente || !pedido.produto || pedido.valor == null || pedido.entregue == null) {
            throw new Error("Cliente, Produto, Valor e Entregue são obrigatórios.")
        }
        res.send(await DeliveryService.atualizarPedido(pedido))
    } catch (err) {
        next(err)
    }
}

async function atualizarEntrega(req, res, next) {
    try {
        const pedido = req.body
        if (!pedido.id || pedido.entregue !== true && pedido.entregue !== false) {
            throw new Error("Id e Entregue true ou false são obrigatórios")
        }
        res.send(await DeliveryService.atualizarEntrega(pedido))
    } catch (err) {
        next(err)
    }
}

async function excluirPedido(req, res, next) {
    try {
        await DeliveryService.excluirPedido(req.params.id)
        res.end()
    } catch (err) {
        next(err)
    }
}

async function buscaTotalValorCliente(req, res, next) {
    try {
        res.send(await DeliveryService.buscaTotalValorCliente(req.params.cliente))
    } catch (err) {
        next(err)
    }
}

async function buscaTotalValorProduto(req, res, next) {
    try {
        res.send(await DeliveryService.buscaTotalValorProduto(req.params.produto))
    } catch (err) {
        next(err)
    }
}

async function buscaMaisVendidos(req, res, next) {
    try {
        res.send(await DeliveryService.buscaMaisVendidos())
    } catch (err) {
        next(err)
    }
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