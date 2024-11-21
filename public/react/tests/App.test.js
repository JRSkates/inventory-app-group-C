import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";
import App from "../components/App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Item 1", description: "Description 1", price: 10, category: "Category 1", image: "item1.jpg" },
          { id: 2, name: "Item 2", description: "Description 2", price: 20, category: "Category 2", image: "item2.jpg" },
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

test("renders the list of items", async () => {
  await act(async () => {
    render(<App />);
  });

  // Verify that items are rendered
  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();
});


test("view more details on an item", async () => {
  await act(async () => {
    render(<App />);
  });

  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();

  // Mock the fetch call for fetching a single item's details
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          image: "item1.jpg",
        }),
    })
  );

  // Click the "View Details" button for the first item
  const viewDetailsButtons = screen.getAllByText("View Details");
  await act(async () => {
    fireEvent.click(viewDetailsButtons[0]);
  });

  // Verify the detailed view is displayed
  expect(await screen.findByText("Back to List")).toBeInTheDocument();
  expect(screen.getByText("Item 1")).toBeInTheDocument();
});

test("delete an item", async () => {
  await act(async () => {
    render(<App />);
  });

  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();

  // Mock the fetch call for fetching a single item's details
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          image: "item1.jpg",
        }),
    })
  );

  const viewDetailsButtons = screen.getAllByText("View Details");
  await act(async () => {
    fireEvent.click(viewDetailsButtons[0]);
  });

  // Verify the detailed view is displayed
  expect(await screen.findByText("Back to List")).toBeInTheDocument();
  expect(screen.getByText("Item 1")).toBeInTheDocument();

  // Mock `window.confirm` to simulate user clicking "OK"
  window.confirm = jest.fn(() => true);

  // Mock the fetch call for deleting the item
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ ok: true }) // Simulate a successful delete response
  );

  // Mock the updated fetch call to return the remaining items after deletion
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 2, name: "Item 2", description: "Description 2", price: 20, category: "Category 2", image: "item2.jpg" },
        ]),
    })
  );

  // Click the "Delete Item" button
  const deleteButton = screen.getByText("Delete Item");
  await act(async () => {
    fireEvent.click(deleteButton);
  });


  // Verify the item list is updated and the deleted item no longer exists
  expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();
});




test("adds a new item and displays it in the list", async () => {
  // Mock the POST request to add a new item
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ ok: true }) // Simulate a successful POST response
  );

  // Mock the subsequent GET request to include the new item
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Item 1", description: "Description 1", price: 10, category: "Category 1", image: "item1.jpg" },
          { id: 2, name: "Item 2", description: "Description 2", price: 20, category: "Category 2", image: "item2.jpg" },
          { id: 3, name: "New Item", description: "New Description", price: 20, category: "Category 2", image: "item2.jpg" },
        ]),
    })
  );

  await act(async () => {
    render(<App />);
  });

  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();

  const addButton = screen.getByText("Add New Item");
  fireEvent.click(addButton);

  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "New Item" } });
  fireEvent.change(screen.getByLabelText("Description:"), { target: { value: "New Description" } });
  fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "20" } });
  fireEvent.change(screen.getByLabelText("Category:"), { target: { value: "Category 2" } });
  fireEvent.change(screen.getByLabelText("Image URL:"), { target: { value: "item2.jpg" } });

  const submitButton = screen.getByText("Submit");
  await act(async () => {
    fireEvent.click(submitButton);
  });

  // Re-render App to check Item is in the list
  await act(async () => {
    render(<App />);
  });

  expect(screen.getByText("New Item")).toBeInTheDocument();
});




