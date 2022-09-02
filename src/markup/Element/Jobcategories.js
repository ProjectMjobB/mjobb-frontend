import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularCategoryAction,
  fetchPopularAllCategoryAction,
} from '../../store/actions/CategoryActions';
import { fetchPopularAllCategories } from '../../services/CategoryServise';
import { isAuthenticated } from '../../store/selectors/AuthSelectors';

const selectCategories = (state) => state.CategoryReducer.categories;

function Jobcategories(props) {
  console.log(props);
  const [display, setDisplay] = useState(true);
  const categories = useSelector(selectCategories);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopularCategoryAction());
  }, [props.isAuthenticated]);

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
              <Link
                to={`/browse-job-filter-grid/${item.id}`}
                className="dez-tilte"
              >
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(Jobcategories));
