import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";
import Capacity from "./Capacity";
import Buy from "./Buy";

class Items extends Component {
  state = {
    active: []
  };
  items = this.props.shopItems;

  componentDidMount() {
    const option = {
      options: true,
      spec: false
    };
    this.items.forEach(() => {
      this.setState(prevState => ({
        active: [...prevState.active, option]
      }));
    });
  }

  render() {
    const choices = this.props.choices;
    const shopItems = this.items.map((item, index) => (
      <div className="item" key={item.id}>
        <div className="photo">
          <img src={choices[index].locPhoto} alt={"dsfsd"}></img>
        </div>
        <h1>{`${choices[index].name} ${choices[index].colorName}`}</h1>
        <div className="about">
          <button>Options</button>
          <button>Specifications</button>
        </div>
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
        <Buy click={this.props.clickBuy} idbutton={item.id} />
      </div>
    ));
    return <>{shopItems}</>;
  }
}

export default Items;
