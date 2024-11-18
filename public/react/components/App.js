import React, { useEffect, useState } from "react";
import Item from "./Item";

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
      <ul>
        {items.map((item) => (
          <div>
            <Item key={item.id} item={item} onViewDetails={fetchOneItem}/>
          </div>
        ))}
      </ul>
      ) : (
        <div>
          <h2>{selectedItem.name}</h2>
          <img src={selectedItem.image} width={200} alt={selectedItem.name} />
          <p>{selectedItem.description}</p>
          <p>Price: £{selectedItem.price}</p>
          <p>Category: {selectedItem.category}</p>
          {/* Add a back button */}
          <button onClick={() => setSelectedItem(null)}>Back to List</button>
        </div>
      )}
    </>
  );
}

export default App;
