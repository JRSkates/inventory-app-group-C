import React, { useState } from 'react';
import './itemForm.css'; 

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
        <form onSubmit={handleFormSubmit} className="form-container">
            <h3>Create New Item</h3>

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

            <label className="form-label">
                Description:
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="form-input form-textarea"
                    />
            </label>

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

            <label className="form-label">
                Category:
                <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="form-input"
                />
            </label>

            <label className="form-label">
                Image URL:
                <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="form-input"
                />
            </label>

            <button type="submit" className="form-button">Submit</button>
            <button type="button" onClick={onBack} className="form-button form-cancel-button">Back</button>
        </form>
    );
};

export default ItemForm;
