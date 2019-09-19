import connectComponent from "../../connect/connectComponent";
import { CANCEL_COUNTER, INCREMENT_COUNTER_ASYNC } from "../../store/index/ACTION";

Component(connectComponent({
  methods: {
    increment() {
      this.$page.store.dispatch({
        type: INCREMENT_COUNTER_ASYNC,
      });
    },
    cancel() {
      this.$page.store.dispatch({
        type: CANCEL_COUNTER,
      });
    },
  }
}, {
  mapPageStore(state) {
    return {
      updating: !!state.counter.updating,
      count: state.counter.count,
    };
  }
}));
