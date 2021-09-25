import styled from 'styled-components'
import { Input, Space, Button } from 'antd';

export const HeaderTop = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  &.sticky{
    z-index: 9;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    transition: all .3s;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.BackgroundColor};
  }
`
export const HeaderContainer = styled.div`
  padding: 10px 30px;
  margin: 0 auto;
  max-width: 1200px;
  background-color: ${(props) => props.theme.BackgroundColor};

`
export const Logo = styled.img`
  cursor: pointer;
`

export const InputSearch = styled(Input)`
  /* padding: 10px; */
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  font-size: 20px;
  outline: none;
  &:hover{
    border-color: ${(props) => props.theme.primaryColor} !important;
  }
`
export const CustomSpace = styled(Space)`
  padding-right:40px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  @media (max-width:400px) {
    padding: 0 15px;
    justify-content: space-between;
  }
`
export const CustomButton = styled(Button)`
  font-size: 15px;
  color: ${(props) => props.theme.primaryColor};
  &:hover{
    color: ${(props) => props.theme.primaryColor};
    opacity: .6;
  }
  &:focus{
    color:black;
  }
`
export const Cart = styled.div`
  padding:0 6px;
  border-radius: 100%;
  font-size: 25px;
  color: ${(props) => props.theme.primaryColor};
  &:hover{
    color:${(props) => props.theme.primaryColor} ;
    opacity: .6;
  }
`
export const Account = styled(Space)`
  height: 100%;
  & .avatar{
    border-radius:50%;
    width: 30px;
    padding-top: 100%;
    background-image:url(${(props) => props.avatar?props.avatar:null });
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`
