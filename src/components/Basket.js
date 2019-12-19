import React from "react";

const Basket = props => {
  return (
    <img
      onClick={props.click}
      className="iconBasket"
      src="./img/iconBasket.png"
      alt="iconBasket"
    ></img>
  );
};

export default Basket;
