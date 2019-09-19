import { eventChannel } from 'redux-saga'

export function createNoticeChannel() {
  return eventChannel(emitter => {
    let i = 0;
    const iv = setInterval(() => {
      emitter('notice number: ' + (++i));
    }, 2000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv)
    }
  });
}
