import { useEffect } from 'react';
import history from '../../utils/history';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select, Button, Checkbox, Space, Row, Col } from "antd";
import * as Style from './styles'
import { registerAction } from '../../redux/actions';

import coverImage from '../../assets/images/bia.jpg'
function RegisterPage() {

  const { responseAction } = useSelector((state) => state.userReducer);
  console.log('🚀 ~ file: index.jsx ~ line 14 ~ RegisterPage ~ responseAction', responseAction);
  const dispatch = useDispatch();
  const [registerForm] = Form.useForm();

  useEffect(() => {
    if (responseAction.register.error) {
      registerForm.setFields([
        {
          name: 'email',
          errors: [responseAction.register.error]
        },
      ]);
    }
  }, [responseAction.register])

  function handleSubmit(values) {
    dispatch(registerAction({
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        cart: [],
        role: 'user',
      },
    }));
  }
  return (
    <Style.RegisterContainer coverImage={coverImage}>
      <Style.BackgroundModal />
      <Style.RegisterForm>
        <div className="login-title">
          <h2>Create an Account</h2>
        </div>
        <Form
          form={registerForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Style.CustomFormItem
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Style.CustomFormItem>

          <Style.CustomFormItem
            label="Email"
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email!" }]}
          >
            <Input />
          </Style.CustomFormItem>

          <Style.CustomFormItem
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Style.CustomFormItem>

          <Style.CustomFormItem
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Bạn chưa nhập mật khẩu!" },
              { min: 6, max: 16, message: "Mật khẩu phải từ 6-16 kí tự" },
            ]}
          >
            <Input.Password />
          </Style.CustomFormItem>

          <Style.CustomFormItem
            label="Xác nhận mật khẩu"
            name="prePassword"
            rules={[
              { required: true, message: 'Bạn chưa xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu xác nhận không đúng!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Style.CustomFormItem>

          <Style.CustomFormItem
            name="agree"
            valuePropName="checked"
          >
            <Checkbox>Đồng ý với các điều khoản</Checkbox>
          </Style.CustomFormItem>

          <div style={{ display: 'inline-block', marginBottom: 16, color: 'gray' }}>
            Bạn đã có tài khoản?
            <Style.BtnLink type="link" onClick={() => history.push('/login')}>
              Đăng nhập
            </Style.BtnLink>
          </div>

          <Style.ButtonRegister
            type="primary"
            htmlType="submit"
            block
            loading={responseAction.register.load}
          >
            Đăng kí
          </Style.ButtonRegister>
        </Form>
      </Style.RegisterForm>

    </Style.RegisterContainer>
  );
}

export default RegisterPage;