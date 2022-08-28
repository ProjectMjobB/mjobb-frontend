import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import CompanyLinks from '../Element/CompanyLinks';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(false);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [matchUsers, setMatchUsers] = useState([]);
  const fetchCompanyJobs = () => {
    axios
      .get('/api/v1.0/jobs/current-company-all-jobs')
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  const deleteJobs = (id) => {
    console.log(id);
    axios
      .delete('/api/v1.0/jobs/delete', {
        params: { id },
      })
      .then((res) => {
        fetchCompanyJobs();
      });
  };

  const handleList = (id, e) => {
    setCompany(true);
    axios.get(`/api/v1.0/jobs/${id}/applied-users`).then((res) => {
      setUsers(res.data);
    });
  };
  const handleMatchList = (id, e) => {
    setShow(true);
    axios.get(`/api/v1.0/jobs/${id}/best-match-users`).then((res) => {
      setMatchUsers(res.data);
    });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      See Applicant
    </Tooltip>
  );
  const renderTooltip1 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Get best employeer matches
    </Tooltip>
  );
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
                  <div className="job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Jobs
                      </h5>
                      <Link
                        to={'/company-manage-job'}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <ul className="post-job-bx browse-job-grid post-resume row">
                      {jobs.map((item, index) => (
                        <li className="col-lg-6 col-md-6" key={index}>
                          <div className="post-bx">
                            <div className="m-b20">
                              <div className="job-post-info">
                                <div className="d-flex justify-content-between">
                                  <h5 className="m-b0">
                                    <Link to={'/job-detail/' + item.id}>
                                      {item.company.firstName}
                                    </Link>
                                  </h5>
                                  <div>
                                    <button className="job-links">
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <OverlayTrigger
                                      placement="right"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltip}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => handleList(item.id)}
                                        className="job-links"
                                      >
                                        <i className="fa fa-eye"></i>
                                      </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="right"
                                      delay={{ show: 250, hide: 400 }}
                                      overlay={renderTooltip1}
                                    >
                                      <button
                                        className="job-links"
                                        onClick={() => handleMatchList(item.id)}
                                      >
                                        <i className="fa fa-cube"></i>
                                      </button>
                                    </OverlayTrigger>
                                  </div>
                                </div>
                                <p className="m-b5 font-13">
                                  <Link to={'#'} className="text-primary">
                                    {item.title}{' '}
                                  </Link>
                                </p>
                                <ul>
                                  <li>
                                    <i className="fa fa-map-marker"></i>
                                    {item.country}, {item.city}
                                  </li>
                                  <li>
                                    <i className="fa fa-money"></i>{' '}
                                    {item.minimumSalary} - {item.maximumSalary}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="job-time m-t15 m-b10">
                              {item.tags.map((tag) => (
                                <Link key={tag?.id} to={'#'} className="mr-1">
                                  <span>{tag?.name}</span>
                                </Link>
                              ))}
                            </div>

                            <button
                              className="job-buttons"
                              onClick={() => deleteJobs(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                              Sil
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={'#'}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link to={'#'}>1</Link>
                        </li>
                        <li>
                          <Link to={'#'}>2</Link>
                        </li>
                        <li>
                          <Link to={'#'}>3</Link>
                        </li>
                        <li className="next">
                          <Link to={'#'}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Modal
                show={company}
                onHide={setCompany}
                className=" fade modal-bx-info"
              >
                <div role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        onClick={() => setCompany(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <table>
                        <thead>
                          <tr>
                            <th>Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={index}>
                              <td className="job-name">
                                <Link to={`/user/${user.id}`}>
                                  {user.firstName}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
              <Modal
                show={show}
                onHide={setShow}
                className=" fade modal-bx-info"
              >
                <div role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShow(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <table>
                        <thead>
                          <tr>
                            <th>Matches Users</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchUsers.map((user, index) => (
                            <tr key={index}>
                              <td className="job-name">
                                <Link to={`/user/${user.id}`}>
                                  {user.firstName}
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
      <Footer />
    </>
  );
}
export default CompanyJobs;
