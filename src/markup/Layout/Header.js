import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Logout from './Logout';
import { getUserInfo, isUserLoggedIn } from '../../services/AuthService';
import logo2 from './../../images/logo.png';
import { connect } from 'react-redux';
import { getUserInfos } from '../../store/selectors/AuthSelectors';
import { useDispatch, useSelector } from 'react-redux';

var bnr3 = require('./../../images/background/bg3.jpg');
const Header = (props) => {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  React.useEffect(() => {
    // sidebar open/close
    // setUserInfo(user?.roleNames[0]?.name);

    var Navicon = document.querySelector('.navicon');
    var sidebarmenu = document.querySelector('.myNavbar ');

    function toggleFunc() {
      sidebarmenu.classList.toggle('show');
      //   Navicon.classList.toggle('open');
    }
    Navicon.addEventListener('click', toggleFunc);

    // Sidenav li open close
    var navUl = [].slice.call(
      document.querySelectorAll('.navbar-nav > li > a, .sub-menu > li > a')
    );
    for (var y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener('click', function () {
        checkLi(this);
      });
    }

    function checkLi(current) {
      current.parentElement.parentElement
        .querySelectorAll('li')
        .forEach((el) =>
          current.parentElement !== el ? el.classList.remove('open') : ''
        );
      setTimeout(() => {
        current.parentElement.classList.toggle('open');
      }, 100);
    }
  }, []);

  return (
    <>
      <header className="site-header mo-left header fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to={'/'}>
                  <img src={logo2} className="logo" alt="img" />
                </Link>
              </div>

              <button
                className="navbar-toggler collapsed navicon  justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className="extra-nav">
                <div className="extra-cell">
                  {isUserLoggedIn() ? (
                    <>
                      <Logout />
                    </>
                  ) : (
                    <>
                      <Link to={'/login'} className="site-button">
                        <i className="fa fa-user"></i> Sign In
                      </Link>
                      <Link to={'/register'} className="site-button">
                        <i className="fa fa-user"></i> Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div
                className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                id="navbarNavDropdown"
              >
                <div className="logo-header mostion d-md-block d-lg-none">
                  <Link to={'/'} className="dez-page">
                    <img src={logo2} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li className="">
                    <Link to={'home'}>
                      {' '}
                      Home <i className="dez-page"></i>
                    </Link>
                    {/* <ul className="sub-menu">
												<li><Link to={"./"} className="dez-page">Home 1</Link></li>
												<li><Link to={"/index-2"} className="dez-page">Home 2</Link></li>
											</ul> */}
                  </li>
                  <li>
                    <Link to={'/browse-job-filter-grid'} className="dez-page">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to={'/about-us'} className="dez-page">
                      About Us
                    </Link>
                  </li>
                  {props.userRoles === 'ROLE_COMPANY' ? (
                    <li>
                      <Link to={'/company-profile'} className="dez-page">
                        Company Profile
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={'/employee-profile'} className="dez-page">
                        My Profile
                      </Link>
                    </li>
                  )}

                  {props.userRoles === 'ROLE_COMPANY' && (
                    <li>
                      <Link to={'/company-post-jobs'} className="dez-page">
                        Post A Jobs
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*  Model Start */}
      <Modal
        className=" lead-form-modal"
        show={show}
        onHide={handleClose}
        centered
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body row m-a0 clearfix">
              <div
                className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                style={{
                  backgroundImage: 'url(' + bnr3 + ')',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="form-info text-white align-self-center">
                  <h3 className="m-b15">Login To You Now</h3>
                  <p className="m-b15">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry has been the industry.
                  </p>
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to={'#'} className="m-r10 text-white">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={'#'} className="m-r10 text-white">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={'#'} className="m-r10 text-white">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={'#'} className="m-r10 text-white">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={'#'} className="m-r10 text-white">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-a0">
                <div className="lead-form browse-job text-left">
                  <form>
                    <h3 className="m-t0">Personal Details</h3>
                    <div className="form-group">
                      <input className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="clearfix">
                      <button
                        type="button"
                        className="btn-primary site-button btn-block"
                      >
                        Submit{' '}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/*  Model END */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userRoles: getUserInfos(state),
  };
};

export default withRouter(connect(mapStateToProps)(Header));
