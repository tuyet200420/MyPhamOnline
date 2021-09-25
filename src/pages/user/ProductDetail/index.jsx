import { Col, Row, Button, Space, Image, Tag } from 'antd'
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import * as Icon from '@ant-design/icons'
import ReactImageMagnify from 'react-image-magnify';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination, Navigation
} from 'swiper';

import history from '../../../utils/history';
import { useSelector, useDispatch } from 'react-redux';

import * as Style from './styles';

import {
  getProductDetailAction,
  getProductListAction,
  addToCartAction
} from '../../../redux/actions';

SwiperCore.use([Pagination, Navigation]);

function ProductDetailPage({ match }) {

  const { CheckableTag } = Tag;
  const [selectedTags, setSelectedTags] = useState(1);
  const [swiper, setSwiper] = useState(null);
  const slideTo = (index) => {
    if (swiper) swiper.slideTo(index);
  };

  const productId = parseInt(match.params.id);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const [categoryOption, setCategoryOption] = useState(productDetail.data.productOptions?.length > 0 ?productDetail.data.productOptions[0].name : null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, []);
  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, [productId]);
  useEffect(() => {
    dispatch(getProductListAction({ categoryId: productDetail.data.categoryId }));
    setPrice(productDetail.data.price)
  }, [productDetail.data]);

  const qtyRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  function handleAddToCart() {
    const cartData = [...cartList.data];
    const cartIndex = cartData.findIndex((item) =>{
      return item.productId === productId && item.price === price
    });
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + quantity,
      });
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: cartData },
      }));
    } else {
      const newCartData = [
        ...cartData,
        {
          ...productDetail.data,
          id: uuidv4(),
          productId: productId,
          price: price,
          count: quantity,
          category: categoryOption

        }
      ]
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      }));
    }

  }

  function renderProductOption() {

    return productDetail.data?.productOptions.map((tag) => {
      return (
        <Space>
          <CheckableTag
            checked={selectedTags == tag.id}
            onClick={() => {
              setCategoryOption(tag.name)
              setSelectedTags(tag.id)
              setPrice(productDetail.data.price + tag.price)
            }}
            key={`${tag.name}-${tag.id}`}
          >
            {tag.name}
          </CheckableTag>
        </Space>
      )
    })

  }

  function renderProduct() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <SwiperSlide key={productIndex - productItem.images}>
          <Style.ProductItem
          >
            <div
              onClick={() => history.push(`/product/${productItem.id}`)}
              key={`product-${productIndex}`}
            >
              <Style.ProductImg backgroundImg={productItem.images[0]}></Style.ProductImg>
              <Style.ProductTitle>[{productItem.trademark}]{productItem.name}</Style.ProductTitle>
              <span className="price_item">{parseInt(productItem.price).toLocaleString()}đ</span>
            </div>
            <Style.CustomSpace className="active">
              <Style.CustomButton ><Icon.EyeOutlined /></Style.CustomButton>
              <Style.CustomButton onClick={() => history.push('/kiki')}><Icon.ShoppingCartOutlined /></Style.CustomButton>
            </Style.CustomSpace>
          </Style.ProductItem>

        </SwiperSlide>
      )
    })
  }

  return (
    <>
      <Style.PrDetailContainer>
        <Style.PrInfor>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 100 }, { xs: 8, sm: 16, md: 50, lg: 50 }]}>
            <Col md={12}>
              <Image.PreviewGroup>
                <Swiper onSwiper={setSwiper}>
                  {productDetail.data?.images?.map((image) => {
                    return (
                      <SwiperSlide className="slide-item">
                        <Image
                          backgroundImg={image}
                          style={{ maxHeight: 500 }}
                          className="slide-image"
                          src={image}
                          placeholder={<div className="bg-animate" />}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Image.PreviewGroup>
              <Swiper
                style={{ marginTop: 10 }}
                spaceBetween={10}
                slidesPerView={5}
                className="mySwiper"
              >
                {productDetail.data?.images?.map((image, index) => {
                  return (
                    <SwiperSlide key={index - image}>
                      <Style.ProductImg
                        placeholder={<div className="bg-animate" />}
                        backgroundImg={image}
                        preview={false}
                        onClick={() => slideTo(index)}
                      ></Style.ProductImg>

                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
            <Col md={12}>
              <Style.PrInforTitle>[{productDetail.data.trademark}] {productDetail.data.name}</Style.PrInforTitle>
              <Style.StarBox><Style.StarFill /><Style.StarFill /><Style.StarFill /><Style.StarFill /><Style.Star /></Style.StarBox>
              <Style.TableBox>
                <tr>
                  <td>Giá: </td>
                  <td>{price && price.toLocaleString()}đ</td>
                </tr>
                <tr>
                  <td>Số lượng: </td>
                  <td><Space size={0}>
                    <Style.customBtn disabled={qtyRef.current && parseInt(qtyRef.current.value) > 2 ? false : true}
                      onClick={() => {
                        setQuantity(parseInt(qtyRef.current.value) - 1)
                      }}>-</Style.customBtn>
                    <Style.customInputNumber value={quantity} readOnly={true} ref={qtyRef} />
                    <Style.customBtn
                      onClick={() => {
                        setQuantity(parseInt(qtyRef.current.value) + 1)
                      }}
                    >+</Style.customBtn>
                  </Space></td>

                </tr>
                {productDetail.data.productOptions?.length
                  ? <tr>
                    <td>Loại:</td>
                    <td>
                      {renderProductOption()}
                    </td>
                  </tr>
                  : null
                }

              </Style.TableBox>
              <Style.TotalPrice>Tổng cộng: <span>{(price * quantity).toLocaleString()}đ</span></Style.TotalPrice>
              <Style.customSpace >
                <Button className="add_cart" onClick={() => handleAddToCart()}>
                  Thêm vào giỏ
                </Button>
                <Button>
                  Mua ngay
                </Button>
              </Style.customSpace>
              <Style.Commit>
                <h4>CAM KẾT KHI MUA SẮM</h4>
                <ul>
                  <li>Tư vấn nhiệt tình & tận tâm.</li>
                  <li>Đảm bảo nguồn gốc & chất lượng sản phẩm.</li>
                  <li>Tích lũy điểm, nâng hạng thẻ VIP & tận hưởng ưu đãi đặc quyền.</li>
                </ul>
              </Style.Commit>
            </Col>
          </Row>
        </Style.PrInfor>
        <Style.SectionContainer>
          <h2><span>Chi Tiết sản phẩm</span></h2>
          <div className="description">
            Xuất xứ: Hàn Quốc/Quy cách: Tuýp 50g

            Thông tin sản phẩm:

            Chúng ta thường chú trọng vào khuôn mặt, mà bỏ qua những bộ phận đặc biệt khác của cơ thể. Theo các chuyên gia chăm sóc sắc đẹp, da tay cũng cần được làm đẹp không kém da mặt, thậm chí cần được chăm sóc thường xuyên hơn. Do bàn tay của bạn phải làm nhiều công việc trong ngày, tiếp xúc với các chất bẩn, nước, khói bụi, hóa chất…do vậy bị tàn phá nặng nề hơn. Da tay thường xuyên bị khô và nhăn nheo, xỉn màu thậm chí là mắc một số bệnh về da. Do vậy cần sử dụng kem dưỡng da tay để dưỡng ẩm, làm trắng da và tăng sức đề kháng cho da tay.

            Kem dưỡng tay Sunwoo Cosme Bio-Bee Bee Venom Hand Cream chứa thành phần mật ong, tạo cảm nhẹ nhàng khi bôi lên tay, hình thành màn ẩm duy trì sự hydrat hóa và dưỡng chất, giúp cho làn da mềm mại hơn.
          </div>
        </Style.SectionContainer>
        <Style.SectionContainer className="show_product">
          <h2><span>Bạn có thể quan tâm</span></h2>
          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={15}
              navigation={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                767: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 7,
                },
              }}
              className="mySwiper"
            >
              {renderProduct()}
            </Swiper>
          </div>
        </Style.SectionContainer>
      </Style.PrDetailContainer>
    </>
  )
}
export default ProductDetailPage