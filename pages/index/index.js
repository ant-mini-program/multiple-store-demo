import getStore from "../../store/index";

Page({
  onLoad(query) {
    this.store = getStore();
    this.setData({
      id: query.id || 1,
    });
  },
  newPage() {
    if (getCurrentPages().length >= 2) {
      my.alert({
        content: 'only allow two pages',
      });
    } else {
      my.navigateTo({
        url: `./index?id=${++this.data.id}`
      });
    }
  }
});
