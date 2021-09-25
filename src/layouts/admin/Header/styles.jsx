import styled from 'styled-components'
import { Input, Space, Button } from 'antd';
export const HeaderConteiner = styled.div`
  width: 100vw;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.primaryColor};
`
export const Logo = styled.img`
  /* max-width: 125px; */
`
export const InputSearch = styled(Input)`
  /* padding: 10px; */
  border-radius: 50px;
  border: 4px solid ${(props) => props.theme.primaryColor};
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
`
export const CustomButton = styled(Button)`
  font-size: 20px;
  color: white;
  &:hover{
    color:white ;
    opacity: .6;
  }
`

