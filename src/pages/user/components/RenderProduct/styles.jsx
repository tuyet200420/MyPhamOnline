import styled, { keyframes } from 'styled-components';
import { Row, Col, Button, Image } from 'antd';

export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  @media (max-width:991px) {
    margin-bottom: 15px;
  }
`
export const CustomImage = styled(Image)`
   color: red;
  &~.ant-image-mask{
    opacity: 0;
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
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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