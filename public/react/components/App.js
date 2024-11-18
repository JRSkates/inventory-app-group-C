import React, { useEffect, useState } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const response = await fetch(`${apiURL}/items`)
    const data = await response.json();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <h1>Inventory App</h1>
      <ul>
        {items.map((item) => (
          <div>
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: £{item.price}</p>
              <p>Category: {item.category}</p>
              <img src={item.image} width={100} alt={item.name}></img>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
