import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Image, Space } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import history from '../../../../utils/history';
import { PRODUCT_LIMIT } from '../../../../constants/product'

import * as Style from './styles';
import {
  getProductDetailAction,
  getProductListAction,
  addToCartAction
} from '../../../../redux/actions';

function RenderProduct({ productList, handleShowMore }) {

  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  
  function handleAddToCart(productItem) {
    const cartData = [...cartList.data];
    const cartIndex = cartData.findIndex((item) =>{
      return item.productId === productItem.id && item.price === productItem.price
    });
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + 1,
      });
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: cartData },
      }));
    } else {
      const newCartData = [
        ...cartData,
        {
          ...productItem,
          id: uuidv4(),
          productId: productItem.id,
          count: 1

        }
      ]
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      }));
    }

  }

  function renderProduct() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Col md={6} sm={8} xs={12}>
          <Style.ProductItem
          >
            <div
              onClick={() => history.push(`/product/${productItem.id}`)}
              key={`product-${productIndex}`}
            >
                <Style.ProductImg backgroundImg={productItem.images[0]}/>
              <Style.ProductTitle>[{productItem.trademark}]{productItem.name}</Style.ProductTitle>
              <span className="price_item">{parseInt(productItem.price).toLocaleString()}đ</span>
            </div>
            <Style.CustomSpace className="active">
              <Style.CustomButton ><EyeOutlined />
              <Style.CustomImage
                preview ={{src: productItem.images[0]}}
              />
              </Style.CustomButton>
              <Style.CustomButton onClick={() =>handleAddToCart(productItem) }><ShoppingCartOutlined /></Style.CustomButton>
            </Style.CustomSpace>
          </Style.ProductItem>
        </Col >
      )
    })
  }
  
  return (
    <>
      <div className="prodcutList">
        <Row>
          {renderProduct()}
        </Row>
        {productList.data.length % PRODUCT_LIMIT === 0 && (
          <div style={{ textAlign: "center" }}>
            {productList.data.length > 0
              ? <Style.ButtonSeeMore onClick={() => handleShowMore()}>Xem Thêm</Style.ButtonSeeMore>
              : null}
          </div>)}
      </div>
    </>
  )
}
export default RenderProduct;
