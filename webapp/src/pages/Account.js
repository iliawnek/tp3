import React, {Component} from 'react';
import './Account.css';
import {Line} from 'react-chartjs-2';
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
      balanceOut.push([Math.floor(Math.random() * 10), "Jeff", -Math.ceil(Math.random() * 100), this.randomDate()]);
    }
    return balanceOut;
  };

  randomBalanceIn = () => {
    let balanceIn = [];
    for (let i = 0; i < Math.random() * 10 + 10; i++) {
      balanceIn.push([Math.floor(Math.random() * 10), "Jeff", Math.ceil(Math.random() * 200), this.randomDate()]);
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
      };
    });

    transactions.unshift({x: 1479243060000, y: data.starting_balance, type: 'start'});
    return transactions;
  };

  getBackgroundColors = (data) => {
    return data.map((t) => {
      if (t.type === 'in') {
        return '#28cc1a'; // green
      } else if (t.type === 'out') {
        return 'red';
      } else {
        return '#bbb';
      }
    });
  };

  render() {
    // const {params} = this.props;
    // const {id} = params;

    const sampleData = {
      starting_balance: this.randomStartingBalance(),
      balance_out: this.randomBalanceOut(),
      balance_in: this.randomBalanceIn(),
    };

    const processedData = this.processData(sampleData);

    const data = {
      datasets: [{
        label: 'balance',
        data: processedData,
        pointBackgroundColor: this.getBackgroundColors(processedData),
      }],
    };

    console.debug(data.datasets[0].data);

    const options = {
      scales: {
        xAxes: [{
          type: 'time',
          position: 'bottom',
        }]
      },
      elements: {
        line: {
          stepped: true,
        },
      },
    };

    return (
      <Line
        data={data}
        options={options}
      />
    )
  }
}
