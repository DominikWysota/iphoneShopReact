import React from "react";

const Capacity = props => {
  const id = props.iditem;
  const capacities = props.capacities.map(capacity => (
    <div className="capacities" onClick={() => props.click(capacity, id)} key={capacity.id}>
      {capacity.name}
    </div>
  ));
  return <div className="capacitiesCont">{capacities}</div>;
};

export default Capacity;
