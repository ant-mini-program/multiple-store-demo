import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux-immer';
import produce from 'immer';

export default function getCommonStore(rootSaga,reducers) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(combineReducers(produce, reducers), applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
