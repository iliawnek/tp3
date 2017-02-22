import React, {Component} from 'react';
import './Account.css';

export default class Account extends Component {

  render() {
    const {params} = this.props;
    const {id} = params;

    return (
      <div>
        {id}
      </div>
    )
  }
}
