import { Row, Col, Menu, Dropdown,Badge, Button} from 'antd';
import history from '../../../utils/history';
import {  useState } from 'react'
import { ShoppingCartOutlined, SearchOutlined,DownOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  logoutAction,
} from '../../../redux/actions';

import * as Style from './styles'
import logo from '../../../assets/images/pc_logo1.png';
import vnIcon from '../../../assets/images/flagVietNam.png';
import enIcon from '../../../assets/images/flagEnglish.png';

function Header({sticky}) {
  
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const[language ,setLanguage ]=useState('VN');
  const menu = (
    <Menu >
      <Menu.Item 
      onClick={()=>setLanguage("EN")}
      key="1" 
      icon={<img src={enIcon} alt="" width="15px"/>}>
        EN
      </Menu.Item>
      <Menu.Item 
      onClick={()=>setLanguage("VN")}
      key="2" icon={<img src={vnIcon} alt="" width="15px"/>}>
        VN
      </Menu.Item>
    </Menu>
  );
  function handleLogout() {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
  };
  function renderUserDropdown() {
    return (
      <Menu>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item onClick={() => handleLogout()}>Logout</Menu.Item>
      </Menu>
    )
  };
  return (
    <>
      <Style.HeaderTop  className={sticky && "sticky"}>
        <Style.CustomSpace >
          <div>
          {userInfo.data.name
            ? (
              <Dropdown overlay={renderUserDropdown()} trigger={['click']}>
                <Style.Account avatar={userInfo.data.avatar}>
                  <div className="avatar"></div>
                  {userInfo.data.name}
                </Style.Account>
              </Dropdown>
            )
            : (
              <Style.CustomButton
              type="link"
              onClick={() => history.push({
                pathname: '/login',
                state: {
                  prevPath: history.location.pathname,
                },
              })}
            >
              Đăng ký / Đăng nhập
            </Style.CustomButton>
            )
          }
            
          </div>
          <Badge
            count={cartList.data.length}
            size="small"
            onClick={() => history.push('/cart')}
          >
          <Style.Cart>
            <ShoppingCartOutlined />
          </Style.Cart>
          </Badge>
          <Dropdown overlay={menu}>
            <Button>
            {language} <DownOutlined />
            </Button>
          </Dropdown>
        </Style.CustomSpace>
      </Style.HeaderTop>
      <Style.HeaderContainer >

        <Row
          style={{ alignItems: 'center' }}
          gutter={[10, 5]}>
          <Col sm={24}
            md={15}>
            <Style.Logo onClick={() => { history.push("/") }} src={logo} alt="" />
          </Col>
          <Col

            xs={24}
            sm={24}
            md={9}>
            <Style.InputSearch
              size="large"
              suffix={<SearchOutlined />}
              placeholder="Tìm kiếm..." />
          </Col>
        </Row>
      </Style.HeaderContainer>

    </>
  )
}
export default Header