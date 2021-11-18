import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start } from 'qiankun';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './router'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <AppRoute />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// 注册微应用
registerMicroApps([
  {
    name: 'vueAppBase',
    entry: '//localhost:8082',
    container: '#container1',
    activeRule: '/app-vue-base',
  },
]);

// 启动 qiankun
start();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
