import React, { useState } from "react";

const OrderForm = ({ onOrderSubmitted }) => {
  const [orderId, setOrderId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId || !productName || !quantity) {
      setError("All fields are required");
      return;
    }
    setError("");
    onOrderSubmitted({ orderId, productName, quantity });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="orderId">Order ID</label>
        <input
          id="orderId"
          placeholder="Order ID"
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          placeholder="Product Name"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
