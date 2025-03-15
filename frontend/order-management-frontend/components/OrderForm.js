import React from 'react';
import { useState } from "react";

const OrderForm = ({ onOrderSubmitted }) => {
  const [order, setOrder] = useState({ id: "", product: "", quantity: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order.id || !order.product || !order.quantity) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      onOrderSubmitted(data.order);
      setOrder({ id: "", product: "", quantity: "" });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Order ID"
          value={order.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={order.product}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={handleChange}
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
