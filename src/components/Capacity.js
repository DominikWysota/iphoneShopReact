import React from "react";

const Capacity = props => {
  const capacities = props.capacities.map((capacity, index) => (
    <div
      className="capacities"
      onClick={props.click}
      key={capacity.id}
      name={capacity.name}
      capacity_id={capacity.id}
      price_modifier={capacity.priceModifier}
      iditem={props.iditem}
    >
      {capacity.name}
    </div>
  ));
  return <div className="capacitiesCont">{capacities}</div>;
};

export default Capacity;
