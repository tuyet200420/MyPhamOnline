import { useState, useEffect } from "react";
import { Row, Col, Image, Space } from 'antd';
import { ShoppingCartOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import history from '../../../../utils/history';
import { PRODUCT_LIMIT } from '../../../../constants/product'

import * as Style from './styles';

function RenderProduct({ productList, handleShowMore }) {
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
              <Style.CustomButton onClick={() => history.push('/kiki')}><ShoppingCartOutlined /></Style.CustomButton>
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
