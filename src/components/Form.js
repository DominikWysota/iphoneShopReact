import React from "react";
import "./Form.css";

const Form = props => {
  return (
    <div className="formCont">
      <form>
        <label htmlFor="name">
          First Name:
          <input
            placeholder="First Name"
            type="text"
            id="name"
            name="name"
            value={props.name}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="surname">
          Last Name:
          <input
            placeholder="Last Name"
            type="text"
            id="surname"
            name="surname"
            value={props.surname}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="street">
          Street:
          <input
            placeholder="Street"
            type="text"
            id="street"
            name="street"
            value={props.street}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="houseNumber">
          House Number:
          <input
            placeholder="House Number"
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={props.houseNumber}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="city">
          City:
          <input
            placeholder="City"
            type="text"
            id="city"
            name="city"
            value={props.city}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="postcode">
          Post Code:
          <input
            placeholder="Postcode"
            type="text"
            id="postcode"
            name="postcode"
            value={props.postcode}
            onChange={props.clickChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={props.email}
            onChange={props.clickChange}
          />
          {props.errors.email && <span>{props.messages.email_incorrect}</span>}
        </label>
        {props.errors.name && <span>{props.messages.name_incorrect}</span>}
        {props.errors.surname && <span>{props.messages.surname_incorrect}</span>}
        {props.errors.street && <span>{props.messages.street_incorrect}</span>}
        {props.errors.houseNumber && <span>{props.messages.houseNumber_incorrect}</span>}
        {props.errors.city && <span>{props.messages.city_incorrect}</span>}
        {props.errors.postcode && <span>{props.messages.postcode_incorrect}</span>}
        <button onClick={props.submit}>Wyślij</button>
      </form>
    </div>
  );
};

export default Form;
