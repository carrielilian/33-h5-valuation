import { combineReducers } from 'redux';

import homeReducer from './home.reducer';
import mainReducer from './main.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  main: mainReducer,
});

export default rootReducer;
