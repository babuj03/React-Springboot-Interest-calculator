import React, { Component } from "react";
import axios from "axios";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import NavBar from "./NavBar";
import Footer from "./Footer";
import "./Home.css";

class App extends Component {
  state = {
    amount: 500,
    interest: 0,
    percentage: 0,
    totalAmount: 0,
    isFetching: false,
  };

  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    this.sendAmount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount !== prevState.amount) {
      this.setState({ ...this.state, isFetching: true });
      this.sendAmount();
    }
  }

  sendAmount = async () => {
    let params = {
      amount: this.state.amount,
      name: "Fred",
    };

    await axios
      .post("http://localhost:8082/api/v1/calculate/interest", params)
      .then((res) => {
        if (res.data.status && res.data.status === "error") {
          console.log("Error occurred");
        } else {
          this.setState({
            interest: res.data.interest,
            totalAmount: res.data.totalAmount,
            percentage: res.data.percentage,
            isFetching: false,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  formatAmountLabel = (val) => {
    return `$${val}`;
  };

  render() {
   
      return (
        <>
          <NavBar />
          <div className="container w-100 card">
            <form>
              <div className="form-group">
                <label>Amount</label>
                <InputRange
                  maxValue={8000}
                  minValue={500}
                  value={this.state.amount}
                  onChange={(amount) => this.setState({ amount })}
                  formatLabel={this.formatAmountLabel}
                />
              </div>
            </form>
            <br />
            <div className="interest-details-wrapper">
              <h2>Interest Details: </h2>
              <p className="interest-data">
                <span className="interest-label">Interest Percentage: </span>
                <span className="interest-display data-display">
                  {this.state.percentage}%
                </span>
              </p>
              <p className="interest-data">
                <span className="interest-label">Interest Amount :</span>
                <span className="payment-display data-display">
				£ {this.state.interest}
                </span>
              </p>

              <p className="interest-data">
                <span className="interest-label">Total Amount :</span>
                <span className="payment-display data-display">
				£ {this.state.totalAmount}
                </span>
              </p>
            </div>
          </div>
          <Footer />
        </>
      );
  }
}

export default App;
