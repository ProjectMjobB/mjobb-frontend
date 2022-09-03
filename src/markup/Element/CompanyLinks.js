import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';

const CompanyLinks = (props) => {
  const user = useSelector((state) => state.auth.userInfo);
  const [profileImage, setProfileImage] = useState();
  const [generalPoint, setGeneralPoint] = useState(0);
  const ratingChanged = (newRating) => {
    setGeneralPoint(newRating);
    props.someRatingMethods(newRating);
  };
  useEffect(() => {
    setProfileImage(user.profileImage);
  }, [user]);
  useEffect(() => {
    setTimeout(() => {
      const point = parseInt(user.generalPoint);
      setGeneralPoint(point);
    }, 100);
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
    <>
      <div className="col-xl-3 col-lg-4 m-b30">
        <div className="sticky-top">
          <div className="candidate-info company-info">
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
                    type="file"
                    className="update-flie"
                    onChange={handleFileInputChange}
                  />
                  <i className="fa fa-pencil"></i>
                </div>
              </div>
              <div className="candidate-title d-flex justify-content-center flex-column align-items-center">
                <h4 className="m-b5">
                  <Link to={'#'}>{user?.name}</Link>
                </h4>
                <ReactStars
                  key={`rating_${generalPoint}`}
                  value={Math.max(0, generalPoint)}
                  count={5}
                  size={24}
                  edit={false}
                  isHalf={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <span>{generalPoint}</span>
              </div>
            </div>
            <ul>
              <li>
                <NavLink
                  to={'/company-profile'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <span>Company Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/company-post-jobs'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  <span>Post A Job</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/company-jobs'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-id-card-o" aria-hidden="true"></i>
                  <span>Company Jobs</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/company-see-comments'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-id-card-o" aria-hidden="true"></i>
                  <span>Company See Comments</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/jobs-change-password'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-key" aria-hidden="true"></i>
                  <span>Change Password</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/sadas'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  <span>Log Out</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyLinks;
