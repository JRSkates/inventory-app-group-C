import React, { useState } from "react";
import './ItemForm.css'; 
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
          <form onSubmit={handleFormSubmit} className="form-container">
            <h2>Edit Item</h2>
            <label className="form-label">
              Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </label>
            <br />
            <label className="form-label">
              Description:
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="form-input form-textarea"
              />
            </label>
            <br />
            <label className="form-label">
              Price:
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                step="0.01"
                required
                className="form-input"
              />
            </label>
            <br />
            <label className="form-label">
              Category:
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-input"
              />
            </label> 
            <br />
            <label className="form-label">
              Image URL:
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="form-input"
              />
            </label >
            <br />
            <button type="submit" className="form-button">Save</button>
            <button type="button" className="form-button form-cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h2 className="item-detail-title">{item.name}</h2>
            <img className="item-detail-image" src={item.image} alt={item.name} />
            <p className="item-detail-description">{item.description}</p>
            <p className="item-detail-price">Price: £{item.price}</p>
            <p className="item-detail-category">Category: {item.category}</p>
            <div className="item-detail-buttons">
              <button onClick={onBack} className="item-detail-button">Back to List</button>
              <button onClick={() => onDelete(item.id)} className="item-detail-button delete-button">Delete Item</button>
              <button onClick={() => setIsEditing(true)} className="item-detail-button edit-button">Edit Item</button>
            </div>
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
