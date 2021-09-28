import styled from "styled-components";
import {Checkbox} from 'antd'
export const ProductContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 30px 0;
`
export const ProductSlideBar = styled.div`
  padding: 0 30px;
  & .title{
    padding: 5px 0;
    background-color: #f1f1f1;
    color: #303030;
    font-size: 15px;
    text-transform: uppercase;
    text-align: center;

  }
`
export const SlideItemBox = styled.div`
  margin-top: 5px;
  padding: 20px 0;
  &>.item{
    padding-top:10px;
  }
`
export const CheckBoxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
`
export const ShowPro = styled.div`
  padding-top: 10px;
  padding-bottom: 80px;
  width: 100%;
  &>.title{
    padding: 15px;
    margin: 15px 0;
    text-align: center;
    border: 1px solid ${(props)=>props.theme.borderColor};
    font-size: 25px;
    text-transform: uppercase;
  }
`