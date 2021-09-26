import { useEffect ,useState} from 'react'
import { Card, Row, Col, Input,Select, Button, Form, Radio, Space, Table,InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import * as Style from './styles'

import { orderProductAction } from '../../../redux/actions';

function CheckoutPage() {

  const { Option } = Select;
  const [checkoutForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });
  const [locationSelect, setLocationSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      const wards = await axios.get(
        "https://location-api-vn.herokuapp.com/wards"
      );
      const districts = await axios.get(
        "https://location-api-vn.herokuapp.com/districts"
      );
      const cities = await axios.get(
        "https://location-api-vn.herokuapp.com/cities"
      );
      setLocation({
        wards: wards.data,
        districts: districts.data,
        cities: cities.data,
      });
      setLoading(false);
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  function handleOrder(values) {
    dispatch(orderProductAction({
      id: userInfo.data.id,
      data: {
        userId: userInfo.data.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address:
            values.address +
            " - " +
            location.wards.find((ward) => ward.code === values.ward)?.name +
            " - " +
            location.districts.find(
              (district) => district.code === values.district
            )?.name +
            " - " +
            location.cities.find((city) => city.code === values.city)?.name,
        products: cartList.data,
        totalPrice,
        checkoutInfo: values.checkoutInfo,
        status: 'waiting',
      }
    }))
  }


  const tableColumn = [
    {
      dataIndex: "images",
      width: 100,
      key: "images",
      render: (value) => <Style.ImageItem image={value[0]}></Style.ImageItem>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'category',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
  ];
  const carlistData = cartList.data.map((cartItem, cartIndex) => {
    totalPrice = totalPrice + cartItem.price * cartItem.count;
    return {
      key: cartIndex,
      ...cartItem,
    };
  });

  const handleChangeCity = (value) => {
    setLocationSelect({
      ...locationSelect,
      city: value,
    });
  };
  const handleChangeDistrict = (value) => {
    setLocationSelect({
      ...locationSelect,
      district: value,
    });
  };
  const handleChangeWard = (value) => {
    setLocationSelect({
      ...locationSelect,
      ward: value,
    });
  };

  return (
    <Style.Container>
      <h3>Tiến hành kiểm tra</h3>
      <Form
        form={checkoutForm}
        name="basic"
        onFinish={(value)=>{handleOrder(value)}}
        layout="vertical"
        initialValues={{
          name: userInfo.data.name,
          email: userInfo.data.email,
        }}
        onFinish={(values) => handleOrder(values)}
      >
        <Card title="Thông tin đơn hàng" size="small">
          <Table
            pagination={false}
            size="small"
            columns={tableColumn}
            dataSource={carlistData}
          />
          <h4 style={{textAlign:"end",marginTop:20}}>Tổng giá : {totalPrice.toLocaleString()}vnđ </h4>
        </Card>
        <Card title="Thông tin cá nhân" size="small" style={{ margin: '16px 0' }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Tên người nhận"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <InputNumber style={{width:'100%'}}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/TP"
                name="city"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Select
                  placeholder="Chọn tỉnh thành phố"
                  onChange={handleChangeCity}
                  allowClear
                >
                  {location.cities.map((city, cityIndex) => {
                    return (
                      <Select.Option key={cityIndex} value={city.code}>
                        {city.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                label="Quận-Huyện"
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quận huyện!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn quận huyện"
                  onChange={handleChangeDistrict}
                  allowClear
                >
                  {location.districts
                    .filter(
                      (district, districtIndex) =>
                        district.parentcode === locationSelect.city
                    )
                    .map((districtItem, districtIndex) => {
                      return (
                        <Select.Option
                          key={districtIndex}
                          value={districtItem.code}
                        >
                          {districtItem.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                label="Phường-Xã"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phường xã!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn phường xã"
                  onChange={handleChangeWard}
                  allowClear
                >
                  {location.wards
                    .filter(
                      (ward, wardIndex) =>
                        ward.parentcode === locationSelect.district
                    )
                    .map((wardItem, wardIndex) => {
                      return (
                        <Select.Option key={wardIndex} value={wardItem.code}>
                          {wardItem.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ cụ thể"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Thông tin thanh toán" size="small">
          <Form.Item name="checkoutInfo">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="momo">Momo</Radio>
                <Radio value="zalo">Zalo Pay</Radio>
                <Radio value="atm">Thẻ ATM</Radio>
                <Radio value="visa">Thẻ VISA, Master, JCB</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Button
          htmlType="submit"
          type="primary"
          style={{ marginTop: 16 }}
        >
          Thanh Toán
        </Button>
      </Form>
    </Style.Container>
  );
}

export default CheckoutPage;