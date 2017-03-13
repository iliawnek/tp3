import React, {Component, PropTypes} from 'react';
import {Line} from 'react-chartjs-2';
import {scroller} from 'react-scroll';

export default class TransactionChart extends Component {
  static propTypes = {
    transactions: PropTypes.array,
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
    const {transactions} = this.props;

    const data = {
      datasets: [{
        data: transactions,
        pointBackgroundColor: this.getBackgroundColors(transactions),
      }],
    };

    const options = {
      onClick: (event, point) => {
        scroller.scrollTo(point[0]._index, {
          duration: 500,
          smooth: true,
        });
      },
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
          tension: 0,
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
            const transaction = transactions[index];
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
          label: () => {
          },
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
    );
  }
}
