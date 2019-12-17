import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";

class Items extends Component {
  state = {
    choices: []
  };

  items = this.props.shopItems;

  componentDidMount() {
    this.items.forEach(item => {
      const choice = {
        id: item.id,
        neme: item.name,
        price: item.price,
        colorName: item.options[0].values[0].name,
        colorID: item.options[0].values[0].id,
        capacityID: item.options[1].values[0].id
      };
      this.setState(prevState => ({
        choices: [...prevState.choices, choice]
      }));
    });
  }

  clickChangeColor = event => {
    const iditem = event.target.getAttribute("iditem") * 1;
    const colorID = event.target.getAttribute("color_id") * 1;
    console.log(iditem);
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === iditem ? Object.assign(obj, { colorID: colorID }) : obj
      )
    }));
  };

  render() {
    const shopItems = this.items.map((item, index) => (
      <div className="item" key={item.id}>
        <div className="photo">Photo</div>
        <Colors click={this.clickChangeColor} colors={item.options[0].values} iditem={item.id} />
        <h1>{item.name}</h1>
      </div>
    ));
    return <>{shopItems}</>;
  }
}

export default Items;
