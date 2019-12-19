import React, { Component } from "react";
import Items from "./Items";
import "./App.css";
import Basket from "./Basket";
import Bought from "./Bought";

class App extends Component {
  state = {
    shopData: null,
    choices: [],
    activeBusket: false
  };

  getData() {
    fetch("data/products.json")
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.choicesData(data);
        this.setState({
          shopData: data,
          loadedChoices: true
        });
      })
      .catch(error => console.log(error, "Błąd"));
  }

  choicesData = data => {
    console.log("choices");
    data.forEach(item => {
      const choice = {
        id: item.id,
        name: item.name,
        price: item.price,
        priceModifierCol: item.options[0].values[0].priceModifier,
        colorName: item.options[0].values[0].name,
        colorID: item.options[0].values[0].id,
        capacityID: item.options[1].values[0].id,
        capacityName: item.options[1].values[0].name,
        priceModifierCap: item.options[1].values[0].priceModifier,
        locPhoto: item.options[0].values[0].locPhoto
      };
      this.setState(prevState => ({
        choices: [...prevState.choices, choice]
      }));
    });
  };

  componentDidMount() {
    console.log("didmount");
    this.getData();
  }

  clickHandleBasket = () => {
    this.setState({
      activeBusket: !this.state.activeBusket
    });
  };

  clickChangeColor = event => {
    const iditem = event.target.getAttribute("iditem") * 1;
    const colorID = event.target.getAttribute("color_id") * 1;
    const colorName = event.target.getAttribute("name");
    const priceModifierCol = event.target.getAttribute("price_modifier") * 1;
    const locPhoto = event.target.getAttribute("loc_photo");
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === iditem
          ? Object.assign(obj, {
              colorID: colorID,
              colorName: colorName,
              priceModifierCol: priceModifierCol,
              locPhoto: locPhoto
            })
          : obj
      )
    }));
  };

  clickChangeCapacity = event => {
    const iditem = event.target.getAttribute("iditem") * 1;
    const capacityID = event.target.getAttribute("capacity_id") * 1;
    const capacityName = event.target.getAttribute("name");
    const priceModifierCap = event.target.getAttribute("price_modifier") * 1;
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === iditem
          ? Object.assign(obj, {
              capacityID: capacityID,
              capacityName: capacityName,
              priceModifierCap: priceModifierCap
            })
          : obj
      )
    }));
  };

  render() {
    console.log("render app");
    return (
      <>
        <header>
          <h1>IphoneShop</h1>
          <Basket click={this.clickHandleBasket} active={this.state.activeBusket} />
        </header>
        <section>
          {this.state.activeBusket && <Bought active={this.state.activeBusket} />}
          {this.state.shopData && (
            <Items
              clickCapacity={this.clickChangeCapacity}
              clickColor={this.clickChangeColor}
              shopItems={this.state.shopData}
              choices={this.state.choices}
            />
          )}
        </section>
      </>
    );
  }
}

export default App;
