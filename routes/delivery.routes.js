import express from 'express'
import DeliveryController from '../controllers/delivery.controller.js'

const router = express.Router()

router.get("/id/:id", DeliveryController.buscaPedido)
router.post("/", DeliveryController.criarPedido)
router.put("/", DeliveryController.atualizarPedido)
router.patch("/atualizarEntrega", DeliveryController.atualizarEntrega)
router.delete("/:id", DeliveryController.excluirPedido)
router.get("/cliente/:cliente", DeliveryController.buscaTotalValorCliente)
router.get("/produto/:produto", DeliveryController.buscaTotalValorProduto)
router.get("/maisVendidos", DeliveryController.buscaMaisVendidos)

router.use((err, req, res, next) => {
    console.log(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router