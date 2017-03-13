import React, {Component} from 'react';
import './Account.css';
import TransactionList from '../components/TransactionList';
import TransactionChart from '../components/TransactionChart';
import _ from 'lodash';

export default class Account extends Component {

  randomDate = () => {
    return Math.floor((Math.random() * 10000000000) + 1479243060000);
  };

  randomStartingBalance = () => {
    return Math.floor(Math.random() * 1000);
  };

  randomBalanceOut = () => {
    let balanceOut = [];
    for (let i = 0; i < Math.random() * 10; i++) {
      balanceOut.push([Math.floor(Math.random() * 10), "Jeff", -Math.ceil(Math.random() * 100), this.randomDate(), 'This is for that thing that you did for me.']);
    }
    return balanceOut;
  };

  randomBalanceIn = () => {
    let balanceIn = [];
    for (let i = 0; i < Math.random() * 10 + 10; i++) {
      balanceIn.push([Math.floor(Math.random() * 10), "Jeff", Math.ceil(Math.random() * 200), this.randomDate(), 'This is for that thing that I did for you.']);
    }
    return balanceIn;
  };

  processData = (data) => {
    let currentBalance = data.starting_balance;

    let transactions = data.balance_in.concat(data.balance_out);
    transactions = _.sortBy(transactions, (t) => t[3]);

    transactions = transactions.map((t) => {
      let amount = t[2];
      currentBalance += amount;
      return {
        x: t[3],
        y: currentBalance,
        type: amount < 0 ? 'out' : 'in',
        id: t[0],
        name: t[1],
        amount,
        message: t.length === 5 && t[4],
      };
    });

    const startingTransaction = {
      x: 1479243060000,
      y: data.starting_balance,
      type: 'start',
      amount: data.starting_balance,
      name: 'You',
      message: 'Initial balance when the account was created.'
    };

    transactions.unshift(startingTransaction);
    return transactions;
  };

  render() {
    // const {params} = this.props;
    // const {id} = params;

    const sampleData = {
      starting_balance: this.randomStartingBalance(),
      balance_out: this.randomBalanceOut(),
      balance_in: this.randomBalanceIn(),
    };

    const transactions = this.processData(sampleData);

    return (
      <div className="AccountPage">
        <TransactionChart transactions={transactions}/>
        <TransactionList transactions={transactions}/>
      </div>
    )
  }
}
