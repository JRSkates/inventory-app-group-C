import React, { useState } from 'react';

const ItemForm = ({ onFormSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h3>Create New Item</h3>
            <br />
            <label type="name">
                Name:
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })} required />
            </label>
            <br />
            <label type="description">
                Description:
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value })} required />
            </label>
            <br />
            <label type="number">
                Price:
                <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) })} step="0.01" required />
            </label>
            <br />
            <label type="category">
                Category:
                <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value })} required/>
            </label>
            <br />
            <label type="image">
                Image URL:
                <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value })} />
            </label>
            <button type="submit">Submit</button>
            <br />
            <button type="button" onClick={onBack}>Back</button>
        </form>
    )
}

export default ItemForm;