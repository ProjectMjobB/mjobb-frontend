import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Header from './../Layout/Header';
import { Modal } from 'react-bootstrap';
import Footer from './../Layout/Footer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { userConfirmedAction } from '../../store/actions/AuthActions';
import CompanyLinks from '../Element/CompanyLinks';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
const Company = (props) => {
  console.log(props);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [user, setUser] = useState({});
  const params = useParams();
  const userId = params.id;
  const [resume, setResume] = useState(false);
  const [point, setPoint] = useState();
  const [comment, setComment] = useState('');
  const [inputs, setInputs] = useState({
    email: user.email,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    foundationDate: user.foundationDate,
    country: user.country,
    city: user.city,
    about: user.about,
    website: user.website,
  });

  const getUserInfo = (userId) => {
    axios
      .get(`/api/v1.0/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getUserInfo(userId);
  }, [userId]);

  React.useEffect(() => {
    setInputs({
      email: user.email,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      foundationDate: user.foundationDate,
      country: user.country,
      city: user.city,
      about: user.about,
      website: user.website,
    });
  }, [user]);

  const addComment = (e) => {
    e.preventDefault();
    const data = {
      comment: comment,
      point: point,
    };
    axios
      .post(`/api/v1.0/comments/users/${userInfo.id}/comments`, data)
      .then((res) => {
        console.log(res);
        setResume(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <div className="profileImage">
                            <img src={user?.profileImage} alt="" />
                          </div>
                        </div>
                        <div className="candidate-title d-flex justify-content-center flex-column align-items-center">
                          <h4 className="m-b5">
                            <Link to={'#'}>{user?.name}</Link>
                          </h4>
                          <ReactStars
                            key={`rating_${user.generalPoint}`}
                            value={Math.max(0, user.generalPoint)}
                            edit={false}
                            count={5}
                            size={24}
                            isHalf={false}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                          <span>{user.generalPoint}</span>
                        </div>
                        <button
                          onClick={() => setResume(true)}
                          className="site-button"
                        >
                          Create Comment
                        </button>
                        <Modal
                          show={resume}
                          onHide={setResume}
                          className="modal fade modal-bx-info editor"
                        >
                          <div className=" my-0" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="ResumeheadlineModalLongTitle"
                                >
                                  Add Comment
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={() => setResume(false)}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form onSubmit={addComment}>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <ReactStars
                                          key={`rating_${point}`}
                                          value={Math.max(0, point)}
                                          count={5}
                                          onChange={(value) => setPoint(value)}
                                          size={24}
                                          edit={true}
                                          isHalf={false}
                                          emptyIcon={
                                            <i className="far fa-star"></i>
                                          }
                                          halfIcon={
                                            <i className="fa fa-star-half-alt"></i>
                                          }
                                          fullIcon={
                                            <i className="fa fa-star"></i>
                                          }
                                          activeColor="#ffd700"
                                        />
                                        <textarea
                                          value={comment}
                                          onChange={(e) =>
                                            setComment(e.target.value)
                                          }
                                          className="form-control"
                                          placeholder="Type Description"
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => setResume(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="submit"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                    </div>

                    <div className="row m-b30">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company Name"
                            name="firstName"
                            value={inputs.firstName}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Your Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="info@gmail.com"
                            name="email"
                            value={inputs.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Website</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Website Link"
                            name="website"
                            value={inputs.website}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Founded Date </label>
                          <input
                            type="text"
                            name="foundationDate"
                            className="form-control"
                            placeholder="2018"
                            value={inputs.foundationDate}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="city"
                            value={inputs.city}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="country"
                            className="form-control"
                            placeholder=""
                            name="country"
                            value={inputs.country}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="phone"
                            name="phoneNumber"
                            className="form-control"
                            placeholder=""
                            value={inputs.phoneNumber}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>About:</label>
                          <textarea
                            name="about"
                            className="form-control"
                            value={inputs.about}
                            readOnly
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </>
  );
};
export default Company;
