import React from "react";

const Item = ({ item, detailed, onViewDetails, onBack, onDelete }) => {
  if (detailed) {
    // Show detailed view
    return (
      <div>
        <h2>{item.name}</h2>
        <img src={item.image} width={300} alt={item.name} />
        <p>{item.description}</p>
        <p>Price: £{item.price}</p>
        <p>Category: {item.category}</p>
        <button onClick={onBack}>Back to List</button>
        <button onClick={() => onDelete(item.id)}>Delete Item</button>
      </div>
    );
  }

  // Show default list view
  return (
    <li>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: £{item.price}</p>
      <p>Category: {item.category}</p>
      <img src={item.image} width={100} alt={item.name} />
      <button onClick={() => onViewDetails(item.id)}>View Details</button>
    </li>
  );
};

export default Item;

