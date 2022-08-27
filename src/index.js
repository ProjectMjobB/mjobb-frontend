import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';
import SimpleReactLightbox from 'simple-react-lightbox';
import axios from 'axios';
const token = JSON.parse(localStorage.getItem('userDetails'));
const AUTH_TOKEN = `Bearer ${token?.access_token}`;
axios.defaults.baseURL = 'https://spring-service-backend.herokuapp.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.interceptors.response.use((res) => {
  return res;
});
axios.interceptors.request.use(function (config) {
  // config.headers.Authorization = `Bearer ${token.access_token}`;
  config.params = config.params || {};

  return config;
});
//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SimpleReactLightbox>
        <BrowserRouter basename="/react/demo">
          <App />
        </BrowserRouter>
      </SimpleReactLightbox>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
