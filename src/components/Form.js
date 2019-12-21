import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  state = {
    name: false,
    surname: false,
    street: false,
    houseNumber: false,
    city: false,
    postcode: false,
    email: false
  };

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      name: false,
      surname: false,
      street: false,
      houseNumber: false,
      city: false,
      postcode: false,
      email: false
    });
    this.setState({
      [name]: true
    });
  };

  render() {
    const { props } = this;
    const style = {
      border: "2px solid black"
    };
    return (
      <div className="formCont">
        <form>
          {props.errors.name && <span>{props.messages.name_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.name ? style : null}
            placeholder={this.state.name ? "" : "First Name"}
            type="text"
            id="name"
            name="name"
            value={props.name}
            onChange={props.clickChange}
          />
          {props.errors.surname && <span>{props.messages.surname_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.surname ? style : null}
            placeholder={this.state.surname ? "" : "Last Name"}
            type="text"
            id="surname"
            name="surname"
            value={props.surname}
            onChange={props.clickChange}
          />
          {props.errors.street && <span>{props.messages.street_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.street ? style : null}
            placeholder={this.state.street ? "" : "Street"}
            type="text"
            id="street"
            name="street"
            value={props.street}
            onChange={props.clickChange}
          />
          {props.errors.houseNumber && <span>{props.messages.houseNumber_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.houseNumber ? style : null}
            placeholder={this.state.houseNumber ? "" : "House Number"}
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={props.houseNumber}
            onChange={props.clickChange}
          />
          {props.errors.city && <span>{props.messages.city_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.city ? style : null}
            placeholder={this.state.city ? "" : "City"}
            type="text"
            id="city"
            name="city"
            value={props.city}
            onChange={props.clickChange}
          />
          {props.errors.postcode && <span>{props.messages.postcode_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.postcode ? style : null}
            placeholder={this.state.postcode ? "" : "Postcode"}
            type="text"
            id="postcode"
            name="postcode"
            value={props.postcode}
            onChange={props.clickChange}
          />
          {props.errors.email && <span>{props.messages.email_incorrect}</span>}
          <input
            onClick={this.handleChange}
            style={this.state.email ? style : null}
            placeholder={this.state.email ? "" : "Email"}
            type="email"
            id="email"
            name="email"
            value={props.email}
            onChange={props.clickChange}
          />
          <button onClick={props.submit}>Send</button>
          <button onClick={props.clickBack}>Back</button>
        </form>
      </div>
    );
  }
}

export default Form;
