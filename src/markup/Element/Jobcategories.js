import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularCategoryAction,
  fetchPopularAllCategoryAction,
} from '../../store/actions/CategoryActions';
import { fetchPopularAllCategories } from '../../services/CategoryServise';

const selectCategories = (state) => state.CategoryReducer.categories;

function Jobcategories(props) {
  const [display, setDisplay] = useState(true);
  const categories = useSelector(selectCategories);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularCategoryAction());
  }, []);

  const handleFetch = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchPopularAllCategoryAction());
      setLoading(false);
    }, 1000);
    setDisplay(false);
  };

  return (
    <div className="row sp20">
      {categories.map((item) => (
        <div key={item.id} className="col-lg-3 col-md-6 col-sm-6">
          <div className="icon-bx-wraper">
            <div className="icon-content">
              <div className="icon-md text-primary m-b20">
                {/* <i className="ti-location-pin"></i> */}
              </div>
              <Link to={'/company-manage-job'} className="dez-tilte">
                {item.name}
              </Link>
              {/* <div className="rotate-icon">
                <i className="ti-location-pin"></i>
              </div> */}
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: loading ? 'block' : 'none' }}>Loading</div>
      <div className="col-lg-12 text-center m-t30">
        <button
          style={{ display: display ? 'inline-block' : 'none' }}
          className="site-button radius-xl"
          onClick={handleFetch}
        >
          All Categories
        </button>
      </div>
    </div>
  );
}

export default Jobcategories;
