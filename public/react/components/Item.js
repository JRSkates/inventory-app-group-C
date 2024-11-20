import React, { useState } from "react";

const Item = ({ item, detailed, onViewDetails, onBack, onDelete, onUpdate }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...item });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(formData); 
    setIsEditing(false); 
  };


  if (detailed) {
    // Show detailed view
    return (
      <div>
        {isEditing ? (
          <form onSubmit={handleFormSubmit} >
            <h2>Edit Item</h2>
            <label>
              Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                step="0.01"
                required
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
          <h2>{item.name}</h2>
          <img src={item.image} width={300} alt={item.name} />
          <p>{item.description}</p>
          <p>Price: £{item.price}</p>
          <p>Category: {item.category}</p>
          <button onClick={onBack}>Back to List</button>
          <button onClick={() => onDelete(item.id)}>Delete Item</button>
          <button onClick={() => setIsEditing(true)}>Edit Item</button>
          </>
      )}
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
