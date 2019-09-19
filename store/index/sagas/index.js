import { call, put, take, fork, cancelled } from 'redux-saga/effects'
import { INCREMENT_COUNTER, CANCEL_COUNTER, INCREMENT_COUNTER_ASYNC, UPDATING_COUNTER } from "../ACTION";
import { CANCEL } from 'redux-saga'

const delay = (ms) => {
  let t;
  const p = new Promise(res => t = setTimeout(() => {
    res();
  }, ms));

  p[CANCEL] = () => {
    clearTimeout(t);
  };
  return p;
};

function* increment() {
  try {
    yield put({
      type: UPDATING_COUNTER,
      payload: true,
    });
    yield call(delay, 2000);
    yield put({
      type: INCREMENT_COUNTER
    });
  } finally {
    // if (yield cancelled()) {
    yield put({
      type: UPDATING_COUNTER,
      payload: false,
    });
    // }
  }
}

function* watchIncrement() {
  let lastTask;
  while (true) {
    const action = yield take([ INCREMENT_COUNTER_ASYNC, CANCEL_COUNTER ]);
    if (action.type === INCREMENT_COUNTER_ASYNC) {
      if (!lastTask || !lastTask.isRunning()) {
        lastTask = yield fork(increment);
      }
    }
    if (action.type === CANCEL_COUNTER) {
      if (lastTask && lastTask.isRunning()) {
        lastTask.cancel();
      }
    }
  }
}

export default function* rootSaga() {
  yield fork(watchIncrement);
}
