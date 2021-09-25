import { useEffect } from 'react';
// import history from '../../utils/history';
import { Form, Input, Select, Button, Checkbox, Space, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions';

import * as Style from './styles'

import coverImage from '../../assets/images/bia.jpg'

function LoginPage({ history }) {
console.log("🚀 ~ file: index.jsx ~ line 13 ~ LoginPage ~ history", history)

  const { responseAction } = useSelector((state) => state.userReducer);
  const prevPath = history.location.state?.prevPath;
  console.log("🚀 ~ file: index.jsx ~ line 16 ~ LoginPage ~ prevPath", prevPath)
  const dispatch = useDispatch();
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (responseAction.login.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' ']
        },
        {
          name: 'password',
          errors: [responseAction.login.error]
        },
      ]);
    }
  }, [responseAction.login])
  
  function handleSubmit(values) {
    dispatch(loginAction({
      data: values,
      prevPath
    }));
  }

  return (
    <Style.LoginContainer coverImage={coverImage} >
      <Style.BackgroundModal></Style.BackgroundModal>
      <Style.LoginForm>
        <div className="login-title">
          <h2>ĐĂNG NHẬP</h2>
        </div>
        <Form
          form={loginForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Style.BtnLink type="link" >
                Forgot password
              </Style.BtnLink>
            </div>
          </Form.Item>

          <Form.Item>
            <Style.ButtonLogin 
              type="primary" 
              htmlType="submit" 
              className="login-form-button"
              loading={responseAction.login.load}
            >
              ĐĂNG NHẬP
            </Style.ButtonLogin>
          </Form.Item>
          <Style.FormFooter><span>Bạn chưa có tài khoản?</span><Style.BtnLink type="link" onClick={() => history.push('/register')}>register now!</Style.BtnLink></Style.FormFooter>
        </Form>
      </Style.LoginForm>
    </Style.LoginContainer>
  );
}

export default LoginPage;