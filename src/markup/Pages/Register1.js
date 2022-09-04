import React, { useState } from 'react';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  signupAction,
} from '../../store/actions/AuthActions';
var bnr = require('./../../images/banner/bnr2.jpg');

function Register1(props) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userOrCompany, setUserOrCompany] = useState('ROLE_EMPLOYEE');
  // const [inputs, setInputs] = useState({
  //   email: '',
  //   firstname: '',
  //   lastname: '',
  //   password: '',
  //   phoneNumber: '',
  // });
  const dispatch = useDispatch();

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(loadingToggleAction(true));
    const payload = {
      email,
      firstname,
      surname: lastname,
      password,
      phoneNumber,
      role: userOrCompany,
    };
    dispatch(signupAction(payload, props.history));
  };

  const options = [
    { value: 'ROLE_EMPLOYEE', label: 'Employee' },
    { value: 'ROLE_COMPANY', label: 'Company' },
  ];

  const handleChange = (e) => {
    setUserOrCompany(e.target.value);
  };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: value,
  //   });
  // };

  const UserModel = () => {
    return (
      <>
        <div className="form-group">
          <label className="font-weight-700">E-MAIL *</label>
          <input
            name="email"
            className="form-control"
            placeholder="Your Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">First Name *</label>
          <input
            name="firstname"
            className="form-control"
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Last Name *</label>
          <input
            name="lastname"
            className="form-control"
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Password *</label>
          <input
            name="password"
            className="form-control"
            placeholder="Type Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Phone *</label>
          <input
            name="phoneNumber"
            className="form-control"
            placeholder="Your Phone Number"
            type="phone"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">User Or Company *</label>
          <select
            name="role"
            className="form-control"
            value={userOrCompany}
            onChange={handleChange}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  const CompanyModel = () => {
    return (
      <>
        <div className="form-group">
          <label className="font-weight-700">Company Name *</label>
          <input
            name="firstname"
            className="form-control"
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Email *</label>
          <input
            name="email"
            className="form-control"
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Password *</label>
          <input
            name="password"
            className="form-control"
            placeholder="Type Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">Company Phone *</label>
          <input
            name="phoneNumber"
            className="form-control"
            placeholder="Your Phone Number"
            type="phone"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label className="font-weight-700">User Or Company *</label>
          <select
            name="role"
            className="form-control"
            value={userOrCompany}
            onChange={handleChange}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };
  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="dez-bnr-inr overlay-black-middle bg-pt"
          style={{ backgroundImage: `url(${bnr})` }}
        >
          <PageTitle motherName="Home" activeName="Register" />
        </div>
        <div className="section-full content-inner browse-job shop-account">
          <div className="container">
            <div className="row">
              <div className="col-md-12 m-b30">
                <div className="p-a30 job-bx max-w500 radius-sm bg-white m-auto">
                  <div className="tab-content" onSubmit={onRegister}>
                    <form className="tab-pane active">
                      <h4 className="font-weight-700 m-b5">
                        PERSONAL INFORMATION
                      </h4>
                      <p className="font-weight-600">
                        If you have an account with us, please log in.
                      </p>
                      {userOrCompany === 'ROLE_EMPLOYEE' ? (
                        <>
                          <div className="form-group">
                            <label className="font-weight-700">E-MAIL *</label>
                            <input
                              name="email"
                              className="form-control"
                              placeholder="Your Email Address"
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              First Name *
                            </label>
                            <input
                              name="firstname"
                              className="form-control"
                              placeholder="First Name"
                              type="text"
                              onChange={(e) => setFirstname(e.target.value)}
                              value={firstname}
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              Last Name *
                            </label>
                            <input
                              name="lastname"
                              className="form-control"
                              placeholder="Last Name"
                              type="text"
                              onChange={(e) => setLastname(e.target.value)}
                              value={lastname}
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              Password *
                            </label>
                            <input
                              name="password"
                              className="form-control"
                              placeholder="Type Password"
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">Phone *</label>
                            <input
                              name="phoneNumber"
                              className="form-control"
                              placeholder="Your Phone Number"
                              type="phone"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              value={phoneNumber}
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              User Or Company *
                            </label>
                            <select
                              name="role"
                              className="form-control"
                              value={userOrCompany}
                              onChange={handleChange}
                            >
                              {options.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group">
                            <label className="font-weight-700">
                              Company Name *
                            </label>
                            <input
                              name="firstname"
                              className="form-control"
                              placeholder="First Name"
                              type="text"
                              onChange={(e) => setFirstname(e.target.value)}
                              value={firstname}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">Email *</label>
                            <input
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              type="text"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              Password *
                            </label>
                            <input
                              name="password"
                              className="form-control"
                              placeholder="Type Password"
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              Company Phone *
                            </label>
                            <input
                              name="phoneNumber"
                              className="form-control"
                              placeholder="Your Phone Number"
                              type="phone"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              value={phoneNumber}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group">
                            <label className="font-weight-700">
                              User Or Company *
                            </label>
                            <select
                              name="role"
                              className="form-control"
                              value={userOrCompany}
                              onChange={handleChange}
                            >
                              {options.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      <div className="text-left">
                        <button
                          type="submit"
                          className="site-button button-lg outline outline-2"
                        >
                          CREATE
                        </button>
                      </div>
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
export default Register1;
