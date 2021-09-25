import styled, { keyframes } from 'styled-components'
import { Button} from "antd";
const showLogin = keyframes`
  from {
      opacity: 0;
      transform: translateX(100%);}
  to {
      opacity: 1;
      transform: translateX(0);}
`
export const LoginContainer = styled.div`
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
export const LoginForm = styled.div`
  padding: 80px 30px;
  min-width: 450px;
  animation: ${showLogin} linear .2s ;
  background-color: white;
  z-index: 1;
  box-shadow: 7px 7px 3px  ${(props) => props.theme.backgroundColor};
  @media (max-width:991px){
    padding: 30px 15px;
    min-width: auto;
  }
`
export const ButtonLogin = styled(Button)`
  width: 100%;
  font-size:20px;
  height: auto;
  background-color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor} ;
  &:hover{
    background-color: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor} ;
  }
`
export const FormFooter = styled.div`
  text-align: center;
  &>span{
    color:gray;
    font-size: 17px;
  }
  
`
export const BtnLink = styled(Button)`
    color: ${(props) => props.theme.primaryColor};
    font-size: 17px;
`