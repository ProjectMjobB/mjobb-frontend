import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './Pages/Homepage1';
import Homepage2 from './Pages/Homepage';

import Jobprofile from './Pages/Jobprofile';
import Jobmyresume from './Pages/Jobmyresume';
import Jobsappliedjob from './Pages/Jobsappliedjob';
import Jobsalert from './Pages/Jobsalert';
import Jobsavedjobs from './Pages/Jobsavedjobs';
import Jobcvmanager from './Pages/Jobcvmanager';
import Changepasswordpage from './Pages/Changepasswordpage';

import Companyprofile from './Pages/Companyprofile';
import CompanyJobs from './Pages/CompanyJobs';
import Componypostjobs from './Pages/Componypostjobs';
import Companymanage from './Pages/Companymanage';
import Companytransactions from './Pages/Companytransactions';
import Browsecandidates from './Pages/Browsecandidates';

import Aboutus from './Pages/Aboutus';
import Jobdetail from './Pages/Jobdetail';
import Companies from './Pages/Companies';
import Freejobalerts from './Pages/Freejobalerts';
import Browsejoblist from './Pages/Browsejoblist';
import Browsejobgrid from './Pages/Browsejobgrid';
import Browsejobfilterlist from './Pages/Browsejobfilterlist';
import Browsejobfiltergrid from './Pages/Browsejobfiltergrid';

import Categoryalljob from './Pages/Categoryalljob';
import Categorycompanyjob from './Pages/Categorycompanyjob';
import Categorydesignationsjob from './Pages/Categorydesignationsjob';
import Categoryjobs from './Pages/Categoryjobs';
import Categorylocationjobs from './Pages/Categorylocationjobs';
import Categoryskilljobs from './Pages/Categoryskilljobs';

import Portfoliogrid2 from './Pages/Portfoliogrid2';

//import Loginpage1 from './Pages/Loginpage1';
//import Loginpage2 from './Pages/Loginpage2';
//import Loginpage3 from './Pages/Loginpage3';

import Register1 from './Pages/Register1';
import Register2 from './Pages/Register2';
import Error404 from './Pages/Error404';

import Contact from './Pages/Contact';

import Blogclassic from './Pages/Blogclassic';
import Blogclassicsidebar from './Pages/Blogclassicsidebar';
import Blogdetailgrid from './Pages/Blogdetailgrid';
import Blogdetailgridsidebar from './Pages/Blogdetailgridsidebar';
import Blogleftimg from './Pages/Blogleftimg';
import Blogdetail from './Pages/Blogdetail';
import ScrollToTop from './Element/ScrollToTop';
import Loginpage2 from './Pages/Loginpage2';
import AuthenticatedRoute from '../services/AuthenticatedRoute';
import CompanySeeComment from './Pages/CompanySeeComment';
const Markup = () => {
  return (
    <>
      <div className="page-wraper">
        <Switch>
          <AuthenticatedRoute path="/" exact component={Homepage2} />
          <AuthenticatedRoute path="/index-2" component={Homepage} />
          <AuthenticatedRoute path="/home" component={Homepage2} />

          <AuthenticatedRoute path="/jobs-profile" component={Jobprofile} />
          <AuthenticatedRoute path="/jobs-my-resume" component={Jobmyresume} />
          <AuthenticatedRoute
            path="/jobs-applied-job"
            component={Jobsappliedjob}
          />
          <AuthenticatedRoute path="/jobs-alerts" component={Jobsalert} />
          <AuthenticatedRoute
            path="/company-see-comments"
            component={CompanySeeComment}
          />
          <AuthenticatedRoute
            path="/jobs-saved-jobs"
            component={Jobsavedjobs}
          />
          <AuthenticatedRoute
            path="/jobs-cv-manager"
            component={Jobcvmanager}
          />
          <AuthenticatedRoute
            path="/jobs-change-password"
            component={Changepasswordpage}
          />

          <AuthenticatedRoute
            path="/company-profile"
            component={Companyprofile}
          />
          <AuthenticatedRoute path="/company-jobs" component={CompanyJobs} />
          <AuthenticatedRoute
            path="/company-post-jobs"
            component={Componypostjobs}
          />
          <AuthenticatedRoute
            path="/company-manage-job"
            component={Companymanage}
          />
          <AuthenticatedRoute
            path="/company-transactions"
            component={Companytransactions}
          />
          <AuthenticatedRoute
            path="/browse-candidates"
            component={Browsecandidates}
          />

          <AuthenticatedRoute path="/about-us" component={Aboutus} />
          <AuthenticatedRoute path="/job-detail/:id" component={Jobdetail} />
          <AuthenticatedRoute path="/companies" component={Companies} />
          <AuthenticatedRoute
            path="/free-job-alerts"
            component={Freejobalerts}
          />
          <AuthenticatedRoute
            path="/browse-job-list"
            component={Browsejoblist}
          />
          <AuthenticatedRoute
            path="/browse-job-grid"
            component={Browsejobgrid}
          />
          <AuthenticatedRoute
            path="/browse-job-filter-list"
            component={Browsejobfilterlist}
          />
          <AuthenticatedRoute
            path="/browse-job-filter-grid"
            component={Browsejobfiltergrid}
          />

          <AuthenticatedRoute
            path="/category-all-jobs"
            component={Categoryalljob}
          />
          <AuthenticatedRoute
            path="/category-company-jobs"
            component={Categorycompanyjob}
          />
          <AuthenticatedRoute
            path="/category-designations-jobs"
            component={Categorydesignationsjob}
          />
          <AuthenticatedRoute path="/category-jobs" component={Categoryjobs} />
          <AuthenticatedRoute
            path="/category-location-jobs"
            component={Categorylocationjobs}
          />
          <AuthenticatedRoute
            path="/category-skill-jobs"
            component={Categoryskilljobs}
          />

          <AuthenticatedRoute
            path="/portfolio-grid-2"
            component={Portfoliogrid2}
          />

          <Route path="/login" component={Loginpage2} />

          <Route path="/register1" component={Register1} />
          <AuthenticatedRoute path="/register-2" component={Register2} />
          <AuthenticatedRoute path="/error-404" component={Error404} />

          <AuthenticatedRoute path="/contact" component={Contact} />

          <AuthenticatedRoute path="/blog-classic" component={Blogclassic} />
          <AuthenticatedRoute
            path="/blog-classic-sidebar"
            component={Blogclassicsidebar}
          />
          <AuthenticatedRoute
            path="/blog-detailed-grid"
            component={Blogdetailgrid}
          />
          <AuthenticatedRoute
            path="/blog-detailed-grid-sidebar"
            component={Blogdetailgridsidebar}
          />
          <AuthenticatedRoute path="/blog-left-img" component={Blogleftimg} />
          <AuthenticatedRoute path="/blog-details" component={Blogdetail} />
        </Switch>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
