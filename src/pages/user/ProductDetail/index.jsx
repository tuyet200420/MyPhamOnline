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
              <span className="price_item">{parseInt(productItem.price).toLocaleString()}??</span>
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
                  <td>Gi??: </td>
                  <td>{price && price.toLocaleString()}??</td>
                </tr>
                <tr>
                  <td>S??? l?????ng: </td>
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
                    <td>Lo???i:</td>
                    <td>
                      {renderProductOption()}
                    </td>
                  </tr>
                  : null
                }

              </Style.TableBox>
              <Style.TotalPrice>T???ng c???ng: <span>{(price * quantity).toLocaleString()}??</span></Style.TotalPrice>
              <Style.customSpace >
                <Button className="add_cart" onClick={() => handleAddToCart()}>
                  Th??m v??o gi???
                </Button>
                <Button>
                  Mua ngay
                </Button>
              </Style.customSpace>
              <Style.Commit>
                <h4>CAM K???T KHI MUA S???M</h4>
                <ul>
                  <li>T?? v???n nhi???t t??nh & t???n t??m.</li>
                  <li>?????m b???o ngu???n g???c & ch???t l?????ng s???n ph???m.</li>
                  <li>T??ch l??y ??i???m, n??ng h???ng th??? VIP & t???n h?????ng ??u ????i ?????c quy???n.</li>
                </ul>
              </Style.Commit>
            </Col>
          </Row>
        </Style.PrInfor>
        <Style.SectionContainer>
          <h2><span>Chi Ti???t s???n ph???m</span></h2>
          <div className="description">
            Xu???t x???: H??n Qu???c/Quy c??ch: Tu??p 50g

            Th??ng tin s???n ph???m:

            Ch??ng ta th?????ng ch?? tr???ng v??o khu??n m???t, m?? b??? qua nh???ng b??? ph???n ?????c bi???t kh??c c???a c?? th???. Theo c??c chuy??n gia ch??m s??c s???c ?????p, da tay c??ng c???n ???????c l??m ?????p kh??ng k??m da m???t, th???m ch?? c???n ???????c ch??m s??c th?????ng xuy??n h??n. Do b??n tay c???a b???n ph???i l??m nhi???u c??ng vi???c trong ng??y, ti???p x??c v???i c??c ch???t b???n, n?????c, kh??i b???i, h??a ch???t???do v???y b??? t??n ph?? n???ng n??? h??n. Da tay th?????ng xuy??n b??? kh?? v?? nh??n nheo, x???n m??u th???m ch?? l?? m???c m???t s??? b???nh v??? da. Do v???y c???n s??? d???ng kem d?????ng da tay ????? d?????ng ???m, l??m tr???ng da v?? t??ng s???c ????? kh??ng cho da tay.

            Kem d?????ng tay Sunwoo Cosme Bio-Bee Bee Venom Hand Cream ch???a th??nh ph???n m???t ong, t???o c???m nh??? nh??ng khi b??i l??n tay, h??nh th??nh m??n ???m duy tr?? s??? hydrat h??a v?? d?????ng ch???t, gi??p cho l??n da m???m m???i h??n.
          </div>
        </Style.SectionContainer>
        <Style.SectionContainer className="show_product">
          <h2><span>B???n c?? th??? quan t??m</span></h2>
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