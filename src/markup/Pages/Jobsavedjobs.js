import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Profilesidebar from '../Element/Profilesidebar';
import axios from 'axios';
function Jobsavedjobs() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('/api/v1.0/users/my-favorites')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar />
                <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Favorites Jobs
                    </h5>
                  </div>
                  <ul className="post-job-bx browse-job">
                    {posts.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="job-post-info m-a0">
                            <h4>
                              <Link to={'/job-detail/' + item.id}>
                                {item.title}
                              </Link>
                            </h4>
                            <ul>
                              <li>
                                <Link to={'/company' + item?.company?.id}>
                                  {item?.company?.firstName}
                                </Link>
                              </li>
                              <li>
                                <i className="fa fa-map-marker"></i> {item.city}
                              </li>
                              <li>
                                <i className="fa fa-money"></i> $
                                {item.minimumSalary} - ${item.maximumSalary}
                              </li>
                            </ul>
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
       
    </>
  );
}

export default Jobsavedjobs;
