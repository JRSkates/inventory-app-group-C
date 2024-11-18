import React from "react";
import Item from "./Item";

const ItemList = ({ items, onViewDetails }) => {
  return (
    <ul>
      {items.map((item) => (
        <Item key={item.id} item={item} onViewDetails={onViewDetails} />
      ))}
    </ul>
  );
};

export default ItemList;
