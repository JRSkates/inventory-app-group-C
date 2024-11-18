import React, { useEffect, useState } from "react";
import Item from "./Item";
import ItemList from "./ItemList";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
      {!selectedItem ? (
        <ItemList items={items} onViewDetails={fetchOneItem} />
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
