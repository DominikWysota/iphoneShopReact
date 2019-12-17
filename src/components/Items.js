import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";

class Items extends Component {
  state = {
    loaded: false,
    choices: []
  };

  items = this.props.shopItems;

  componentDidMount() {
    console.log("zrobione");
    this.items.forEach(item => {
      const choice = {
        id: item.id,
        name: item.name,
        price: item.price,
        priceModifierCol: item.options[0].values[0].priceModifier,
        colorName: item.options[0].values[0].name,
        colorID: item.options[0].values[0].id,
        capacityID: item.options[1].values[0].id
      };
      this.setState(prevState => ({
        loaded: true,
        choices: [...prevState.choices, choice]
      }));
    });
  }

  clickChangeColor = event => {
    const iditem = event.target.getAttribute("iditem") * 1;
    const colorID = event.target.getAttribute("color_id") * 1;
    const colorName = event.target.getAttribute("name");
    const priceModifierCol = event.target.getAttribute("price_modifier") * 1;
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === iditem
          ? Object.assign(obj, {
              colorID: colorID,
              colorName: colorName,
              priceModifierCol: priceModifierCol
            })
          : obj
      )
    }));
  };

  render() {
    const { choices, loaded } = this.state;
    const shopItems = this.items.map((item, index) => (
      <div className="item" key={item.id}>
        <div className="photo">Photo</div>
        <Colors click={this.clickChangeColor} colors={item.options[0].values} iditem={item.id} />
        <h1>{loaded && `${choices[index].name} ${choices[index].colorName}`}</h1>
        <h2>{loaded && choices[index].price + choices[index].priceModifierCol}</h2>
      </div>
    ));
    return <>{shopItems}</>;
  }
}

export default Items;
