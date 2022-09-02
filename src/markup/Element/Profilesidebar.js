import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Profilesidebar(props) {
  const user = useSelector((state) => state.auth.userInfo);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    setProfileImage(user.profileImage);
  }, [user]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = '';
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleFileInputChange = (e) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file['base64'] = result;
        setProfileImage(result);
        props.someFileMethods(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <div className="profileImage">
                <img src={profileImage} alt="" />
              </div>
              <div
                className="upload-link"
                title="update"
                data-toggle="tooltip"
                data-placement="right"
              >
                <input
                  onChange={handleFileInputChange}
                  type="file"
                  className="update-flie"
                />
                <i className="fa fa-camera"></i>
              </div>
            </div>
            <div className="candidate-title">
              <div className="">
                <h4 className="m-b5">
                  <Link to={'#'}>{user?.firstName}</Link>
                </h4>
                <p className="m-b0">
                  <Link to={'#'}>Web developer</Link>
                </p>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link to={'/employee-profile'} className="active">
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={'/jobs-my-resume'}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>My Resume</span>
              </Link>
            </li>
            <li>
              <Link to={'/jobs-saved-jobs'}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <span>Saved Jobs</span>
              </Link>
            </li>
            <li>
              <Link to={'/jobs-applied-job'}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Applied Jobs</span>
              </Link>
            </li>
            {/* <li><Link to={"/jobs-alerts"}>
							<i className="fa fa-bell-o" aria-hidden="true"></i> 
							<span>Job Alerts</span></Link></li>
							<li><Link to={"/jobs-cv-manager"}>
							<i className="fa fa-id-card-o" aria-hidden="true"></i> 
							<span>CV Manager</span></Link></li> */}
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
        </div>
      </div>
    </div>
  );
}
export default Profilesidebar;
