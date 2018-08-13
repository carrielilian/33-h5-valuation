import createReducer from './createReducer';

/* eslint-disable arrow-body-style */
const initState = {
  loading: false,
  userInfo: {
    totalAssets: 0,
    totalFloatingProfit: 0,
    totalMarketValue: 0,
    availableBalance: 0,
    joinNumber: 0,
    overCome: 0,
  },
};

export const actionType = {
  setUserInfo: 'home/setUserInfo',
  setLoading: 'home/setLoading',
};

const reducer = {
  [actionType.setUserInfo]: (state, { payload }) => {
    return { ...state, userInfo: payload };
  },
  [actionType.setLoading]: (state, { payload }) => {
    return { ...state, loading: payload };
  },
};

export default createReducer(initState, reducer);
