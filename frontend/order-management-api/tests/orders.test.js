const request = require('supertest');
const app = require('../index'); // Import the Express app

describe("Order Management API", () => {
    let testOrder = { id: "1", product: "Laptop", quantity: 2 };

    // Test order creation
    it("should create a new order", async () => {
        const res = await request(app)
            .post('/orders')
            .send(testOrder);
        
        expect(res.statusCode).toBe(201);
        expect(res.body.order).toHaveProperty("id", "1");
        expect(res.body.order).toHaveProperty("product", "Laptop");
        expect(res.body.order).toHaveProperty("quantity", 2);
    });

    // Test getting all orders
    it("should retrieve all orders", async () => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(200);
        expect(res.body.orders.length).toBeGreaterThan(0);
    });

    // Test fetching a specific order
    it("should retrieve a single order by ID", async () => {
        const res = await request(app).get('/orders/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.product).toBe("Laptop");
    });

    // Test deleting an order
    it("should delete an order", async () => {
        const res = await request(app).delete('/orders/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Order deleted successfully");
    });

    // Test for invalid order creation
    it("should return 400 for missing fields", async () => {
        const res = await request(app).post('/orders').send({ product: "Laptop" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "Missing fields");
    });

    // Test for retrieving a non-existent order
    it("should return 404 when order not found", async () => {
        const res = await request(app).get('/orders/999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "Order not found");
    });
});
