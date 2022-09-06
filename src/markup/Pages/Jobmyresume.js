import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Listingsidebar from './../Element/Listingsidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
var bnr = require('./../../images/banner/bnr1.jpg');
//var bnr2 = require('./../../images/background/bg3.jpg');

function Jobmyresume() {
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [itskills2, setItSkills2] = useState(false);
  const [companyHistories, setCompanyHistories] = useState([]);
  const [company, setCompany] = useState(false);
  const [company2, setCompany2] = useState(false);

  const [resumeHeadline, setResumeHeadline] = useState({});
  const [resumeInputs, setResumeInputs] = useState({
    title: '',
    description: '',
  });
  const [keySkills, setKeySkills] = useState([]);
  const [keySkillsInputs, setKeySkillsInputs] = useState({
    name: '',
  });
  const [companyIpnuts, setCompanyIpnuts] = useState({
    name: '',
    startYear: '',
    endYear: '',
  });
  const [itemId, setItemId] = useState('');
  const userId = useSelector((state) => state.auth.userInfo.id);
  const updateResume = (e) => {
    e.preventDefault();

    axios
      .put(`/api/v1.0/resume/${userId}`, {
          title: resumeInputs.title,
          description: resumeInputs.description,
      })
      .then((res) => {
        const data = res.data;
        setResumeInputs({
          title: data.title,
          description: data.description,
        });
      });
  };

  const handleChangeResume = (e) => {
    setResumeInputs({ ...resumeInputs, [e.target.name]: e.target.value });
  };

  const getResume = () => {
    axios
      .get(`/api/v1.0/resume/${userId}`)
      .then((res) => {
        const data = res.data;
        setResumeHeadline({
          ...data,
        });
        setResumeInputs({
          title: data.title,
          description: data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCompany = (e) => {
    setCompanyIpnuts({
      ...companyIpnuts,
      [e.target.name]: e.target.value,
    });
  };

  const getKeySkills = () => {
    axios.get(`/api/v1.0/key-skill/resume/${userId}/key-skills`).then((res) => {
      setKeySkills(res.data);
    });
  };

  const createKeySkill = (e) => {
    e.preventDefault();
    const data = {
      name: keySkillsInputs.name,
    };
    axios.post(`/api/v1.0/key-skill/${userId}/create`, data).then((res) => {
      const data = res.data;
      setKeySkills([...keySkills, data]);
      setItSkills(false);
    });
  };

  const updateKeySkill = (e) => {
    e.preventDefault();
    const id = itemId;
    const data = { name: keySkillsInputs.name };
    axios.put(`/api/v1.0/key-skill/${id}`, data).then((res) => {
      getKeySkills();
      setItemId('');
      setItSkills2(false);
    });
  };

  const deleteKeySkill = (id) => {
    axios.delete(`/api/v1.0/key-skill/${id}`).then((res) => {
      setKeySkills(res.data);
    });
  };

  const getBySkill = (id) => {
    setItSkills2(true);
    setItemId(id);
    axios.get(`/api/v1.0/key-skill/${id}`).then((res) => {
      setKeySkillsInputs({
        ...keySkillsInputs,
        name: res.data.name,
      });
    });
  };

  const getCompanyHistory = () => {
    axios
      .get(`/api/v1.0/company-history/resume/${userId}/company-history`)
      .then((res) => {
        setCompanyHistories(res.data);
      });
  };

  const createCompanyHistory = (e) => {
    e.preventDefault();
    const data = {
      name: companyIpnuts.name,
      startYear: companyIpnuts.startYear,
      endYear: companyIpnuts.endYear,
    };
    axios
      .post(`/api/v1.0/company-history/${userId}/create`, data)
      .then((res) => {
        const data = res.data;
        setCompanyHistories([...companyHistories, data]);
        setCompany(false);
      });
  };

  const deleteCompanyHistory = (id) => {
    axios.delete(`/api/v1.0/company-history/${id}`).then((res) => {
      setCompanyHistories(res.data);
    });
  };

  const getByCompany = (id) => {
    setCompany2(true);
    setItemId(id);
    axios.get(`/api/v1.0/company-history/${id}`).then((res) => {
      setCompanyIpnuts({
        name: res.data.name,
        startYear: res.data.startYear,
        endYear: res.data.endYear,
      });
    });
  };

  const updateCompanyHistory = (e) => {
    e.preventDefault();
    const id = itemId;
    const data = {
      name: companyIpnuts.name,
      startYear: companyIpnuts.startYear,
      endYear: companyIpnuts.endYear,
    };
    axios.put(`/api/v1.0/company-history/${id}`, data).then((res) => {
      getCompanyHistory();
      setItemId('');
      setCompany2(false);
    });
  };

  useEffect(() => {
    if (userId) {
      getResume();
      getKeySkills();
      getCompanyHistory();
    }
  }, [userId]);

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <Listingsidebar />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                  <Link
                    to={'./'}
                    className="site-button right-arrow button-sm float-right"
                  >
                    Back
                  </Link>

                  <div
                    id="resume_headline_bx"
                    className=" job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">{resumeHeadline.title}</h5>
                      <Link
                        to={'#'}
                        className="site-button add-btn button-sm"
                        onClick={() => setResume(true)}
                      >
                        <i className="fa fa-pencil m-r5"></i> Edit
                      </Link>
                    </div>
                    <p className="m-b0">{resumeHeadline.description}</p>

                    <Modal
                      show={resume}
                      onHide={setResume}
                      className="modal fade modal-bx-info editor"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="ResumeheadlineModalLongTitle"
                            >
                              Resume Headline
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setResume(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={updateResume}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <input
                                      onChange={handleChangeResume}
                                      value={resumeInputs.title}
                                      name="title"
                                      type="text"
                                      className="form-control tags_input"
                                    />
                                    <textarea
                                      value={resumeInputs.description}
                                      onChange={handleChangeResume}
                                      name="description"
                                      className="form-control"
                                      placeholder="Type Description"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setResume(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="site-button">
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div
                    id="key_skills_bx"
                    className="job-bx table-job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Key Skills</h5>
                      <Link
                        to={'#'}
                        onClick={() => setItSkills(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Create
                      </Link>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Key Skills</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {keySkills.map((keySkill) => (
                          <tr key={keySkill.id}>
                            <td>{keySkill.name}</td>
                            <td>
                              <button
                                onClick={() => getBySkill(keySkill.id)}
                                className="site-button add-btn button-sm"
                                data-toggle="modal"
                                data-target="#itskills"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => deleteKeySkill(keySkill.id)}
                                className="site-button add-btn button-sm"
                                data-toggle="modal"
                                data-target="#itskills"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={itskills}
                      onHide={setItSkills}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">IT Skills</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setItSkills(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={createKeySkill}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>IT Skills</label>
                                    <input
                                      value={keySkillsInputs.name}
                                      onChange={(e) =>
                                        setKeySkillsInputs({
                                          name: e.target.value,
                                        })
                                      }
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter IT Skills"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setItSkills(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="site-button">
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={itskills2}
                      onHide={setItSkills2}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">IT Skills</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setItSkills2(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={updateKeySkill}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>IT Skills</label>
                                    <input
                                      value={keySkillsInputs.name}
                                      onChange={(e) =>
                                        setKeySkillsInputs({
                                          name: e.target.value,
                                        })
                                      }
                                      name="name"
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter IT Skills"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setItSkills2(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="site-button">
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div
                    id="company_history_bx"
                    className="job-bx table-job-bx bg-white m-b30"
                  >
                    <div className="d-flex">
                      <h5 className="m-b15">Company History</h5>
                      <Link
                        to={'#'}
                        onClick={() => setCompany(true)}
                        className="site-button add-btn button-sm"
                      >
                        <i className="fa fa-pencil m-r5"></i> Create
                      </Link>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Company History</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyHistories.map((company) => (
                          <tr key={company.id}>
                            <td>{company.name}</td>
                            <td>
                              <button
                                onClick={() => getByCompany(company.id)}
                                className="site-button add-btn button-sm"
                                data-toggle="modal"
                                data-target="#itskills"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => deleteCompanyHistory(company.id)}
                                className="site-button add-btn button-sm"
                                data-toggle="modal"
                                data-target="#itskills"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={company}
                      onHide={setCompany}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Company History</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={createCompanyHistory}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Name</label>
                                    <input
                                      value={companyIpnuts.name}
                                      onChange={handleChangeCompany}
                                      name="name"
                                      type="text"
                                      className="form-control"
                                    />
                                    <label>Start Year</label>
                                    <input
                                      value={companyIpnuts.startYear}
                                      onChange={handleChangeCompany}
                                      type="text"
                                      className="form-control"
                                      name="startYear"
                                    />
                                    <label>End Year</label>
                                    <input
                                      value={companyIpnuts.endYear}
                                      onChange={handleChangeCompany}
                                      name="endYear"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setCompany(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="site-button">
                                  Save
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    <Modal
                      className="modal fade modal-bx-info editor"
                      show={company2}
                      onHide={setCompany2}
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Company History Update
                            </h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany2(false)}
                            >
                              <span>&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={updateCompanyHistory}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="form-group">
                                    <label>Name</label>
                                    <input
                                      value={companyIpnuts.name}
                                      onChange={handleChangeCompany}
                                      name="name"
                                      type="text"
                                      className="form-control"
                                    />
                                    <label>Start Year</label>
                                    <input
                                      value={companyIpnuts.startYear}
                                      onChange={handleChangeCompany}
                                      type="text"
                                      className="form-control"
                                      name="startYear"
                                    />
                                    <label>End Year</label>
                                    <input
                                      value={companyIpnuts.endYear}
                                      onChange={handleChangeCompany}
                                      name="endYear"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setCompany2(false)}
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="site-button">
                                  Update
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
export default Jobmyresume;
