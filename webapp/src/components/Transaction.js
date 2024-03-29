import React, {Component, PropTypes} from 'react';
import './Transaction.css';
import moment from 'moment';
import classNames from 'classnames';
import {Element} from 'react-scroll';

export default class Transaction extends Component {
  static propTypes = {
    holder: PropTypes.string,
    name: PropTypes.string,
    message: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
    x: PropTypes.number,
    scrollName: PropTypes.string,
  };

  render() {
    const {name, message, amount, type, x: date, scrollName} = this.props;

    const amountText = `${amount < 0 ? '-' : '+'}£${Math.abs(amount)}`;

    return (
      <Element name={scrollName}>
        <div className="Transaction">
          <div className="Transaction-date">
            <div className="Transaction-date-day">
              {moment(date).format('DD')}
            </div>
            <div className="Transaction-date-month">
              {moment(date).format('MMM')}
            </div>
          </div>

          <div className="Transaction-text">
            <div className="Transaction-text-name">
              {name}
            </div>
            <div className="Transaction-text-message">
              {message}
            </div>
          </div>

          <div className={classNames('Transaction-amount', {'Transaction-amount-deposit': type === 'in' || type === 'start', 'Transaction-amount-withdrawal': type === 'out'})}>
            {amountText}
          </div>
        </div>
      </Element>
    );
  }
}
