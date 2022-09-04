import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import CompanyLinks from '../Element/CompanyLinks';
import Profilesidebar from '../Element/Profilesidebar';
import axios from 'axios';
function EmployeeChangePass() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordValidate, setNewPasswordValidate] = useState('');

  const changePassword = (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      newPasswordValidate,
    };

    axios
      .post('/api/v1.0/users/change-password', data)
      .then((res) => {
        alert('Password Updated');
      })
      .catch(({ err }) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                    </div>
                    <form onSubmit={changePassword}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Old Password</label>
                            <input
                              name="oldPassword"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              type="password"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>New Password </label>
                            <input
                              name="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              type="password"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                              name="repeatPassword"
                              value={newPasswordValidate}
                              onChange={(e) =>
                                setNewPasswordValidate(e.target.value)
                              }
                              type="password"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button type="submit" className="site-button">
                            Update Password
                          </button>
                        </div>
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
export default EmployeeChangePass;
