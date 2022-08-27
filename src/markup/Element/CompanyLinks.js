import React from 'react';
import { Link } from 'react-router-dom';
const CompanyLinks = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={'/company-profile'} className="active">
            <i className="fa fa-user-o" aria-hidden="true"></i>
            <span>Company Profile</span>
          </Link>
        </li>
        <li>
          <Link to={'/company-post-jobs'}>
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <span>Post A Job</span>
          </Link>
        </li>
        <li>
          <Link to={'/company-transactions'}>
            <i className="fa fa-random" aria-hidden="true"></i>
            <span>Transactions</span>
          </Link>
        </li>
        <li>
          <Link to={'/company-manage-job'}>
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <span>Manage jobs</span>
          </Link>
        </li>
        <li>
          <Link to={'/company-resume'}>
            <i className="fa fa-id-card-o" aria-hidden="true"></i>
            <span>Company Jobs</span>
          </Link>
        </li>
        <li>
          <Link to={'/jobs-change-password'}>
            <i className="fa fa-key" aria-hidden="true"></i>
            <span>Change Password</span>
          </Link>
        </li>
        <li>
          <Link to={'./'}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default CompanyLinks;
