import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Jobcategories from '../Element/Jobcategories';
import Jobsection from '../Element/Jobsection';
import Owltestimonial from '../Element/Owlblog1';
import Latestblogowl from '../Element/Owlblog2';
import Featureblog from './../Element/Featureblog';

var bnr1 = require('./../../images/main-slider/slide1.jpg');
var bnr2 = require('./../../images/background/bg4.jpg');
var bnr3 = require('./../../images/background/bg3.jpg');

function Homepage() {
  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="dez-bnr-inr dez-bnr-inr-md overlay-black-dark"
          style={{ backgroundImage: 'url(' + bnr1 + ')' }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry align-m text-white">
              <div className=" job-search-form">
                <h2 className="text-center">
                  The Easiest Way to Get Your New Job
                </h2>
                <h3>Find Jobs, Employment & Career Opportunities</h3>
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Job Title, Keywords Or Company Name"
                    />
                    <div className="input-group-prepend">
                      <button className="site-button">Search</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="section-full job-categories content-inner-2 bg-white">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="m-b5">Popular Categories</h2>
              <h5 className="fw4">20+ Catetories work wating for you</h5>
            </div>
            <Jobcategories />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
