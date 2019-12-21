import React, { Component } from "react";
import "./Items.css";
import Colors from "./Colors";
import Capacity from "./Capacity";
import Buy from "./Buy";

class Items extends Component {
  state = {
    loaded: false,
    active: []
  };
  items = this.props.shopItems;

  componentDidMount() {
    this.items.forEach((item, index) => {
      this.setState(prevState => ({
        active: [
          ...prevState.active,
          {
            id: index,
            spec: false
          }
        ],
        loaded: true
      }));
    });
  }

  handleClickSpec = id => {
    this.setState(prevState => ({
      active: prevState.active.map(obj =>
        obj.id === id
          ? Object.assign(obj, {
              spec: true
            })
          : obj
      )
    }));
  };

  handleClickOptions = id => {
    this.setState(prevState => ({
      active: prevState.active.map(obj =>
        obj.id === id
          ? Object.assign(obj, {
              spec: false
            })
          : obj
      )
    }));
  };

  render() {
    const choices = this.props.choices;
    const shopItems = this.items.map((item, index) => (
      <div className="item" key={item.id}>
        <div className="photo">
          <img src={choices[index].locPhoto} alt={"dsfsd"}></img>
        </div>
        <h1>{`${choices[index].name} ${choices[index].colorName}`}</h1>
        <div className="about">
          <button
            style={
              this.state.loaded === true && this.state.active[index].spec
                ? null
                : { backgroundColor: "rgb(43, 43, 43)", color: "white", border: "2px solid black" }
            }
            onClick={() => this.handleClickOptions(index)}
          >
            Options
          </button>
          <button
            style={
              this.state.loaded === true && this.state.active[index].spec
                ? { backgroundColor: "rgb(43, 43, 43)", color: "white", border: "2px solid black" }
                : null
            }
            onClick={() => this.handleClickSpec(index)}
          >
            Specifications
          </button>
        </div>
        <div className="containerAbout">
          <h3>Colors:</h3>
          <Colors
            click={this.props.clickColor}
            colors={item.options[0].values}
            iditem={item.id}
            photoBorder={choices[index].locPhoto}
          />
          <h3>Built-in memory[GB]:</h3>
          <Capacity
            capacityBackground={choices[index].capacityName}
            click={this.props.clickCapacity}
            capacities={item.options[1].values}
            iditem={item.id}
          />
          {this.state.loaded && this.state.active[index].spec && (
            <div className="specyfications">
              <p>
                Screen diagonal[cal]: <strong>{item.specifications.screen}</strong>
              </p>
              <p>
                Processor model: <strong>{item.specifications.procesor}</strong>
              </p>
              <p>
                Processor core: <strong>{item.specifications.coreProcesor}</strong>
              </p>
              <p>
                Operating system: <strong>{item.specifications.system}</strong>
              </p>
              <p>
                Memory RAM: <strong>{item.specifications.ram}</strong>
              </p>
              <p>
                Built-in memory: <strong>{choices[index].capacityName}</strong>
              </p>
              <p>
                Rear camera[Mpx]: <strong>{item.specifications.aparatResolution}</strong>
              </p>
            </div>
          )}
        </div>
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
