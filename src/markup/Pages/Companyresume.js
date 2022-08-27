import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import CompanyLinks from '../Element/CompanyLinks';
import axios from 'axios';
const postResume = [
  { title: 'Tammy Dixon' },
  { title: 'John Doe' },
  { title: 'Ali Tufan' },
  { title: 'David kamal' },
  { title: 'Tammy Dixon' },
  { title: 'John Doe' },
  { title: 'David kamal' },
  { title: 'Ali Tufan' },
];

function Companyresume() {
  const [jobs, setJobs] = useState([]);
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
                          <Link to={'#'}>
                            <img
                              alt=""
                              src={require('./../../images/logo/icon3.jpg')}
                            />
                          </Link>
                          <div
                            className="upload-link"
                            title="update"
                            data-toggle="tooltip"
                            data-placement="right"
                          >
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={'#'}>@COMPANY</Link>
                          </h4>
                        </div>
                      </div>
                      <CompanyLinks />
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Resume
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
                            <div className="d-flex m-b20">
                              <div className="job-post-info">
                                <h5 className="m-b0">
                                  <Link to={'/jobs-profile'}>
                                    {item.company.firstName}
                                  </Link>
                                </h5>
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
                              <Link to={'#'} className="mr-1">
                                <span>PHP</span>
                              </Link>
                              <Link to={'#'} className="mr-1">
                                <span>Angular</span>
                              </Link>
                              <Link to={'#'} className="mr-1">
                                <span>Bootstrap</span>
                              </Link>
                            </div>
                            <Link
                              to={'/files/pdf-sample.pdf'}
                              target="blank"
                              className="job-links"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companyresume;
