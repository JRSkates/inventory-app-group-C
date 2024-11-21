import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";
import App from "../components/App";
global.alert = jest.fn();

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

  expect(screen.getByText(/Inventory App/i)).toBeInTheDocument();
});

test("renders the list of items", async () => {
  await act(async () => {
    render(<App />);
  });

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

  const viewDetailsButtons = screen.getAllByText("View Details");
  await act(async () => {
    fireEvent.click(viewDetailsButtons[0]);
  });

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

  const deleteButton = screen.getByText("Delete Item");
  await act(async () => {
    fireEvent.click(deleteButton);
  });

  // Verify the item list is updated and the deleted item no longer exists
  expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();
});


test("adds a new item and displays it in the list", async () => {
  // Cannot use beforeAll mock because of complex 
  // fetch flow issues
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Item 1", description: "Description 1", price: 10, category: "Category 1", image: "item1.jpg" },
          { id: 2, name: "Item 2", description: "Description 2", price: 20, category: "Category 2", image: "item2.jpg" },
        ]),
    })
  );

  // Mock the POST request to add a new item
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ ok: true }) // Simulate a successful POST response
  );

  // Mock the follow-up GET request to include the new item
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Item 1", description: "Description 1", price: 10, category: "Category 1", image: "item1.jpg" },
          { id: 2, name: "Item 2", description: "Description 2", price: 20, category: "Category 2", image: "item2.jpg" },
          { id: 3, name: "New Item", description: "New Description", price: 20, category: "Category 2", image: "item2.jpg" },
        ]),
    })
  );

  // Render the app
  await act(async () => {
    render(<App />);
  });

  // Verify initial items are in the list
  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();

  // Click "Add New Item" to show the form
  fireEvent.click(screen.getByText("Add New Item"));

  // Fill out the form
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "New Item" } });
  fireEvent.change(screen.getByLabelText("Description:"), { target: { value: "New Description" } });
  fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "20" } });
  fireEvent.change(screen.getByLabelText("Category:"), { target: { value: "Category 2" } });
  fireEvent.change(screen.getByLabelText("Image URL:"), { target: { value: "item2.jpg" } });

  // Submit the form
  await act(async () => {
    fireEvent.click(screen.getByText("Submit"));
  });

  // Verify the new item appears in the list
  expect(await screen.findByText("New Item")).toBeInTheDocument();
});


test("edit an item and view the updated details", async () => {
  await act(async () => {
    render(<App />);
  });

  expect(screen.getByText("Item 1")).toBeInTheDocument();
  expect(screen.getByText("Item 2")).toBeInTheDocument();

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

  expect(await screen.findByText("Back to List")).toBeInTheDocument();
  expect(screen.getByText("Item 1")).toBeInTheDocument();

  // Click the "Edit Item" button
  const editButton = screen.getByText("Edit Item");
  await act(async () => {
    fireEvent.click(editButton);
  });

  // Verify the edit form is displayed
  expect(screen.getByText("Edit Item")).toBeInTheDocument();
  expect(screen.getByLabelText("Name:")).toBeInTheDocument();

  // Fill out the form with new data
  fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Updated Item" } });
  fireEvent.change(screen.getByLabelText("Description:"), { target: { value: "Updated Description" } });
  fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "15" } });
  fireEvent.change(screen.getByLabelText("Category:"), { target: { value: "Updated Category" } });
  fireEvent.change(screen.getByLabelText("Image URL:"), { target: { value: "updateditem.jpg" } });

  // Mock the PUT request for updating the item
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true, // Simulate a successful update response
    })
  );

  // Mock the fetch call to get the updated item details
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: "Updated Item",
          description: "Updated Description",
          price: 15,
          category: "Updated Category",
          image: "updateditem.jpg",
        }),
    })
  );

  // Submit the form
  const saveButton = screen.getByText("Save");
  await act(async () => {
    fireEvent.click(saveButton);
  });

  // Verify that the updated item details are displayed
  expect(screen.getByText("Updated Item")).toBeInTheDocument();
  expect(screen.getByText("Updated Description")).toBeInTheDocument();
  expect(screen.getByText("Price: £15")).toBeInTheDocument();
  expect(screen.getByText("Category: Updated Category")).toBeInTheDocument();
});



