import styled from "styled-components"

export const Container = styled.div`
  margin:0 auto;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;
  padding: 80px 20px;
  &>h3{
    font-size: 23px;
    color: #e75280;
    border-bottom: 1px solid #9a918d;
    text-transform: uppercase;
  }`
  export const ImageItem = styled.div`
  width:80%;
  padding-top: 80%;
  background-image: url(${(props) => (props.image ? props.image : null)});
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #dee2e6;
`;