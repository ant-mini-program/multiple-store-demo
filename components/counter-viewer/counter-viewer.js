import connectComponent from "../../connect/connectComponent";
import { CANCEL_COUNTER, INCREMENT_COUNTER_ASYNC } from "../../store/index/ACTION";

Component(connectComponent({
}, {
  mapPageStore(state) {
    return {
      updating: !!state.counter.updating,
      count: state.counter.count,
    };
  }
}));
