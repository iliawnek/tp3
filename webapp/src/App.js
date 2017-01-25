import React, { Component } from 'react';
import './App.css';
import {getAccounts} from './reducers/accountReducer';
import {connect} from 'react-redux';
import Account from './components/Account';

class App extends Component {
  componentWillMount() {
    this.props.getAccounts();
  }

  render() {
    const {accounts} = this.props;
    console.log(accounts);

    return (
      <div className="App">
        <div className="App-accountList">
          {accounts && accounts.map(account => (
            <Account account={account}/>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    accounts: state.account.accounts,
  }), {
    getAccounts,
  }
)(App);
