import React from "react";
import "./Colors.css";

const Colors = props => {
  const id = props.iditem;
  const colors = props.colors.map(color => (
    <img
      onClick={() => props.click(color, id)}
      className="colors"
      key={color.id}
      src={color.locPhoto}
      alt={color.name}
    ></img>
  ));
  return <div className="colorsContainer">{colors}</div>;
};

export default Colors;
