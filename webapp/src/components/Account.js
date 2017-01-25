import React, {Component, PropTypes} from 'react';
import './Account.css';

export default class Account extends Component {
  static propTypes = {
    account: PropTypes.object,
  };

  render() {
    const {account} = this.props;
    console.log(account);

    return (
      <div className="Account">
        <div className="Account-content">
          <div className="Account-content-name">{account.name}</div>
          <div className="Account-content-balance">£{account.balance}</div>
        </div>
      </div>
    );
  }
}
