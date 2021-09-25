import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import departmentReducer from './department.reducer';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import rootSaga from '../sagas';
import cartReducer from './cart.reducer'

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    departmentReducer: departmentReducer,
    productReducer:productReducer,
    userReducer:userReducer,
    categoryReducer:categoryReducer,
    cartReducer:cartReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;