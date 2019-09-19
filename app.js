import getStore from './store/global/index';

App({
  onLaunch() {
    this.store = getStore();
  }
});
