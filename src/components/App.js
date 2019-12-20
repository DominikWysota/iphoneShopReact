import React, { Component } from "react";
import Items from "./Items";
import "./App.css";
import Basket from "./Basket";
import Bought from "./Bought";
import Form from "./Form";

class App extends Component {
  state = {
    shopData: null,
    choices: [],
    activeBusket: false,
    bought: [],
    sumCost: 0,
    formActive: true,
    name: "",
    surname: "",
    email: "",
    street: "",
    houseNumber: "",
    city: "",
    postcode: "",
    errors: {
      name: false,
      surname: false,
      email: false,
      street: false,
      houseNumber: false,
      city: false,
      postcode: false
    }
  };

  messages = {
    name_incorrect: "Please first name",
    surname_incorrect: "Please last name",
    email_incorrect: "Please correct email",
    street_incorrect: "Please street",
    houseNumber_incorrect: "Please house number",
    city_incorrect: "Please city",
    postcode: "Please correct postcode"
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

  handleClickBuy = event => {
    const idbutton = event.target.getAttribute("id_button") * 1;
    this.setState(prevState => ({
      bought: [...prevState.bought, this.state.choices[idbutton - 1]],
      sumCost:
        prevState.sumCost +
        this.state.choices[idbutton - 1].price +
        this.state.choices[idbutton - 1].priceModifierCol +
        this.state.choices[idbutton - 1].priceModifierCap,
      choices: [],
      activeBusket: !this.state.activeBusket
    }));
    this.state.shopData.forEach(item => {
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

  clickHandleOrder = () => {
    if (this.state.bought.length >= 1) {
      this.setState({
        formActive: !this.state.formActive
      });
    }
  };

  handleChangeInputs = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  setData = () => {
    const products = this.state.bought;
    const order = {
      user: {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        address: {
          street: this.state.street,
          houseNumber: this.state.houseNumber,
          city: this.state.city,
          postcode: this.state.postcode
        }
      },
      products: products
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();
    console.log(validation);
    if (validation.correct) {
      this.setState({
        name: "",
        surname: "",
        email: "",
        street: "",
        houseNumber: "",
        city: "",
        postcode: "",
        errors: {
          name: false,
          surname: false,
          email: false,
          street: false,
          houseNumber: false,
          city: false,
          postcode: false
        }
      });
    } else {
      this.setState({
        errors: {
          name: !validation.name,
          surname: !validation.surname,
          email: !validation.email,
          street: !validation.street,
          houseNumber: !validation.houseNumber,
          city: !validation.city,
          postcode: !validation.postcode
        }
      });
    }
  };

  formValidation = () => {
    let name = false;
    let surname = false;
    let email = false;
    let street = false;
    let houseNumber = false;
    let city = false;
    let postcode = false;
    let correct = false;

    if (this.state.name.length > 1 && this.state.name.indexOf(" ") === -1) {
      name = true;
    }
    if (this.state.surname.length > 1 && this.state.surname.indexOf(" ") === -1) {
      surname = true;
    }
    if (this.state.street.length > 1) {
      street = true;
    }
    if (this.state.city.length > 1) {
      city = true;
    }
    if (this.state.email.indexOf("@") !== -1 && this.state.email.length > 5) {
      email = true;
    }
    if (this.state.postcode.indexOf("-") !== -1 && this.state.postcode.length === 6) {
      postcode = true;
    }
    if (this.state.houseNumber.length >= 1) {
      houseNumber = true;
    }
    if (name && surname && email && street && houseNumber && city && postcode) {
      correct = true;
    }

    return {
      name,
      surname,
      email,
      street,
      houseNumber,
      city,
      postcode,
      correct
    };
  };

  render() {
    const { name, surname, email, street, houseNumber, city, postcode } = this.state;
    return (
      <>
        <header>
          {this.state.activeBusket ? <h1>Basket</h1> : <h1>IphoneShop</h1>}
          <Basket click={this.clickHandleBasket} active={this.state.activeBusket} />
        </header>
        {this.state.activeBusket && (
          <Bought
            clickOrder={this.clickHandleOrder}
            clickContinue={this.clickHandleBasket}
            active={this.state.activeBusket}
            boughtProducts={this.state.bought}
            sumCost={this.state.sumCost}
          />
        )}
        {this.state.formActive && (
          <Form
            errors={this.state.errors}
            messages={this.messages}
            clickChange={this.handleChangeInputs}
            submit={this.handleSubmit}
            name={name}
            surname={surname}
            email={email}
            street={street}
            houseNumber={houseNumber}
            city={city}
            postcode={postcode}
          />
        )}
        <section>
          {this.state.shopData && (
            <Items
              clickBuy={this.handleClickBuy}
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
