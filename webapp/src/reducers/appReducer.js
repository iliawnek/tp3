const SET_STAGE = 'banking-webapp/app/SET_STAGE';
const SET_FROM_ACCOUNT = 'banking-webapp/app/SET_FROM_ACCOUNT';
const SET_TO_ACCOUNT = 'banking-webapp/app/SET_TO_ACCOUNT';
const RESET = 'banking-webapp/app/RESET';

export function setStage(stage) {
  return {
    type: SET_STAGE,
    stage,
  };
}

export function setFromAccount(account) {
  return {
    type: SET_FROM_ACCOUNT,
    account,
  };
}

export function setToAccount(account) {
  return {
    type: SET_TO_ACCOUNT,
    account,
  };
}

export function reset() {
  return {
    type: RESET,
  }
}

const initialState = {
  stage: 'from',
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case SET_FROM_ACCOUNT:
      return {
        ...state,
        from: action.account,
      };
    case SET_TO_ACCOUNT:
      return {
        ...state,
        to: action.account,
      };
    case RESET:
      return initialState;

    default:
      return state;
  }
}