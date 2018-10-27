import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery.js";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ message: "Waiting for transaction to be processed..." });

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "Transaction complete!" });
  };

  winnerButtonClicked = async () => {
    this.setState({ message: "Waiting for transaction to be processed..." });

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>The manager of the lottery is {this.state.manager}.</p>
        <p>
          There are {this.state.players.length} players competing to win{" "}
          {web3.utils.fromWei(this.state.balance)} ether!
        </p>

        <hr />

        <div>
          <h4>Want to try your luck?</h4>
          <form onSubmit={this.onSubmit}>
            <label>Amount of ETH to enter: </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Enter</button>
          </form>
        </div>

        <hr />

        <div>
          <h4>Pick a winner?</h4>
          <button onClick={this.winnerButtonClicked}>Pick Winner!</button>
        </div>

        <hr />

        <div>
          <h1>{this.state.message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
