import React from "react";

const Item = ({ item, onViewDetails}) => {
    return (
        <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: £{item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} width={100} alt={item.name}></img>
            <button onClick={() => onViewDetails(item.id)}>
              View Details
            </button>
        </li>
    )
}

export default Item;