import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";

class Items extends Component {
  state = {
    choices: []
  };

  items = this.props.shopItems;

  // choice = {
  //   id: this.item.id,
  //   colorID,
  //   capacityID
  // }

  // componentDidMount() {
  //   this.items.forEach(item => {
  //     this.setState(prevState => ({
  //       choices: [...prevState]
  //     })
  //   })
  // }

  clickChange = () => {};

  render() {
    console.log("renderuje w items");
    const shopItems = this.items.map(item => (
      <div className="item" key={item.id}>
        <div className="photo">Photo</div>
        <Colors click={this.clickChange} colors={item.options[0].values} />
        <h1>{item.name}</h1>
      </div>
    ));
    return <>{shopItems}</>;
  }
}

export default Items;
