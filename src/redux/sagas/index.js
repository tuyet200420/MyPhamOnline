import { fork } from 'redux-saga/effects';

import departmentSaga from './department.saga';
import productSaga from './product.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import cartSaga from './cart.saga';
import orderSaga from './order.saga'

export default function* rootSaga() {
  yield fork(departmentSaga);
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(categorySaga);
  yield fork(cartSaga);
  yield fork(orderSaga);
}