import React from "react";

const Basket = props => {
  return (
    <img
      onClick={props.click}
      className="iconBasket"
      src={props.active ? "./img/xbutton.png" : "./img/iconBasket.png"}
      alt="iconBasket"
    ></img>
  );
};

export default Basket;
