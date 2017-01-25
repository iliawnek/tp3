const CREATE_ACCOUNT = 'banking-webapp/account/CREATE_ACCOUNT';

export function createAccount(name, initialBalance) {
  return {
    type: CREATE_ACCOUNT,
    name,
    initialBalance,
  };
}

const initialState = {};

export default function accountReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return {
        ...state,

      };

    default:
      return state;
  }
}