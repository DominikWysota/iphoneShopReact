import React from "react";

const Colors = props => {
  const colors = props.colors.map((color, index) => (
    <div
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
  return <>{colors}</>;
};

export default Colors;
