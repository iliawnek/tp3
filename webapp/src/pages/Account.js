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

    transactions.unshift({x: 1479243060000, y: data.starting_balance, type: 'start'});
    return transactions;
  };

  getBackgroundColors = (data) => {
    return data.map((t) => {
      if (t.type === 'out') {
        return 'red';
      } else {
        return '#28cc1a'; // green
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
          time: {
            tooltipFormat: 'DD/MM/YYYY HH:mm',
            unit: 'month',
          }
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            min: 0,
            callback: value => `£${value}`,
          },
        }],
      },
      elements: {
        line: {
          stepped: true,
        },
        point: {
          hitRadius: 8,
          radius: 4,
          hoverRadius: 8,
        }
      },
      tooltips: {
        callbacks: {
          afterBody: item => {
            const {index} = item[0];
            const transaction = processedData[index];
            const {y, type, amount, name, message} = transaction;

            const now = `£${y}`;

            if (type === 'start') {
              return `Starting balance is ${now}.`;
            }

            const before = `£${y - amount}`;
            const sign = amount < 0 ? '-' : '+';
            const amountText = `£${Math.abs(amount)}`;
            const text = [
              '',
              `${type === 'in' ? 'Received' : 'Sent'} ${amountText} ${type === 'in' ? 'from' : 'to'} ${name}.`,
              '',
              `Balance is now ${before} ${sign} ${amountText} = ${now}.`,
            ];
            message && text.splice(2, 0, `"${message}" — ${type === 'in' ? name : 'me'}`,);
            return text;
          },
          label: () => {},
        }
      },
      legend: {
        display: false,
      }
    };

    return (
      <Line
        data={data}
        options={options}
      />
    )
  }
}
