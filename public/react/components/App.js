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

  return (
    <>
      <h1>Inventory App</h1>
      {isAddingItem ? (
        <ItemForm /> 
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
