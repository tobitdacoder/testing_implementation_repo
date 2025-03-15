import React from 'react'; // add this line
import { render, screen, fireEvent } from "@testing-library/react";
import OrderForm from "../components/OrderForm";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ order: { id: "1", product: "Laptop", quantity: 2 } }),
  })
);

describe("OrderForm Integration Tests", () => {
  test("renders form inputs", () => {
    render(<OrderForm onOrderSubmitted={() => {}} />);
    expect(screen.getByPlaceholderText("Order ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
  });

  test("submits form data and calls API", async () => {
    const mockOnOrderSubmitted = jest.fn();
    render(<OrderForm onOrderSubmitted={mockOnOrderSubmitted} />);

    fireEvent.change(screen.getByPlaceholderText("Order ID"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Laptop" } });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: "2" } });

    fireEvent.click(screen.getByText("Submit Order"));

    expect(await screen.findByText("")).toBeInTheDocument();
    expect(mockOnOrderSubmitted).toHaveBeenCalledWith({ id: "1", product: "Laptop", quantity: 2 });
  });

  test("shows an error message for empty fields", () => {
    render(<OrderForm onOrderSubmitted={() => {}} />);
    fireEvent.click(screen.getByText("Submit Order"));
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  test("handles API errors", async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(<OrderForm onOrderSubmitted={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText("Order ID"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Laptop" } });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: "2" } });

    fireEvent.click(screen.getByText("Submit Order"));

    expect(await screen.findByText("Failed to create order")).toBeInTheDocument();
  });
});
