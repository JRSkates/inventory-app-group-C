import React, { useEffect, useState } from "react";
import Item from "./Item";
import ItemList from "./ItemList";
import ItemForm from "./ItemForm";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  async function fetchItems() {
    const response = await fetch(`${apiURL}/items`)
    const data = await response.json();
    setItems(data);
  }

  async function fetchOneItem(id) {
    const response = await fetch(`${apiURL}/items/${id}`);
    const data = await response.json();
    setSelectedItem(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpdate = async (updatedItem) => {
    try {
      const response = await fetch(`${apiURL}/items/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        alert("Item successfully updated!");
        fetchItems(); // Refresh the items list
        setSelectedItem(updatedItem); // Keep the updated item in view
      } else {
        console.error("Failed to update item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleFormSubmit = async (itemData) => {
    try {
      const response = await fetch(`${apiURL}/items`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData),
      });
      
      if (response.ok) {
        await fetchItems(); // Re-fetch all articles after successful submission
        setIsAddingItem(false); // Switch back to list view
      } else {
        console.log('Failed to submit article');
      }
    } catch (err) {
      console.log('Error submitting article:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you wish to delete this item?")

      if (confirmDelete) {
        const response = await fetch(`${apiURL}/items/${itemId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchItems(); // Re-fetch all articles after successful deletion
          setSelectedItem(null); // Switch back to list view
        } else {
          console.log('Failed to delete article');
        }
      }
    } catch (err) {
      console.log('Error deleting article:', err);
    }
  }

  return (
    <>
      <h1>Inventory App</h1>
      {isAddingItem ? (
        <ItemForm 
          onFormSubmit={handleFormSubmit}
          onBack={() => setIsAddingItem(false)}  // Close form when back button is clicked
        /> 
      ) : !selectedItem ? (
        <>
          <button onClick={() => setIsAddingItem(true)}>Add New Item</button>
          <ItemList items={items} onViewDetails={fetchOneItem} />
        </>
      ) : (
        <Item
          item={selectedItem}
          detailed={true}
          onBack={() => setSelectedItem(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default App;
