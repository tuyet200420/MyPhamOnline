import history from "../../../utils/history"
import * as Style from "./styles"
import { MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons';

const SIDEBAR_MENU = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: '',
  },
  {
    title: 'Product Manage',
    path: '/admin/products',
    icon: '',
  },
  {
    title: 'Category Manage',
    path: '/admin/categories',
    icon: '',
  },
  {
    title: 'To Do List',
    path: '/admin/to-do-list',
    icon: '',
  }
]
function SiderBar({location,isShowSiderBar,setIsShowSiderBar }) {
  
  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
        <div
          key={`sidebar-${sidebarIndex}`}
          active={location.pathname === sidebarItem.path}
          onClick={() => history.push(sidebarItem.path)}
        >
          <Style.menuItem>{sidebarItem.title}</Style.menuItem>
        </div>
      )
    })
  }
  return (
    <Style.SiderBarContainer isShowSiderBar={isShowSiderBar}>
      <Style.menuIcon
        onClick={()=>{setIsShowSiderBar(!isShowSiderBar)}}
      >{isShowSiderBar?<MenuFoldOutlined /> : <MenuUnfoldOutlined/> }</Style.menuIcon>
      {renderSidebarMenu()}
    </Style.SiderBarContainer>
  )
}
export default SiderBar