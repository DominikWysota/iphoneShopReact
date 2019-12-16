import React from "react";

const Items = props => {
  const shopItems = props.shopItems.map(shopItem => <h1 key={shopItem.id}>{shopItem.name}</h1>);
  return <div>{shopItems}</div>;
};

export default Items;
