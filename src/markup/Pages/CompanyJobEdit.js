import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { Form, Select } from 'react-bootstrap';
import { InputTags } from 'react-bootstrap-tagsinput';
import axios from 'axios';
import CompanyLinks from '../Element/CompanyLinks';
import { useParams } from 'react-router-dom';
const CompanyJobEdit = () => {
  const [company, setCompany] = useState({});
  const [file, setFile] = useState('');
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [state, setState] = useState([]);
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [field, setField] = useState([]);
  const [language, setLanguage] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    address: '',
    yearsOfExperience: '',
    minimumSalary: '',
    maximumSalary: '',
    country: '',
    city: '',
    workingType: '',
    description: '',
  });
  const params = useParams();
  const { id } = params;
  const fetchTypes = () => {
    axios.get('/api/v1.0/job-types/').then((res) => {
      setTypes(res.data);
    });
  };
  const fetchCategories = () => {
    axios.get('/api/v1.0/categories/all').then((res) => {
      setCategories(res.data);
      setSelectedCategory(res.data[0].id);
    });
  };
  const fetchTags = () => {
    axios.get('/api/v1.0/tags/all').then((res) => {
      setTags(res.data);
      setSelectedType(res.data[0].id);
    });
  };
  const fetchLanguages = () => {
    axios.get('/api/v1.0/languages/').then((res) => {
      setLanguages(res.data);
    });
  };

  const fetchJob = async () => {
    const res = await axios.get(`/api/v1.0/jobs/${id}`);
    setCompany(res.data);
    if (res.data) {
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchCategories();
    fetchTags();
    fetchLanguages();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputs({
      ...inputs,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    setInputs({
      title: company.title,
      address: company.address,
      yearsOfExperience: company.yearsOfExperience,
      minimumSalary: company.minimumSalary,
      maximumSalary: company.maximumSalary,
      country: company.country,
      city: company.city,
      workingType: company.workingType,
      description: company.description,
    });
    setFile(company.file);
    setSelectedCategory(company?.category?.id);
    setSelectedType(company.jobType);
    // if (company.languages || company.tags) {
    //   addTagAndLanguage(company?.tags, company?.languages);
    // }
    // setLanguage(company.languages);
  }, [company, setCompany]);
  const addTagAndLanguage = (tags, languages) => {
    if (languages.length > 0) {
      setLanguage(languages.map((item) => item.id));
    }
    if (tags.length > 0) {
      setField(tags.map((item) => item.id));
    }
  };

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
        setFile(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = inputs;
    formData['file'] = file;
    axios
      .put(`/api/v1.0/jobs/${id}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanyLinks />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Post A Job
                      </h5>
                      <Link
                        to={'/company-profile'}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={onSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Job Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Job Title"
                              name="title"
                              value={inputs.title}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="adress"
                              name="address"
                              value={inputs.address}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Form.Label>Add Tag</Form.Label>
                            <Form.Control
                              as="select"
                              style={{ height: '100%' }}
                              multiple
                              value={field}
                              onChange={(e) =>
                                setField(
                                  [].slice
                                    .call(e.target.selectedOptions)
                                    .map((item) => item.value)
                                )
                              }
                            >
                              {tags.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <Form.Label>Add Language</Form.Label>
                            <Form.Control
                              as="select"
                              style={{ height: '100%' }}
                              multiple
                              value={language}
                              onChange={(e) =>
                                setLanguage(
                                  [].slice
                                    .call(e.target.selectedOptions)
                                    .map((item) => item.value)
                                )
                              }
                            >
                              {languages.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        {/* <Form.Control
                          as="select"
                          multiple
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        >
                          {tags.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Form.Control> */}

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Categories</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              value={selectedCategory}
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                            >
                              {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              name="yearsOfExperience"
                              onChange={handleChange}
                            >
                              <option value="1">1 Years</option>
                              <option value="2">2 Years</option>
                              <option value="3">3 Years</option>
                              <option value="4">4 Years</option>
                              <option value="5">5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Working Type </label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              name="workingType"
                              onChange={handleChange}
                            >
                              <option value="fullTime">Full Time</option>
                              <option value="partTime">Part Time</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Minimum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 10000"
                              name="minimumSalary"
                              value={inputs.minimumSalary}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Maximum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                              name="maximumSalary"
                              value={inputs.maximumSalary}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                              name="country"
                              value={inputs.country}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="London"
                              name="city"
                              value={inputs.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              name="description"
                              className="form-control"
                              rows="4"
                              cols="50"
                              value={inputs.description}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload File</label>
                            <div className="custom-file">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p>
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                                onChange={handleFileInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Upload
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyJobEdit;
