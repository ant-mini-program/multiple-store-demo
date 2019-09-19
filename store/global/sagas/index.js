import { createNoticeChannel } from "./noticeChannel";
import { take, put, fork } from 'redux-saga/effects'
import { UPDATE_NOTICE } from "../ACTION";

function* pullNotice() {
  const chan = createNoticeChannel();
  while (true) {
    const notice = yield take(chan);
    yield put({
      type: UPDATE_NOTICE,
      payload: { notice }
    });
  }
}

export default function* rootSaga() {
  yield fork(pullNotice);
}
