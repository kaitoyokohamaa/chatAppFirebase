import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';
const firebase = require("firebase");
require("firebase/firestore")
firebase.initializeApp({    
  apiKey: "AIzaSyDIG6JmlcIsDNAnoadqKW-1ow0QbAkESiQ",
  authDomain: "chatapp-58172.firebaseapp.com",
  databaseURL: "https://chatapp-58172.firebaseio.com",
  projectId: "chatapp-58172",
  storageBucket: "chatapp-58172.appspot.com",
  messagingSenderId: "244788918445",
  appId: "1:244788918445:web:d7a152d0fb46a0040eee24",
  measurementId: "G-TXTXZWBQ2M"
});

const routing=(
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={LoginComponent} ></Route>
      <Route path='/signup' component={SignupComponent} ></Route>
      <Route path='/dashboard' component={DashboardComponent} ></Route>
      <Route path='/' exact component={SignupComponent} ></Route>
    </div>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
