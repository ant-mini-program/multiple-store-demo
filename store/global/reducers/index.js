import { UPDATE_NOTICE } from "../ACTION";

export function notice(state={},action){
  switch (action.type) {
    case UPDATE_NOTICE:
      state.content=action.payload.notice;
      break;
  }
  return state;
}
