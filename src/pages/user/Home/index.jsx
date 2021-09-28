import { useEffect } from 'react';
import { Carousel, Row, Col } from 'antd';
import Aos from 'aos';

import { useSelector, useDispatch } from 'react-redux';
import {
  getProductListAction
} from '../../../redux/actions';

import RenderProduct from '../components/RenderProduct';
import banner1 from '../../../assets/images/banner1.jpg'
import banner2 from '../../../assets/images/banner2.jpg'
import banner3 from '../../../assets/images/banner3.jpg'
import banner4 from '../../../assets/images/banner4.jpg'
import banner5 from '../../../assets/images/banner5.jpg'
import lip from '../../../assets/images/lip.jpg'
import innisfree from '../../../assets/images/innisfree.jpg'
import deal from '../../../assets/images/deal.jpg'
import sunscreen from '../../../assets/images/sunscreen.jpg'
import "aos/dist/aos.css"
import * as Style from './styles'
const BANNER_IMAGES = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
]
const SUB_BANNER = [
  lip,
  deal,
  sunscreen,
  innisfree,
]
function HomePage() {

  const { productList } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductListAction({ page: 1 }));
  }, []);

  function handleShowMore() {
    dispatch(getProductListAction({
      page: productList.page + 1,
      more: true,
    }));
  }


  const settingsSlider = {
    dots: true,
    pauseOnHover: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, []);
  function renderBanner() {
    return BANNER_IMAGES.map((imgItem) => {
      return (
        <div>
          <Style.Banner image={imgItem} />
        </div>
      )
    })
  }
  function renderSubBanner() {
    return SUB_BANNER.map((imgItem) => {
      return (
        <Col md={12} xs={12}>
          <Style.SubBannerItem>
            <img data-aos="flip-left" style={{ width: '100%' }} src={imgItem} alt="" />
          </Style.SubBannerItem>
        </Col>
      )
    })
  }

  return (
    <>
      <Style.BannerBox>
        <Carousel {...settingsSlider}  >
          {renderBanner()}
        </Carousel>
      </Style.BannerBox>
      <Style.SubBanner>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          {renderSubBanner()}
        </Row>
      </Style.SubBanner>
      <Style.ProductContainer>
        <Style.Title>BEST ITEMS OF MONTH</Style.Title>
        <RenderProduct productList={productList} handleShowMore={handleShowMore} />
      </Style.ProductContainer>
      <Style.VideoBox>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col md={8} xs={12}>
            <iframe src='https://www.youtube.com/embed/OQcABcUFsZU'
              style={{ width: "100%" }}
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
              title='video'
            />
          </Col>
          <Col md={8} xs={12}>
            <iframe src='https://www.youtube.com/embed/80F2I-Rbn1k'
              style={{ width: "100%" }}
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
              title='video'
            />
          </Col>
          <Col md={8} xs={12}>
            <iframe src='https://www.youtube.com/embed/Wfd2hOgBSZ4'
              style={{ width: "100%" }}
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
              title='video'
            />
          </Col>
        </Row>
      </Style.VideoBox>

    </>
  )
}
export default HomePage