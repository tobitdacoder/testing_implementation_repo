import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderForm from "../components/OrderForm";



test("renders form inputs", () => {
  render(<OrderForm onOrderSubmitted={() => {}} />);

  // Check if the form fields are rendered
  expect(screen.getByPlaceholderText("Order ID")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
});


test("shows an error message for empty fields", () => {
  render(<OrderForm onOrderSubmitted={() => {}} />);

  // Simulate clicking the submit button with empty fields
  fireEvent.click(screen.getByText("Submit Order"));

  // Check if the error message is displayed
  expect(screen.getByText("All fields are required")).toBeInTheDocument();
});




test("submits form data and calls API", async () => {
    const mockOnOrderSubmitted = jest.fn();
    render(<OrderForm onOrderSubmitted={mockOnOrderSubmitted} />);
  
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Order ID"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Laptop" } });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: "2" } });
  
    // Simulate form submission
    fireEvent.click(screen.getByText("Submit Order"));
  
    // Check if the mock function was called with the correct values
    expect(mockOnOrderSubmitted).toHaveBeenCalledWith({
      orderId: "1",
      productName: "Laptop",
      quantity: "2",
    });
  });






test("handles API errors", async () => {
  const mockOnOrderSubmitted = jest.fn().mockRejectedValueOnce(new Error("Failed to create order"));
  render(<OrderForm onOrderSubmitted={mockOnOrderSubmitted} />);

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText("Order ID"), { target: { value: "1" } });
  fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Laptop" } });
  fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: "2" } });

  // Simulate form submission
  fireEvent.click(screen.getByText("Submit Order"));

  // Wait for error message to appear
  await waitFor(() => expect(screen.getByText("Failed to create order")).toBeInTheDocument());
});
