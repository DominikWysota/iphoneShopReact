import React from "react";
import "./Statement.css";

const Statement = props => {
  return (
    <div className="statement">
      <div className="statementInf">
        <div>
          <img src={"./img/ok.png"} alt="iconOk"></img>
        </div>
        <h2>ORDER SHIPPED</h2>
        <button className="backShop" onClick={props.click}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Statement;
