import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from 'axios'


class AmountForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      exchangeRate: 1,
      startingcurrency: null,
      endingcurrency: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  async handleSubmit(event){
    event.preventDefault();
    const end_currency = event.target.end_currency.value;
    const start_currency = event.target.start_currency.value;
    console.log('in handleSubmit')
    console.log('event.target is: ', event.target.start_currency.value)
    let currencyObj = await Axios.get(`https://api.exchangeratesapi.io/latest?base=${event.target.start_currency.value}&symbols=${event.target.end_currency.value}`);
    console.log('currencyObj.data.rates is: ', currencyObj.data.rates[end_currency])
    this.setState(() => {
      return {
        exchangeRate: currencyObj.data.rates[end_currency],
        startingcurrency: start_currency,
        endingcurrency: end_currency
      }
    })
  }

  render() {
    return (
      <div className="splash" id="wrapper">
      <h1 className="splash-head">Currency Exchange Rate Calculator!</h1>
      <h2 className="splash-subhead">All data taken from the <a href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html">European Central Bank</a></h2>
      <form onSubmit={this.handleSubmit}>
        <label className="splash-subhead" htmlFor="start_currency">Starting Currency: </label>
        <select id="start_currency">
            <option value="USD">US Dollars</option>
            <option value="EUR">Euros</option>
            <option value="GBP">British Pounds</option>
            <option value="JPY">Japanese Yen</option>
            <option value="CAD">Canadian Dollars</option>
            <option value="CHF">Swiss Francs</option>
            <option value="CNY">Chinese Renmingbi</option>
            <option value="AUD">Australian Dollars</option>
        </select>
        <br />
        <input
          type="number"
          min="0"
          step="0.01"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <br />
        <label className="splash-subhead" htmlFor="end_currency">Ending Currency: </label>
        <select id="end_currency">
            <option value="USD">US Dollars</option>
            <option value="EUR">Euros</option>
            <option value="GBP">British Pounds</option>
            <option value="JPY">Japanese Yen</option>
            <option value="CAD">Canadian Dollars</option>
            <option value="CHF">Swiss Francs</option>
            <option value="CNY">Chinese Renmingbi</option>
            <option value="AUD">Australian Dollars</option>
        </select>
        <br />
        <input type="submit"></input>
      </form>
    {this.state.startingcurrency ? <div id="exchange rate information"><h3 className="splash-subhead">The exchange rate between {this.state.startingcurrency} and {this.state.endingcurrency} is: {this.state.exchangeRate}</h3> <h3 className="splash-subhead">You will have a total of {Math.round(this.state.value*this.state.exchangeRate*100)/100} {this.state.endingcurrency} after conversion.</h3></div> : false}
      </div>
    );
  }
}

export default AmountForm;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AmountForm />, wrapper) : false;