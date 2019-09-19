import connectComponent from "../../connect/connectComponent";

Component(connectComponent({}, {
  mapGlobalStore(state) {
    return {
      notice: state.notice.content,
    };
  }
}));
