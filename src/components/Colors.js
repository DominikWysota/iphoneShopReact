import React from "react";
import "./Colors.css";

const Colors = props => {
  const id = props.iditem;
  const colors = props.colors.map(color => (
    <img
      style={props.photoBorder === color.locPhoto ? { border: "2px solid black" } : null}
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
