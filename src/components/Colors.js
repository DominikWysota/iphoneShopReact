import React from "react";
import "./Colors.css";

const Colors = props => {
  const colors = props.colors.map((color, index) => (
    <div
      className="colors"
      onClick={props.click}
      key={color.id}
      name={color.name}
      color_id={color.id}
      price_modifier={color.priceModifier}
      iditem={props.iditem}
    >
      Color{index}
    </div>
  ));
  return <div className="colorsContainer">{colors}</div>;
};

export default Colors;
