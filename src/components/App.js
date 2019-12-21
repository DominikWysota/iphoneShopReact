import React, { Component } from "react";
import Items from "./Items";
import "./App.css";
import Basket from "./Basket";
import Bought from "./Bought";
import Form from "./Form";
import Statement from "./Statement";

class App extends Component {
  state = {
    shopData: null,
    choices: [],
    activeBusket: false,
    bought: [],
    sumCost: 0,
    formActive: false,
    name: "",
    surname: "",
    email: "",
    street: "",
    houseNumber: "",
    city: "",
    postcode: "",
    send: false,
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
    postcode_incorrect: "Please correct postcode"
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
    if (this.state.formActive) {
      this.setState({
        formActive: !this.state.formActive
      });
    }
    if (!this.state.activeBusket) {
      window.addEventListener("scroll", this.noScroll);
    } else {
      window.removeEventListener("scroll", this.noScroll);
    }
  };

  clickChangeColor = (color, iditem) => {
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === iditem
          ? Object.assign(obj, {
              colorID: color.id,
              colorName: color.name,
              priceModifierCol: color.priceModifier,
              locPhoto: color.locPhoto
            })
          : obj
      )
    }));
  };

  clickChangeCapacity = (capacity, id) => {
    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.id === id
          ? Object.assign(obj, {
              capacityID: capacity.id,
              capacityName: capacity.name,
              priceModifierCap: capacity.priceModifier
            })
          : obj
      )
    }));
  };

  handleClickBuy = event => {
    const idbutton = event.target.getAttribute("id_button") * 1;
    window.addEventListener("scroll", this.noScroll);
    this.setState(prevState => ({
      bought: [...prevState.bought, this.state.choices[idbutton - 1]],
      sumCost:
        prevState.sumCost +
        (this.state.choices[idbutton - 1].price +
          this.state.choices[idbutton - 1].priceModifierCol +
          this.state.choices[idbutton - 1].priceModifierCap),
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

  clickHandleBack = () => {
    window.removeEventListener("scroll", this.noScroll);
    this.setState({
      activeBusket: false,
      formActive: false,
      send: false
    });
  };

  handleChangeInputs = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  setData = () => {
    const products = this.state.bought.map(buy => ({
      id: buy.id,
      options: [
        {
          id: 100,
          value: buy.colorID
        },
        {
          id: 101,
          value: buy.capacityID
        }
      ],
      amount: buy.price + buy.priceModifierCap + buy.priceModifierCol
    }));
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
    console.log(order);
  };

  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();
    if (validation.correct) {
      this.setData();
      this.setState({
        send: true,
        sumCost: 0,
        bought: [],
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

  deleteProduct = id => {
    const bought = [...this.state.bought];
    this.setState(prevState => ({
      sumCost:
        prevState.sumCost -
        (this.state.bought[id].price +
          this.state.bought[id].priceModifierCap +
          this.state.bought[id].priceModifierCol)
    }));
    bought.splice(id, 1);
    this.setState({
      bought: bought
    });
  };

  noScroll() {
    window.scrollTo(0, 0);
  }

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
            delete={this.deleteProduct}
            clickOrder={this.clickHandleOrder}
            clickContinue={this.clickHandleBasket}
            active={this.state.activeBusket}
            boughtProducts={this.state.bought}
            sumCost={this.state.sumCost}
          />
        )}
        {this.state.formActive && (
          <Form
            clickBack={this.clickHandleOrder}
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
        {this.state.send && <Statement click={this.clickHandleBack} />}
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
