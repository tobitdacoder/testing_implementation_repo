const express = require('express');
const router = express.Router();

let orders = []; // In-memory order storage

// Create an order
router.post('/', (req, res) => {
    const { id, product, quantity } = req.body;
    if (!id || !product || !quantity) {
        return res.status(400).json({ error: "Missing fields" });
    }
    orders.push({ id, product, quantity });
    res.status(201).json({ message: "Order created successfully", order: { id, product, quantity } });
});

// Get all orders
router.get('/', (req, res) => {
    res.status(200).json({ orders });
});

// Get a single order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
});

// Delete an order
router.delete('/:id', (req, res) => {
    orders = orders.filter(o => o.id !== req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
});

module.exports = router;
