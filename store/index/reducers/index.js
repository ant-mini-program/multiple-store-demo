import { INCREMENT_COUNTER,UPDATING_COUNTER } from "../ACTION";

export function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      state.count++;
      break;
    case UPDATING_COUNTER:
      state.updating = action.payload;
      break;
  }
  return state;
}
