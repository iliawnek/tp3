import React, {Component} from 'react';
import './App.css';
import {reset} from './reducers/appReducer';
import {getAccounts, getAccount} from './reducers/accountReducer';
import {connect} from 'react-redux';
import AccountList from './components/AccountList';
import axios from 'axios';

class App extends Component {

  componentWillMount() {
    this.props.getAccounts();
  }

  state = {};

  makeTransaction = (from, to, amount) => {
    axios.put(`http://localhost:3001/api/accounts/${from._id}?balance=${from.balance - amount}`).then(() => {
      axios.put(`http://localhost:3001/api/accounts/${to._id}?balance=${to.balance + amount}`).then(() => {
        this.props.getAccounts();
      });
    });
  };

  handleInputChange = (event) => {
    this.setState({amount: parseInt(event.target.value)});
  };

  handleSend = () => {
    const {amount} = this.state;
    const {fromAccount, toAccount} = this.props;
    this.makeTransaction(fromAccount, toAccount, amount);
    this.props.reset();
    this.setState({amount: null});
  };

  getMessage = () => {
    const {stage, fromAccount, toAccount} = this.props;
    if (stage === 'from') return `Who's sending money?`;
    if (stage === 'to') return `Who's ${fromAccount.name} sending money to?`;
    if (stage === 'amount') return `How much money is ${fromAccount.name} sending to ${toAccount.name}?`;
  };

  render() {
    const {
      accounts,
      stage,
    } = this.props;
    console.log(accounts);

    const amountInput = (
      <div className="App-input">
        <input className="App-input-amount" onChange={this.handleInputChange}/>
        <div className="App-input-send" onClick={this.handleSend}>SEND</div>
      </div>
    );

    return (
      <div className="App">
        <div className="App-header">
          {this.getMessage()}
        </div>
        {stage === 'amount' && amountInput}
        <AccountList accounts={accounts}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.account.accounts,
    stage: state.app.stage,
    fromAccount: state.app.from,
    toAccount: state.app.to,
  }), {
    getAccounts,
    reset,
  }
)(App);
