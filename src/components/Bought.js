import React from "react";
import "./Bought.css";

const Bought = props => {
  const boughtProducts = props.boughtProducts.map((product, index) => (
    <div className="boughtProduct" key={index}>
      <img src={product.locPhoto} alt={product.name}></img>
      <h1>{`${product.name} ${product.colorName} ${product.capacityName}`}</h1>
    </div>
  ));
  return (
    <div className="boughtCont">
      {boughtProducts}
      <button onClick={props.click}>Continue shopping</button>
      <button>Buy</button>
    </div>
  );
};

export default Bought;
