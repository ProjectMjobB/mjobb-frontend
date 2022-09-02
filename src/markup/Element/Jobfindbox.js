import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const Jobfindbox = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const value = searchValue;
    history.push(`/browse-job-filter-grid?name=${value}`);
  };

  useEffect(() => {
    var i = 0;

    // Placeholder Animation Start
    var inputSelector = document.querySelectorAll('input, textarea');

    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener('focus', function (event) {
        return this.parentElement.parentElement.classList.add('focused');
      });
    }

    for (i = 0; i < inputSelector.length; i++) {
      inputSelector[i].addEventListener('blur', function (event) {
        var inputValue = this.value;
        if (inputValue === '') {
          this.parentElement.parentElement.classList.remove('filled');
          this.parentElement.parentElement.classList.remove('focused');
        } else {
          this.parentElement.parentElement.classList.add('filled');
        }
      });
    }
  }, []);

  return (
    <div className="section-full browse-job-find">
      <div className="container">
        <div className="find-job-bx">
          <form onSubmit={onSubmit} className="dezPlaceAni">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="form-group">
                  <label>Job Title, Keywords, or Phrase</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder=""
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <button type="submit" className="site-button btn-block">
                  Find Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Jobfindbox;
