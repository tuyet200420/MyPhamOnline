import { Route } from "react-router-dom";
import { useState } from 'react';
import Header from "../Header";
import SiderBar from "../SiderBar";

import * as Style from "./styles"
function AdminLayout(props) {
  const [isShowSiderBar,setIsShowSiderBar]=useState(true);
  const { exact, path, component: Component } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header/>
            <Style.mainContainer>
              <SiderBar 
                isShowSiderBar={isShowSiderBar}
                setIsShowSiderBar = {setIsShowSiderBar}
               {...routeProps} />
              <Style.contentContainer isShowSiderBar={isShowSiderBar} >
                <Component {...routeProps} />
              </Style.contentContainer>
            </Style.mainContainer>
          </>
        )
      }}
    />
  );

}
export default AdminLayout