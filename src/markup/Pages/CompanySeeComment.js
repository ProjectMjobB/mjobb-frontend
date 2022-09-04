import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import CompanyLinks from '../Element/CompanyLinks';
import axios from 'axios';
import { useSelector } from 'react-redux';
const jobAlert = [
  { id: 1, title: 'Social Media Expert', date: 'December 15,2018' },
  { id: 2, title: 'Web Designer', date: 'November 10,2018' },
  { id: 3, title: 'Finance Accountant', date: 'October 5,2018' },
  { id: 4, title: 'Social Media Expert', date: 'December 15,2018' },
  { id: 5, title: 'Web Designer', date: 'November 10,2018' },
  { id: 6, title: 'Finance Accountant', date: 'October 5,2018' },
  { id: 7, title: 'Social Media Expert', date: 'December 15,2018' },
  { id: 8, title: 'Web Designer', date: 'November 10,2018' },
  { id: 9, title: 'Finance Accountant', date: 'October 5,2018' },
  { id: 10, title: 'Social Media Expert', date: 'December 15,2018' },
];
const CompanySeeComment = () => {
  const userId = useSelector((state) => state.auth.userInfo.id);
  const [company, setCompany] = useState(false);
  const [contacts, setContacts] = useState(jobAlert);
  const [comments, setComments] = useState([]);

  // delete data
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  const fetchComments = (id) => {
    if (id) {
      axios
        .get(`/api/v1.0/comments/users/${id}/to-user/accepted-comments`)
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  useEffect(() => {
    fetchComments(userId);
  }, [userId]);

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanyLinks />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Comments
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>Last 2 Months</option>
                          <option>Last Months</option>
                          <option>Last Weeks</option>
                          <option>Last 3 Days</option>
                        </select>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Users</th>
                          <th>Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.map((comment, index) => (
                          <tr key={index}>
                            <td className="job-name">
                              <Link to={`/user/${comment.id}`}>
                                {comment.title}
                              </Link>
                            </td>
                            <td className="criterias">
                              Lorem Ipsum is simply dummy text.
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                   
                  </div>
                  <Modal
                    show={company}
                    onHide={setCompany}
                    className=" fade modal-bx-info"
                  >
                    <div role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="logo-img">
                            <img
                              alt=""
                              src={require('./../../images/logo/icon2.png')}
                            />
                          </div>
                          <h5 className="modal-title">Company Name</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setCompany(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul>
                            <li>
                              <strong>Job Title :</strong>
                              <p> Web Developer – PHP, HTML, CSS </p>
                            </li>
                            <li>
                              <strong>Experience :</strong>
                              <p>5 Year 3 Months</p>
                            </li>
                            <li>
                              <strong>Deseription :</strong>
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry has been the industry's
                                standard dummy text ever since.
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCompany(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </>
  );
};

export default CompanySeeComment;
