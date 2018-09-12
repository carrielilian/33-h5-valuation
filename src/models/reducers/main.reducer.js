import createReducer from './createReducer';

/* eslint-disable arrow-body-style */
const initState = {
  main: [],
};

export const actionType = {
  setMain: 'main/setMain',
};

const reducer = {
  [actionType.setMain]: (state, { payload }) => {
    return { ...state, main: payload };
  },
};

export default createReducer(initState, reducer);
