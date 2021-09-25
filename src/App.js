import { Router, Switch } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from "jwt-decode";
import history from "./utils/history";
import './App.css';
import DefaultLayout from "./layouts/user/DefaultLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import HomePage from "./pages/user/Home";
import CartPage from "./pages/user/Cart";
import ProductDetailPage from "./pages/user/ProductDetail";
import ProductPage from "./pages/user/Product";
import RegisterPage from "./pages/Register";
import LoginUserPage  from "./pages/Login";
import DashboardPage from "./pages/admin/Dashboard";
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/themes';
import 'antd/dist/antd.less';
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import './assets/css/base.css'

import {
  getUserInfoAction,
} from './redux/actions'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      const decodedUserInfo = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserInfo.sub }));
    }
  }, []);
  
  return (
    <ThemeProvider theme={lightTheme}>
      <Router history={history}>
        <Switch>
          <DefaultLayout exact path="/" component={HomePage} />
          <DefaultLayout exact path="/register" component={RegisterPage} />
          <DefaultLayout exact path="/cart" component={CartPage} />
          <DefaultLayout exact path="/login" component={LoginUserPage} />
          <AdminLayout exact path="/admin" component={DashboardPage} />
          <DefaultLayout exact path="/product/:id" component={ProductDetailPage} />
          <DefaultLayout exact path="/:department" component={ProductPage} />
          {/*<DefaultLayout exact path="/about" component={AboutPage} />
        
        <DefaultLayout exact path="/cart" component={CartPage} />
        <DefaultLayout exact path="/checkout" component={CheckoutPage} />

        <AdminLayout exact path="/admin" component={DashboardPage} />
        <AdminLayout exact path="/admin/products" component={ProductListPage} />
        <AdminLayout exact path="/admin/categories" component={CategoryListPage} />
        <AdminLayout exact path="/admin/to-do-list" component={ToDoListPage} />

        <FullLayout exact path="/login" component={LoginPage} />
        <FullLayout exact path="/register" component={RegisterPage} />
        <FullLayout component={NotFoundPage} /> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
