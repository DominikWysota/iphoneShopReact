import React from "react";
import "./Bought.css";

const Bought = props => {
  const boughtProducts = props.boughtProducts.map((product, index) => (
    <div className="boughtProduct" key={index}>
      <img src={product.locPhoto} alt={product.name}></img>
      <h1>{`${product.name} ${product.colorName} ${product.capacityName}`}</h1>
      <h4>{product.price + product.priceModifierCol + product.priceModifierCap}$</h4>
      <button className="deleteProduct" onClick={() => props.delete(index)}>
        X
      </button>
    </div>
  ));
  return (
    <>
      {boughtProducts.length > 0 && (
        <div className="boughtCont">
          {boughtProducts}
          <h2>Sum: {props.sumCost.toFixed(2)}$</h2>
          <hr></hr>
          <div className="buttonsBought">
            <button className="continue" onClick={props.clickContinue}>
              Continue shopping
            </button>
            <button className="orderButton" onClick={props.clickOrder}>
              Order
            </button>
          </div>
        </div>
      )}
      {boughtProducts.length === 0 && (
        <div className="emptyBusket">
          <div className="emptyInf">
            <div className="emptyImg">
              <img src={"./img/iconBasket.png"} alt="iconBasket"></img>
            </div>
            <h2>YOUR BASKET IS EMPTY</h2>
            <button className="continue" onClick={props.clickContinue}>
              Continue shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bought;
