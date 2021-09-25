import { Row, Col, Input, Space, Button } from 'antd';
import history from '../../../utils/history';
import * as Style from './styles'
import logo from '../../../assets/images/logo2.png';
function Header() {
 
  return (
    <>
    <div id="header_container" >
      <Style.HeaderConteiner >
        <Row 
          style={{alignItems:'center'}}
          gutter={[10, 5]}>
          <Col sm={24}
            md={6}>
            <Style.Logo onClick={()=>{history.push("/")}} src={logo} alt="" />
          </Col>
          <Col 
          
            xs={24}
            sm={24}
            md={10}>
            
          </Col>
          <Col
            style={{justifyContent:"flex-end"}}
            md={8}>
            <Style.CustomSpace >
              <div>
                <Style.CustomButton className="btn_link" type="link">Đăng Xuất</Style.CustomButton>
              </div>
              
            </Style.CustomSpace>
          </Col>
        </Row>
      </Style.HeaderConteiner>
      </div>
    </>
  )
}
export default Header