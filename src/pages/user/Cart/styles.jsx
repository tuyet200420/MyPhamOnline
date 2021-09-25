import styled from "styled-components";
import { Card, Row, Col, Input, Button, notification } from 'antd';

export const CartContainer = styled.div`
  margin:0 auto;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;
  padding: 80px 20px;
  &>h3{
    font-size: 23px;
    color: #e75280;
    border-bottom: 1px solid #9a918d;
  }
`
export const imageItem = styled.div`
    width: 100%;
    padding-top: 100%;
    background-image:url(${(props) => props.productImage && props.productImage} );
    background-size: cover;
`
export const CardItem = styled(Card)`
    & .headerItem{
      display: flex;
      justify-content: space-between;
      & .title{
        text-transform: uppercase;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 0px;
        cursor: pointer;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
    }
   & .cart-info-text{
      font-weight: 500;
      font-size: 15px;
   }
   & .priceItem{
    font-weight: 500;
    font-size: 17px;
   }
`