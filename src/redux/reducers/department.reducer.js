import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE,DEPARTMENT_ACTION } from '../constants';
const initialState = {
  departmentList: {
    data: [],
    load: false,
    error: null,
  },
  departmentDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const departmentReducer = createReducer(initialState, {
  [REQUEST(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        load: true,
      },
    };
  },
  [SUCCESS(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      departmentList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(DEPARTMENT_ACTION.GET_DEPARTMENT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      departmentList: {
        ...state.departmentList,
        load: false,
        error,
      },
    }
  },
  [SUCCESS(DEPARTMENT_ACTION.GET_DEPARTMENT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      departmentDetail: {
        ...state.departmentDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
});
export default departmentReducer;