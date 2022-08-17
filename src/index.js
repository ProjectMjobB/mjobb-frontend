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

axios.defaults.baseURL = 'https://spring-service-backend.herokuapp.com';
axios.interceptors.response.use((res) => {
  return res;
});
axios.interceptors.request.use(function (config) {
  //   const token = {
  //     username: 'mjobb-client',
  //     password: 'mjobb-secret',
  //   };
  // config.headers.Authorization = 'Basic bWpvYmItY2xpZW50Om1qb2JiLXNlY3JldA==';
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
