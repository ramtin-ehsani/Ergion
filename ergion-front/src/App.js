import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import SignUp from './SignUp/SignUp';
import HomePage from './HomePage/HomePage'
import Login from './Login/Login'
import './fonts/IRANSans/css/fontiran.css';
import StudentDashboard from "./Dashboard/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Dashboard/TeacherDashboard/TeacherDashboard";
import Error404 from "./404/404";
import SingleCourse from './singleCourse/singlecoursecontainer';
import postPage from "./Dashboard/StudentDashboard/PostPage/PostPage";

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
                        <Route path='/student_dashboard' component={StudentDashboard}/>
                        <Route path='/teacher_dashboard' component={TeacherDashboard}/>
                        <Route path='*' component={Error404}/>
                        <Route path="/course/:id" component={SingleCourse}/>
                        <Route path="/post/:id" component={postPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
