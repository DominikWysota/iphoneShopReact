import React from "react";
import "./Colors.css";

const Colors = props => {
  const colors = props.colors.map(color => (
    <img
      onClick={props.click}
      className="colors"
      key={color.id}
      name={color.name}
      color_id={color.id}
      price_modifier={color.priceModifier}
      loc_photo={color.locPhoto}
      iditem={props.iditem}
      src={color.locPhoto}
      alt={color.name}
    ></img>
  ));
  return <div className="colorsContainer">{colors}</div>;
};

export default Colors;
