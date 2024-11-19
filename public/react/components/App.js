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

  return (
    <>
      <h1>Inventory App</h1>
      {isAddingItem ? (
        <ItemForm onFormSubmit={handleFormSubmit}/> 
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
        />
      )}
    </>
  );
}

export default App;
