import { Col, Row, BackTop, Button,Tooltip } from 'antd'
import { UpOutlined } from '@ant-design/icons';
import history from '../../../utils/history'

import logoFooter from '../../../assets/images/pc_footer_logo.png'
import * as Style from './styles'

const NAVIGETER_LIST = [
  {
    titleLisst: 'my account',
    listAccess: [

      {
        titleItem: 'My Account',
        path: '/myAccount'
      },
      {
        titleItem: 'Customer Service',
        path: '/customerService'
      },
      {
        titleItem: 'Shipping',
        path: '/shipping'
      },
      {
        titleItem: 'STYLEKOREAN Reward',
        path: '/styleKoreanReward'
      }
    ]
  },
  {
    titleLisst: 'Join us',
    listAccess: [

      {
        titleItem: 'Join StyleKorean!',
        path: '/joinStyleKorean!'
      },
      {
        titleItem: 'Careers',
        path: '/careers'
      },
      {
        titleItem: 'Wholesale(B2B)',
        path: '/wholesale'
      },
      {
        titleItem: 'Affiliate Program',
        path: '/affiliateProgram'
      }
    ]
  },
  {
    titleLisst: 'CORPORATE INFORMATION',
    listAccess: [

      {
        titleItem: 'About us',
        path: '/aboutUs'
      },
      {
        titleItem: 'Contact Us',
        path: '/contactUs'
      },
      {
        titleItem: 'Site Map',
        path: '/siteMap'
      },
      {
        titleItem: 'Mobile Version',
        path: '/mobileVersion'
      }
    ]
  },
  {
    titleLisst: 'POLICIES',
    listAccess: [

      {
        titleItem: 'Privacy',
        path: '/privacy'
      },
      {
        titleItem: 'Return',
        path: '/return'
      },
      {
        titleItem: 'Terms of Use',
        path: '/termsOfUse'
      },
    ]
  }
]

function Footer() {
  function renderListAccessItem(arrayListAccess) {
    return arrayListAccess.map((item, index) => {
      return (
        <>
          <li onClick={() => history.push(item.path)}
            key={`navlist-${index}`}
          >
            {item.titleItem}
          </li>
        </>
      )
    })
  }
  function renderNavigerterList() {
    return NAVIGETER_LIST.map((item) => {
      return (
        <Col md={6} xs={12}>
          <Style.NavigeterTitle>{item.titleLisst}</Style.NavigeterTitle>
          <Style.AccessList>
            {renderListAccessItem(item.listAccess)}
          </Style.AccessList>
        </Col>
      )
    })
  }
  return (
    <>
      <footer>
        <Style.FooterTop>
          <Style.FooterTopContent>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {renderNavigerterList()}
            </Row>
          </Style.FooterTopContent>
        </Style.FooterTop>
        <Style.FooterBottom>
          <Style.FooterBottomContent>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              <Col md={6} >
                <img src={logoFooter} alt="" width="100%" />
              </Col>
              <Col md={17} md={{ offset: 2 }} xs={{ offset: 0 }}>
                <p>SILICON2 CO.,LTD - STYLE KOREAN.COM | CEO Kim Sung Woon | Business Licence No. 214-87-03359</p>
                <p>#907, Phase S. H-SQUARE, 680 Sampyeong-Dong, Bundang-Gu, Seongnam-City, Gyeonggi-Do, Korea</p>
                <p>Copyright © Since 2012 StyleKorean.com All Rights Reserved.</p>
              </Col>
            </Row>
          </Style.FooterBottomContent>
        </Style.FooterBottom>
      </footer>
      <BackTop>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<UpOutlined />} />
        </Tooltip>
      </BackTop>
    </>
  )
}
export default Footer;