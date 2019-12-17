import React from "react";

const Colors = props => {
  const colors = props.colors.map((color, index) => <div key={color.id}>Color{index}</div>);
  return <>{colors}</>;
};

export default Colors;
