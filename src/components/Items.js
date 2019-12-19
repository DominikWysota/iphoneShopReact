import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";
import Capacity from "./Capacity";
import Buy from "./Buy";

class Items extends Component {
  items = this.props.shopItems;
  choices = this.props.choices;

  render() {
    const { choices } = this;
    const shopItems = this.items.map((item, index) => (
      <div className="item" key={item.id}>
        <div className="photo">
          <img src={choices[index].locPhoto} alt={"dsfsd"}></img>
        </div>
        <h1>{`${choices[index].name} ${choices[index].colorName}`}</h1>
        <Colors click={this.props.clickColor} colors={item.options[0].values} iditem={item.id} />
        <Capacity
          click={this.props.clickCapacity}
          capacities={item.options[1].values}
          iditem={item.id}
        />
        <h2>
          {`Cost:
              ${choices[index].price +
                choices[index].priceModifierCol +
                choices[index].priceModifierCap}
              $`}
        </h2>
        <Buy />
      </div>
    ));
    return <>{shopItems}</>;
  }
}

export default Items;
