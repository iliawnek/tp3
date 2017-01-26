import axios from 'axios';

const GET_ACCOUNTS = 'banking-webapp/account/GET_ACCOUNTS';
const MAKE_TRANSACTION = 'banking-webapp/account/MAKE_TRANSACTION';

export function getAccounts() {
  return dispatch => {
    axios.get('http://localhost:3001/api/accounts')
      .then(response => {
        dispatch({
          type: GET_ACCOUNTS,
          accounts: response.data,
        })
      })
  };
}

const initialState = {};

export default function accountReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      };
    default:
      return state;
  }
}