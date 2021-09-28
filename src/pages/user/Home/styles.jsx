import styled, { keyframes } from 'styled-components'

export const SubBanner = styled.div`
  margin: 0 auto;
  padding-top: 80px ;
  max-width: 1100px;
  @media (max-width:991px) {
    padding-top: 40px ;
    padding-left: 30px;
    padding-right: 30px;
  }
`
export const VideoBox = styled.div`
  margin: 0 auto;
  padding-bottom: 80px ;
  max-width: 1100px;
  @media (max-width:991px) {
    padding-bottom: 40px ;
    padding-left: 30px;
    padding-right: 30px;
  }
`
export const Banner = styled.div`
  padding-top: 35%;
  background-image: url(${(props)=>props.image && props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  
`
export const BannerBox = styled.div`
  overflow :hidden ;
`
export const ProductContainer = styled.div`
  margin: 0 auto;
  padding: 80px 0 ;
  max-width: 1200px;
  @media (max-width:991px) {
    padding: 40px 0 ;
  }
`
export const SubBannerItem = styled.div`
  cursor: pointer;
`
export const CustomAppendDots = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 10px;
  padding: 10px;
`
export const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  @media (max-width:991px) {
    margin-bottom: 15px;
  }
`
export const CustomPaging = styled.div`
  width: 30px;
  padding:5px;
  &>div{
    border-radius:3px;
    height:1px;
    background: white;
    padding:2px;
    }
`