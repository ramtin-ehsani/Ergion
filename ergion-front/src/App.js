import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import SignUp from './SignUp/SignUp';
import HomePage from './HomePage/HomePage'
import Login from './Login/Login'
import './fonts/IRANSans/css/fontiran.css';
import StudentDashboard from "./Dashboard/StudentDashboard/StudentDashboard";
import Error404 from "./404/404";


const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/signup' exact component={SignUp}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/dashboard' component={StudentDashboard}/>
                        <Route path='*' component={Error404}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
