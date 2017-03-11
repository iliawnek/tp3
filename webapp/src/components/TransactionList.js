import React, {Component, PropTypes} from 'react';
import './TransactionList.css';
import Transaction from './Transaction';

export default class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.array,
  };

  render() {
    const {transactions} = this.props;

    const styles = {};

    return (
      <div className="TransactionList">
        {transactions.map(transaction => (
          <Transaction
            {...transaction}
          />
        )).reverse()}
      </div>
    );
  }
}
