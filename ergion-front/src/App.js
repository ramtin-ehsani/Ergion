import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SignUp from './SignUp/SignUp';
import HomePage from './HomePage/HomePage'
import Login from './Login/Login'

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/login' exact component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
