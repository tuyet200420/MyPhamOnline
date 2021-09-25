import styled from 'styled-components'
export const mainContainer = styled.div`
  position: relative;
  
`
export const contentContainer = styled.div`
  padding: 40px 80px;
  ${(props) =>props.isShowSiderBar && 'margin-left: 243px;'}
  transition: all .3s;
  
`