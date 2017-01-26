import React, {Component, PropTypes} from 'react';
import Account from './Account';
import './AccountList.css';
import {connect} from 'react-redux';
import {setStage, setFromAccount, setToAccount} from '../reducers/appReducer';

class AccountList extends Component {
  static propTypes = {
    accounts: PropTypes.array,
  };

  onClickAccount = (account) => {
    const {stage} = this.props;
    if (stage === 'from') {
      this.props.setStage('to');
      this.props.setFromAccount(account);
    } else if (stage === 'to') {
      this.props.setStage('amount');
      this.props.setToAccount(account);
    }
  };

  render() {
    const {accounts, toAccount, fromAccount} = this.props;

    return (
      <div className="AccountList">
        {accounts && accounts.map(account => (
          <Account
            key={account._id}
            account={account}
            onClick={this.onClickAccount.bind(this, account)}
            selected={(fromAccount && (account._id === fromAccount._id)) || (toAccount && (account._id === toAccount._id))}
          />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  stage: state.app.stage,
  toAccount: state.app.to,
  fromAccount: state.app.from,
}), {
  setStage,
  setFromAccount,
  setToAccount,
})(AccountList);