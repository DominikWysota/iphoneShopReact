import React, { Component } from "react";
import Items from "./Items";
import "./App.css";

class App extends Component {
  state = {
    shopData: []
  };

  componentDidMount() {
    console.log("didmount");
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
    console.log("renderuje");
    return (
      <div>
        <Items shopItems={this.state.shopData} />
      </div>
    );
  }
}

export default App;
