import { call, put, take, fork, race } from 'redux-saga/effects'
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
    const { incrementSync, cancel } = yield race({
      incrementSync: take(INCREMENT_COUNTER_ASYNC),
      cancel: take(CANCEL_COUNTER)
    });
    if (incrementSync) {
      if (!lastTask || !lastTask.isRunning()) {
        lastTask = yield fork(increment);
      }
    } else if (cancel) {
      if (lastTask && lastTask.isRunning()) {
        lastTask.cancel();
      }
    }
  }
}

export default function* rootSaga() {
  yield fork(watchIncrement);
}
