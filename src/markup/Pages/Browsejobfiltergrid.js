import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import PageTitle from './../Layout/PageTitle';
import Jobfindbox from './../Element/Jobfindbox';
import Accordsidebar from './../Element/Accordsidebar';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
var bnr = require('./../../images/banner/bnr1.jpg');

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Browsejobfiltergrid() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const query = useQuery();
  const search = query.get('name');
  useEffect(() => {
    if (search) {
      searchJobs(search);
    } else if (params.id && !params.id.includes('tagId')) {
      filterCategoryAllJobs(params.id);
    } else if (params.id && params.id.includes('tagId')) {
      filterByTagId(params.id);
    } else {
      fetchJobs();
    }
  }, [search]);

  const fetchJobs = async () => {
    setLoading(true);
    const res = await axios.get('/api/v1.0/jobs/all-opened-jobs');
    setJobs(res.data);
    setLoading(false);
  };
  const searchJobs = async (search) => {
    setLoading(true);
    const res = await axios.get(
      `/api/v1.0/jobs/searchUrl?search=title:*${search}`
    );
    setJobs(res.data);
    setLoading(false);
  };
  const filterCategoryAllJobs = async (categoryId) => {
    setLoading(true);
    const res = await axios.get(
      `api/v1.0/jobs/jobAdvertisements/${categoryId}/jobs`
    );
    setJobs(res.data);
    setLoading(false);
  };
  const filterByTagId = async (tagId) => {
    setLoading(true);
    let id = tagId;
    id = id.replace('tagId=', '');

    const res = await axios.get(`/api/v1.0/tags/tags/${id}/jobAdvertisements`);
    setJobs(res.data);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: 'url( ' + bnr + ')' }}
        >
          <PageTitle motherName="Home" activeName="Browse Job Filter Grid" />
        </div>
        <Jobfindbox />
        <div className="content-block">
          <div className="section-full browse-job p-b50">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-7">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {jobs.length} Jobs Found
                    </h5>
                  </div>
                  {loading && <div>Loading...</div>}
                  <ul className="post-job-bx browse-job-grid row">
                    {!loading &&
                      jobs.map((item, index) => (
                        <li className="col-lg-6 col-md-12" key={index}>
                          <div className="post-bx">
                            <div className="d-flex m-b30">
                              <div className="job-post-info">
                                <h5>
                                  <Link to={'/job-detail/' + item.id}>
                                    {item.title}
                                  </Link>
                                </h5>
                                <ul>
                                  <li>
                                    <i className="fa fa-map-marker"></i>{' '}
                                    {item.country}, {item.city}
                                  </li>
                                  <li>
                                    <i className="fa fa-bookmark-o"></i>{' '}
                                    {item.workingType}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="job-time mr-auto">
                                <Link to={''}>
                                  <span>{item.workingType}</span>
                                </Link>
                              </div>
                              <div className="salary-bx">
                                <span>
                                  ${item.minimumSalary} - ${item.maximumSalary}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
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

export default Browsejobfiltergrid;
