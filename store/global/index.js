import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { combineReducers } from 'redux-immer';
import produce from 'immer';
import { notice } from './reducers/index'
import rootSaga from './sagas'

export default function getStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(combineReducers(produce, {
    notice
  }), applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
