import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { getUserInfos } from '../../store/selectors/AuthSelectors';

var bnr = require('./../../images/banner/bnr1.jpg');

const blogGrid = [
  {
    image: require('./../../images/blog/grid/pic1.jpg'),
  },
  {
    image: require('./../../images/blog/grid/pic2.jpg'),
  },
  {
    image: require('./../../images/blog/grid/pic3.jpg'),
  },
  {
    image: require('./../../images/blog/grid/pic4.jpg'),
  },
];

function Jobdetail(props) {
  const user = useSelector((state) => state.auth.userInfo);
  const favorites = user.favoriteJobs;

  const params = useParams();
  const history = useHistory();
  const jobId = params.id;

  const [jobInfo, setJobInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState();
  const [checked, setChecked] = React.useState(false);
  const [otherJobs, setOtherJobs] = useState([]);

  const fetchJobsInfo = () => {
    if (jobId) {
      axios.get(`/api/v1.0/jobs/${jobId}`).then((res) => {
        setJobInfo(res.data);
      });
    }
  };

  const handleFavorite = () => {
    if (favorites) {
      const checkedFavorite = favorites.filter(
        (favorite) => favorite.id == jobId
      );
      if (checkedFavorite.length > 0) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  };
  const otherJobList = () => {
    axios.get(`/api/v1.0/jobs/${jobId}/apriori-algorithm`).then((res) => {
      setOtherJobs(res.data);
    });
  };
  useEffect(() => {
    fetchJobsInfo();
    handleFavorite();
    otherJobList();
  }, [jobId, favorites]);

  const handleChange = (e) => {
    const checkedValue = e.target.checked;
    if (checkedValue) {
      addFavoriteJobs(jobId);
    } else {
      deleteFavoriteJobs(jobId);
    }
  };

  const addFavoriteJobs = (jobId) => {
    axios
      .get(`/api/v1.0/jobs/add/favorite`, {
        params: { jobId: jobId },
      })
      .then((res) => {
        setChecked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFavoriteJobs = (jobId) => {
    axios
      .get('/api/v1.0/jobs/delete/favorite', {
        params: { jobId: jobId },
      })
      .then((res) => {
        setChecked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const applyToJob = () => {
    axios
      .post('/api/v1.0/jobs/apply/' + jobId)
      .then((res) => {
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: 'url(' + bnr + ')' }}
        >
          <PageTitle activeName="Job Detail" motherName="Home" />
        </div>
        <div className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              {jobInfo?.title ? (
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sticky-top">
                      <div className="row">
                        <div className="col-lg-12 col-md-6">
                          <div className="m-b30">
                            <h3>Company Profile Link</h3>
                            <Link to={`/company/${jobInfo?.company.id}`}>
                              {jobInfo?.company.firstName}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-6">
                          <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                            <h4 className="text-black font-weight-700 p-t10 m-b15">
                              {jobInfo?.title}
                            </h4>
                            {props.userRoles === 'ROLE_EMPLOYEE' ? (
                              <label className="like-btn">
                                <input
                                  type="checkbox"
                                  name="favorite"
                                  checked={checked}
                                  onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                              </label>
                            ) : (
                              ''
                            )}
                            <ul>
                              <li>
                                <i className="ti-location-pin"></i>
                                <strong className="font-weight-700 text-black">
                                  Address
                                </strong>
                                <span className="text-black-light">
                                  {jobInfo?.address}
                                </span>
                              </li>
                              <li>
                                <i className="ti-money"></i>
                                <strong className="font-weight-700 text-black">
                                  Country
                                </strong>{' '}
                                {jobInfo?.country}
                              </li>
                              <li>
                                <i className="ti-money"></i>
                                <strong className="font-weight-700 text-black">
                                  City
                                </strong>{' '}
                                {jobInfo?.city}
                              </li>
                              <li>
                                <i className="ti-money"></i>
                                <strong className="font-weight-700 text-black">
                                  Min-Max Salary
                                </strong>{' '}
                                ${jobInfo?.minimumSalary} - ${' '}
                                {jobInfo?.maximumSalary}
                              </li>
                              <li>
                                <i className="ti-shield"></i>
                                <strong className="font-weight-700 text-black">
                                  Experience
                                </strong>
                                {jobInfo?.yearsOfExperience} Year Experience
                              </li>
                              <li>
                                <i className="ti-shield"></i>
                                <strong className="font-weight-700 text-black">
                                  Category
                                </strong>
                                Category 1
                              </li>
                              <li>
                                <i className="ti-shield"></i>
                                <strong className="font-weight-700 text-black">
                                  Tags
                                </strong>
                                <div className="job-time m-t15 m-b10">
                                  {jobInfo?.tags?.map((tag) => (
                                    <Link
                                      key={tag?.id}
                                      to={
                                        '/browse-job-filter-grid/tagId=' +
                                        tag?.id
                                      }
                                      className="mr-1"
                                    >
                                      <span>{tag?.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </li>
                              <li>
                                <i className="ti-shield"></i>
                                <strong className="font-weight-700 text-black">
                                  Languages
                                </strong>
                                <div className="job-time m-t15 m-b10">
                                  {jobInfo?.languages?.map((lang) => (
                                    <Link
                                      key={lang?.id}
                                      to={'#'}
                                      className="mr-1"
                                    >
                                      <span>{lang?.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="job-info-box">
                      <h3 className="m-t0 m-b10 font-weight-700 title-head">
                        <Link to={'#'} className="text-secondry m-r30">
                          {jobInfo?.title}
                        </Link>
                      </h3>
                      <h5 className="font-weight-600">Job Description</h5>
                      <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                      <p>{jobInfo?.description}</p>
                      <br />
                      <div>
                        <img src={jobInfo?.file} alt="" />
                      </div>

                      {props.userRoles === 'ROLE_EMPLOYEE' ? (
                        <button onClick={applyToJob} className="site-button">
                          Apply This Job
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 style={{ color: '#2e55fa' }}>
                    Böyle bir ilan bulunmamaktadır...
                  </h3>
                  <button className="site-button" onClick={history.goBack}>
                    Go Back
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="section-full content-inner">
            <div className="container">
              <h4>Those who applied to this also applied to these</h4>
              <div className="row">
                {otherJobs.map((item, index) => (
                  <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                    <div className="m-b30 blog-grid">
                      <div className="dez-info p-a20 border-1">
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            <Link to={'/blog-details'}>{item?.title}</Link>
                          </h5>
                        </div>
                        <div className="dez-post-meta ">
                          <ul>
                            <li className="post-date">
                              {' '}
                              <i className="ti-location-pin"></i> {item?.city}{' '}
                            </li>
                            <li className="post-author">
                              <i className="ti-user"></i>By{' '}
                              <Link to={'#'}>{item?.company?.firstName}</Link>{' '}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    userRoles: getUserInfos(state),
  };
};
export default withRouter(connect(mapStateToProps)(Jobdetail));
