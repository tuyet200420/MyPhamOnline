import styled, { keyframes } from 'styled-components'
import { Button,Form} from "antd";
const showRegister = keyframes`
  from {
      opacity: 0;
      transform: translateX(100%);}
  to {
      opacity: 1;
      transform: translateX(0);}
`
export const RegisterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 100px;
  background-image:url(${(props)=>props.coverImage && props.coverImage } );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media (max-width:991px){
    padding: 30px 15px;
    background-size: cover;
  }

`
export const BackgroundModal = styled.div`
  position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.308);
    width: 100%;
    height: 100%;
`
export const RegisterForm = styled.div`
  padding: 40px 30px;
  min-width: 450px;
  animation: ${showRegister} linear .2s ;
  background-color: white;
  z-index: 1;
  box-shadow: 7px 7px 3px  ${(props) => props.theme.backgroundColor};
  @media (max-width:991px){
    padding: 30px 15px;
    min-width: auto;
  }
`
export const CustomFormItem = styled(Form.Item)`
  margin-bottom: 15px;
  & div{
    padding: 0 !important;
  }
`
export const ButtonRegister = styled(Button)`
  width: 100%;
  font-size:20px;
  height: auto;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor} ;
  &:hover{
    background-color: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor} ;
  }
`
export const BtnLink = styled(Button)`
    color: ${(props) => props.theme.primaryColor};
    font-size: 17px;
`