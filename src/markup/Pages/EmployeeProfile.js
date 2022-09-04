import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Profilesidebar from '../Element/Profilesidebar';
import { useDispatch, useSelector } from 'react-redux';
import { userConfirmedAction } from '../../store/actions/AuthActions';
import axios from 'axios';
import { Form } from 'react-bootstrap';
function EmployeeProfile() {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    foundationDate: user.foundationDate,
    country: user.country,
    city: user.city,
    about: user.about,
    areaOfInterest: user.areaOfInterest,
    requestedWorkingType: user.requestedWorkingType,
    yearsOfExperience: user.yearsOfExperience,
    currentSalary: user.currentSalary,
    requestedSalary: user.requestedSalary,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = inputs;
    formData['profileImage'] = file;
    console.log(formData);
    axios.post('/api/v1.0/users/update', formData).then((res) => {
      dispatch(userConfirmedAction(res.data));
    });
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const someFileMethods = (value) => {
    setFile(value);
  };
  React.useEffect(() => {
    setInputs({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      foundationDate: user.foundationDate,
      country: user.country,
      city: user.city,
      about: user.about,
      areaOfInterest: user.areaOfInterest,
      requestedWorkingType: user.requestedWorkingType,
      yearsOfExperience: user.yearsOfExperience,
      currentSalary: user.currentSalary,
      requestedSalary: user.requestedSalary,
    });
  }, [user]);
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar someFileMethods={someFileMethods} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Basic Information
                      </h5>
                      <Link
                        to={'./'}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={onSubmit}>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>First Name</label>
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
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Company Name"
                              name="lastName"
                              value={inputs.lastName}
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
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Interested </label>
                            <input
                              type="text"
                              name="areaOfInterest"
                              className="form-control"
                              placeholder="2018"
                              value={inputs.areaOfInterest}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Working Type </label>
                            <Form.Control
                              value={inputs.requestedWorkingType}
                              as="select"
                              custom
                              className="custom-select"
                              name="requestedWorkingType"
                              onChange={handleChange}
                            >
                              <option value="fullTime">Full Time</option>
                              <option value="partTime">Part Time</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              value={inputs.yearsOfExperience}
                              as="select"
                              custom
                              className="custom-select"
                              name="yearsOfExperience"
                              onChange={handleChange}
                            >
                              <option value="1">1 Years</option>
                              <option value="2">2 Years</option>
                              <option value="3">3 Years</option>
                              <option value="4">4 Years</option>
                              <option value="5">5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 10000"
                              name="currentSalary"
                              value={inputs.currentSalary}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 10000"
                              name="requestedSalary"
                              value={inputs.requestedSalary}
                              onChange={handleChange}
                              required
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
}
export default EmployeeProfile;
