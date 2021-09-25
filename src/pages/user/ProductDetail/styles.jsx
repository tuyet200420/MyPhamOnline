
import styled,{ keyframes } from "styled-components";
import {Button, InputNumber, Space } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'

const showButton = keyframes`
  from {
      opacity: 0;
      top:100%;
    }
  to {
      opacity: 1;
      top: 60%;
      }
`
export const customBtn = styled(Button)`
  border-radius: 0;
`
export const Commit = styled.div`
  &>ul{
    margin-left: 50px;
    list-style-type: disclosure-closed;
  }
`
export const SectionContainer = styled.div`
    overflow: hidden;
    padding: 80px 10px;
    background-color:${(props) => props.theme.borderColor} ;
  &.show_product{
    padding-top: 0;
  }
  &>h2{
    text-transform: uppercase;
    margin-left: 30px;
    margin-bottom: 40px;
    &>span{
      border-bottom: 5px solid;
    }
  }
  &>div.description{
    margin: 0 150px;
    padding: 30px;
    font-size: 20px;
    background-color: white;

  }
`
export const BtnSlick = styled(Button)`
  position: absolute;
  z-index: 999;
  margin: 0 20px;
  height: 100%;
  background-color: #80808060;
  border-color: transparent;
  &:focus{
    background-color: #80808060;
    border-color: transparent;
    color:white;
  }
`
export const customSpace = styled(Space)`
  display: flex;
  margin-bottom: 20px;
  &>div{
    flex: 1;
    width: 100%;
    &>button{
      border-radius: 0;
      width: 100%;
      height: auto;
      font-size: 20px;
      padding: 10px;
      &.add_cart{
        color:${(props) => props.theme.BackgroundColor};
        background-color: #ed1c24;
      }
      &:hover{
        color:${(props) => props.theme.BackgroundColor};
        background-color:${(props) => props.theme.primaryColor};
      }
    }
  }
`

export const customInputNumber = styled(InputNumber)`
  border-radius: 0;
  width: 40px;
  border-left-color: transparent;
  border-right-color: transparent;
  text-align: center;
`
export const PrDetailContainer = styled.div`
  /* padding-bottom: 80px; */
`
export const ImgShow = styled.div`
  border: 2px solid black;
`
export const listImg = styled.div`
  flex-wrap: nowrap;
  display: flex;
  &>div{
    width: 20%;
    padding: 10px;
    margin: 10px;
    border: 1px solid ${(props) => props.theme.borderColor};
   }
`
export const TotalPrice = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;
  text-transform: uppercase;
  padding-top: 15px;
  &>span{
    margin-left: 20px;
    color:#ed1c24;
    font-size: 25px;
  }
`
export const PrInfor = styled.div`
  margin:0 auto;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;
  padding: 80px 20px;
`
export const PrInforTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 5px;
`
export const StarBox = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`
export const Star = styled(StarOutlined)`
  font-size: 20px;
  color: #faad14;
`
export const StarFill = styled(StarFilled)`
  font-size: 20px;
  color: #faad14;
`
export const TableBox = styled.table`
  display: block;
  padding: 30px 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  & td:last-child{
    padding-left: 20px;
    font-weight: 500;
    font-size: 25px;
  }
  &>tr:first-child{
    margin-bottom: 10px;
  }
`
export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  @media (max-width:991px) {
    margin-bottom: 15px;
  }
`
export const ProductItem = styled.div`
  position: relative;
  padding: 30px 20px;
  margin-bottom: 15px;
  & .price_item{
    display: block;
    margin-top: 5px;
  }
  &>div{
    cursor: pointer;
      &::before{
      content: "";
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #7c787817;
    }
  }
  &:hover{
    border: 1px solid #7c787817;
    box-shadow: 0 0 4px  ${(props) => props.theme.primaryColor} ;
  }
  &:hover::before{
    display: block;
  }
  &:hover .active{
    display: flex;
  }
  & img{
    width: 100%;
  }
  @media (max-width:991px) {
    padding: 15px 15px;
  }
`
export const ProductImg = styled.div`
  padding-top: 100%;
  background-image:url(${(props) => props.backgroundImg && props.backgroundImg} );
  background-position: center;
  background-repeat: repeat;
  background-size: 100% 100%;
`
export const ProductTitle = styled.p`
  padding: 15px 0;
  margin: 0 10px;
  border-bottom: 1px solid #ab9e9e47;
  text-align: center;
  color: #6f6f6f;
  font-size: 17px;
  line-height: 1.7rem;
  height: 4.75rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const CustomSpace = styled.div`
  position: absolute;
  top: 60%;
  left: 0;
  display: none;
  width: 100%;
  flex: 1;
  justify-content: center;
  background-color: #80808030;
  animation: ${showButton} linear .3s;
`

export const CustomButton = styled(Button)`
  width: 100%;
  padding: 10px 20px;
  border-radius: 3px;
  border-color:transparent ;
  text-transform: capitalize;
  color:white;
  background-color:transparent;
  font-size: 37px;
  height: auto;
  &:hover{
    color:white;
    border-color:transparent ;
    background-color:#00000029;
  }
`
export const ButtonSeeMore = styled(Button)`
  margin-top: 30px;
  padding: 4px 30px;
  height: auto;
  font-size: 20px;
`