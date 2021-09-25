import { useEffect, useState } from 'react';
import { Row, Col, Image, Slider } from 'antd'
import RenderProduct from '../components/RenderProduct'
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductListAction,
  getCategoryListAction,
  getDepartmentDetailAction
} from '../../../redux/actions';

import * as Style from './styles'
function ProductPage({ match }) {
  const { departmentDetail } = useSelector((state) => state.departmentReducer);
  const [priceRange, setPriceRange] = useState([0, 9000000]);
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  const departmentId = match.params.department;
  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  console.log("🚀 ~ file: index.jsx ~ line 18 ~ ProductPage ~ categoryList", categoryList)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction({ page: 1, departmentId }));
    dispatch(getCategoryListAction({ departmentId }));
    dispatch(getDepartmentDetailAction({id:departmentId}));
  }, []);
  
  console.log("🚀 ~ file: index.jsx ~ line 23 ~ ProductPage ~ departmentDetail", departmentDetail)

  useEffect(() => {
    dispatch(getProductListAction({ page: 1, departmentId }));
    dispatch(getCategoryListAction({ departmentId }));
    dispatch(getDepartmentDetailAction({id:departmentId}));
  }, [departmentId]);

  function handleShowMore() {
    dispatch(getProductListAction({
      page: productList.page + 1,
      more: true,
    }));
  }

  const optionsCatagory = categoryList.data.map((categoryItem, categoryIndex) => {
    return {
      label: categoryItem.name,
      value: categoryItem.id
    }
  })
  function handleFilterCategory(value) {
    setCategoriesSelect(value);
    dispatch(getProductListAction({
      page: 1,
      categoriesSelected:value,
      priceRange,
      departmentId
    }));
  }
  function handleRangePrice(value) {
    setPriceRange(value);
    dispatch(getProductListAction({
      page: 1,
      priceRange,
      departmentId,
      categoriesSelected,
    }));
  }

  return (
    <>
      <Style.ProductConatiner>
        <Row >
          <Col md={6}>
            <Style.ProductSlideBar>
              <div className="title">Tùy chọn</div>
              <Style.SlideItemBox>
                <div className="title">Loại: </div>
                <div className="item">
                  <Style.CheckBoxGroup
                    onChange={(value) => handleFilterCategory(value)}
                    value={categoriesSelected}
                    options={optionsCatagory} />
                </div>
              </Style.SlideItemBox>
              <Style.SlideItemBox>
                <div className="title">Giá: </div>
                <div className="item">
                  <Slider
                    min={0}
                    step={10000}
                    max={9000000}
                    onChange={(value) => handleRangePrice(value)}
                    tipFormatter={(value) => value.toLocaleString()}
                    value={priceRange}
                    range={{ draggableTrack: true }}
                  />
                </div>
              </Style.SlideItemBox>
            </Style.ProductSlideBar>
          </Col>
          <Col md={18}>
            <Row>
              <div className="banner">
                <img src="https://theme.hstatic.net/1000223746/1000664307/14/banner_collec_3.jpg?v=118" alt="" width="100%" />
              </div>
            </Row>
            <Row>
              <Style.ShowPro>
                <div className="title">{departmentDetail.data?.name}</div>
                <RenderProduct productList={productList} handleShowMore={handleShowMore} />
              </Style.ShowPro>
            </Row>
          </Col>
        </Row>
      </Style.ProductConatiner>
      
    </>
  )
}
export default ProductPage;