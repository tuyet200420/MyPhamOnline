import { Space } from 'antd'
import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history'
import { MenuOutlined ,DownOutlined } from '@ant-design/icons';

import {
  getDepartmentListAction
} from '../../../redux/actions';

import * as Style from './styles'

const NAV_MENU = [
  {
    title: "DANH MỤC SẢN PHẨM",
    path: "",
    icon: "",
    subMenu: [
    ]
  },
  {
    title: "GIỚI THIỆU",
    path: "/chamsocdamat",
    icon: "",
    subMenu: [],
  },
  {
    title: "BLOG",
    path: "/chamsocbody",
    icon: "",
    subMenu: [],
  },
  {
    title: "HOT SALE",
    path: "/chamsoctoc",
    icon: "",
    subMenu: [],
  },
  {
    title: "HÀNG MỚI VỀ",
    path: "/chamsoctoc",
    icon: "",
    subMenu: [],
  },


]
function NavBar({ location, sticky }) {

  const { departmentList } = useSelector((state) => state.departmentReducer);
  const [showSubMenu,setShowSubMenu]=useState(false)
  console.log("🚀 ~ file: index.jsx ~ line 54 ~ NavBar ~ showSubMenu", showSubMenu)
 

  // document.addEventListener("click", ()=>{
  //   setShowSubMenu(!showSubMenu)
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartmentListAction());
  }, []);
  NAV_MENU[0].subMenu = [
    ...departmentList.data
  ]
  function test(e){
   
  console.log("🚀 ~ file: index.jsx ~ line 70 ~ test ~ e", e)
    
  }
  console.log("🚀 ~ file: index.jsx ~ line 60 ~ NavBar ~ NAV_MENU", NAV_MENU)
  const [showMenu, setShowMenu] = useState(false)
  function renderSubMenu(submenuArray) {
    return submenuArray.map((submenuItem,submenuIndex) => {
      return (
        <>
          <div>
            <p onClick={()=>history.push(`/${submenuItem.id}`)}>{submenuItem.name}</p>
          </div>
        </>
      )
    })
  }
  function renderMenu() {
    return NAV_MENU.map((menuItem, menuIndex) => {
      return (
        <Style.MenuItem>
          <p
            key={`navbar-${menuIndex}`}
            active={location.pathname === menuItem.path}
            onClick={(e) => test(e)}
          >
            {menuItem.title} {menuItem.icon}

          </p>
          <Style.SubMenu>
            {renderSubMenu(menuItem.subMenu)}
          </Style.SubMenu>
        </Style.MenuItem>

      )
    })
  }
  return (
    <Style.NavbarContainer className={sticky && "sticky"} >
      <Style.NavbarContent>
        <Style.Menu onClick={() => setShowMenu(!showMenu)}><MenuOutlined /> <span>MENU</span></Style.Menu>
        <Style.CustomSpace showMenu={showMenu} >
          {renderMenu()}
        </Style.CustomSpace>

      </Style.NavbarContent>
    </Style.NavbarContainer>
  )
}
export default NavBar