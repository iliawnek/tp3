import React, {Component, PropTypes} from 'react';
import './Account.css';
import classNames from 'classnames';

export default class Account extends Component {
  static propTypes = {
    account: PropTypes.object,
    selected: PropTypes.bool,
  };

  handleClick = () => {
    if (!this.props.selected) {
      this.props.onClick();
    }
  };

  render() {
    const {account, selected, ...otherProps} = this.props;
    console.log(account);

    return (
      <div className={classNames('Account', {'Account-selected': selected})} {...otherProps} onClick={this.handleClick}>
        <div className="Account-content">
          <div className="Account-content-name">{account.name}</div>
          <div className="Account-content-balance">£{account.balance}</div>
        </div>
      </div>
    );
  }
}
