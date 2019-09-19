export default function connectComponent(componentConfig, { mapGlobalStore, mapPageStore }) {
  const { onInit, deriveDataFromProps, didUnmount } = componentConfig;

  function reactive() {
    reactiveProps.call(this, this.props);
  }

  function reactiveProps(props) {
    let data = {};

    if (mapGlobalStore) {
      const store = getApp().store;
      data = mapGlobalStore(store.getState(), props);
    }

    if (mapPageStore) {
      const store = this.$page.store;
      data = { ...data, ...mapPageStore(store.getState(), props) };
    }

    let diff = {};

    if (this.data) {
      Object.keys(data).forEach(k => {
        if (data[k] !== this.data[k]) {
          diff[k] = data[k];
        }
      });
    } else {
      diff = data;
    }
    if (Object.keys(diff).length) {
      console.log(this.is + ' render');
      this.setData(diff);
    }
  }

  return {
    ...componentConfig,

    onInit() {
      if (onInit) {
        onInit.call(this);
      }
      this.__reactive = reactive.bind(this);
      this.__reactive();
      if (mapGlobalStore) {
        this.__globalStoreUnsubscribe = getApp().store.subscribe(this.__reactive);
      }
      if (mapPageStore) {
        this.__pageStoreUnsubscribe = this.$page.store.subscribe(this.__reactive);
      }
    },

    deriveDataFromProps(nextProps) {
      if (deriveDataFromProps) {
        deriveDataFromProps.apply(this, arguments);
      }
      reactiveProps.call(this, nextProps);
    },

    didUnmount() {
      if (didUnmount) {
        didUnmount.call(this);
      }
      if (this.__globalStoreUnsubscribe) {
        this.__globalStoreUnsubscribe();
      }
      if (this.__pageStoreUnsubscribe) {
        this.__pageStoreUnsubscribe();
      }
    }
  };
}
