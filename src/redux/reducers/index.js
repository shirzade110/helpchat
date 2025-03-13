import {combineReducers} from 'redux';
import beds from '../reducers/bedsReducer';
import langueges from '../reducers/languegesReducer';
import loading from '../reducers/loadingReducer';
import user from '../reducers/userReducer';

// ---- list of reducers ----
export default combineReducers({
  beds,
  langueges,
  loading,
  user,
});
