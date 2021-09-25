import { Card, Row, Col, Input, Button, notification, List } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history';

import * as Style from './styles'

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from '../../../redux/actions';

function CartPage() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  function handlePlusCount(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count + 1,
    });
    dispatch(plusItemCountAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count - 1,
    });
    dispatch(minusItemCountAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleDeleteItem(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(deleteCartItemAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: 'Bạn chưa đăng nhập',
      });
    } else {
      history.push('/checkout');
    }
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Style.CardItem key={`cart-${cartItem.id}`} size="small" style={{ marginBottom: 8 }}>
          <Row gutter={[30, 30]}>
            <Col span={4} >
              <Style.imageItem productImage={cartItem.images[0]}></Style.imageItem>
            </Col >
            <Col span={20}>
              <Row gutter={[15, 10]}>
                <Col className="headerItem" span={24}>
                  <span className="title">{cartItem.name}</span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteItem(cartIndex)}
                  />
                </Col>
                <Col span={20}>
                  <span className="cart-info-tag">Thương hiệu: </span>
                  <span className="cart-info-text">{cartItem.trademark}</span>
                </Col>
                {cartItem.category
                  ? <Col span={20}>
                    <span className="cart-info-tag">Loại: </span>
                    <span className="cart-info-text">{cartItem.category}</span>
                  </Col>
                  : null
                }
                <Col span={20}>
                  <Input.Group compact>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleMinusCount(cartIndex)}
                    />
                    <Input value={cartItem.count} readOnly style={{ width: 40, textAlign: 'center' }} />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handlePlusCount(cartIndex)}
                    />
                  </Input.Group>
                </Col>
                <Col span={24} style={{ textAlign: "end" }} >
                  <span className="priceItem">{(cartItem.price * cartItem.count).toLocaleString()} đ</span>
                </Col>
              </Row>

            </Col>
          </Row>
        </Style.CardItem>
      );
    })
  }

  function renderCartList() {
    if (!userInfo.data.id) {
      return <div>Bạn cần đăng nhập để thêm vào giỏ</div>
    } else if (cartList.data.length > 0) {
      return (
        <>
          <Row gutter={[10, 10]}>
            <Col span={17}>
              {renderCartItems()}
            </Col>
            <Col span={7}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Card size="small" title="THỐNG KÊ GIỎ HÀNG">
                    <List size="small">
                      <List.Item>
                        <List.Item.Meta title={`${cartList.data.length} sản phẩm`} />
                        <div>{totalPrice.toLocaleString()}</div>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta title="Phí vận chuyển" />
                        <div>Miễn Phí</div>
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta title="Tổng tiền" />
                        <div>{totalPrice.toLocaleString()}</div>
                      </List.Item>
                    </List>
                  </Card>
                </Col>
                <Col span={24}>
                  <Button size="large" style={{ width: "100%" }} type="primary" onClick={() => handleCheckout()}>Thanh Toán</Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </>
      )
    } else {
      return <div>Giỏ hàng trống</div>
    }
  }

  return (
    <Style.CartContainer>
      <h3>SHOPPING BAG</h3>
      {renderCartList()}
    </Style.CartContainer>
  );
}

export default CartPage;