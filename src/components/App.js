import React, { Component } from "react";
import Items from "./Items";
import "./App.css";

class App extends Component {
  state = {
    shopData: null
  };

  componentDidMount() {
    console.log("didmount w app");
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

  render() {
    console.log("renderuje w app");
    return (
      <>
        <header></header>
        <section>{this.state.shopData && <Items shopItems={this.state.shopData} />}</section>
      </>
    );
  }
}

export default App;
