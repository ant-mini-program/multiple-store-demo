import { counter } from './reducers/index'
import rootSaga from './sagas'
import getCommonStore from "../getCommonStore";

export default function getStore() {
  return getCommonStore(rootSaga, { counter });
}
