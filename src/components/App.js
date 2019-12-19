import React, { Component } from "react";
import Items from "./Items";
import "./App.css";
import Basket from "./Basket";
import Bought from "./Bought";

class App extends Component {
  state = {
    shopData: null,
    activeBusket: false
  };

  componentDidMount() {
    fetch("data/products.json")
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.statusText);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          shopData: data
        });
      })
      .catch(error => console.log(error, "Błąd"));
  }

  clickHandleBasket = () => {
    this.setState({
      activeBusket: true
    });
  };

  render() {
    return (
      <>
        <header>
          <h1>IphoneShop</h1>
          <Basket click={this.clickHandleBasket} />
        </header>
        <section>
          {this.state.activeBusket && <Bought active={this.state.activeBusket} />}
          {this.state.shopData && <Items shopItems={this.state.shopData} />}
        </section>
      </>
    );
  }
}

export default App;
