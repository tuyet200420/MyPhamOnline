import { createAction } from '@reduxjs/toolkit';
import { CART_ACTION,REQUEST } from '../constants';

export const getCartListAction = createAction(REQUEST(CART_ACTION.GET_CART_LIST));
export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const plusItemCountAction = createAction(REQUEST(CART_ACTION.PLUS_ITEM_COUNT));
export const minusItemCountAction = createAction(REQUEST(CART_ACTION.MINUS_ITEM_COUNT));
export const deleteCartItemAction = createAction(REQUEST(CART_ACTION.DELETE_CART_ITEM));
export const clearCartListAction = createAction(REQUEST(CART_ACTION.CLEAR_CART_LIST));