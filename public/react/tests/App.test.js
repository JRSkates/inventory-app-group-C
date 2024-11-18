import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";
import App from "../components/App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Item 1", description: "Description 1", price: 10, category: "Category 1", image: "item1.jpg" },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders the app header", async () => {
  // Use `act` to wrap rendering and ensure all updates are processed
  await act(async () => {
    render(<App />);
  });

  // Assert the header is rendered
  expect(screen.getByText(/Inventory App/i)).toBeInTheDocument();
});

