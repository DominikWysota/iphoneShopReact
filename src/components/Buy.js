import React from "react";

const Buy = props => {
  return (
    <button onClick={props.click} className="buttonBuy" id_button={props.idbutton}>
      Buy
    </button>
  );
};

export default Buy;
