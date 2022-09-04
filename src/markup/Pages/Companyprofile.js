import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userConfirmedAction } from '../../store/actions/AuthActions';
import CompanyLinks from '../Element/CompanyLinks';

const token = (state) => state.auth.auth.access_token;

const Companyprofile = (props) => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [rating, setRating] = useState();
  const access_token = useSelector(token);
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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = inputs;
    formData['profileImage'] = file;
    // formData['generalPoint'] = rating;
    axios
      .post('/api/v1.0/users/update', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(userConfirmedAction(res.data));
      });
  };
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

  const someFileMethods = (value) => {
    setFile(value);
  };
  const someRatingMethods = (value) => {
    setRating(value);
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
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
                <CompanyLinks
                  someFileMethods={someFileMethods}
                  someRatingMethods={someRatingMethods}
                />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                      <Link
                        to={'/company-profile'}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={onSubmit}>
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Update Setting
                      </button>
                    </form>
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
export default Companyprofile;
