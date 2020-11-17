import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbars from "./Toolbar/Toolbar"
import "./StudentDashboard.scss";
import StudentProfile from '../../Profile/StudentProfile';
import { Route, Switch } from 'react-router-dom';
// import Template from './Template';
import Suggestions from "./SuggestedCourse/Seggestions";
import * as actionTypes from '../../store/actions'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import CourseFileLayouts from './CourseFileLayouts/CourseFileLayouts';
import AddCourse from "./CourseFileLayouts/addCourse/AddCourse";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },

}));


const config = {
    headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
}

const Dashboard = () => {

    const classes = useStyles();
    const usedispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem("api_key") !== 'null') {

            axios.get('http://127.0.0.1:8000/api/student-profile/', config)
                .then((res) => {
                    // handle success
                    const avatarImage = res.data.profile_picture
                    const firstName = res.data.firstname
                    const lastName = res.data.lastname
                    usedispatch({ type: actionTypes.LOGIN, firstName: firstName, lastName: lastName, profilePicture: avatarImage })


                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                    window.location = '/login'
                })

        } else {
            window.location = '/login'
        }





    })
    return (
        <div className={"dashboard"}>
            <CssBaseline />
            <Toolbars />
            <main className={classes.content} >
                <div className={classes.appBarSpacer} />
                <Switch >
                    <Route path='/student_dashboard' exact component={Suggestions} />
                    <Route path='/student_dashboard/profile' exact component={StudentProfile} />
                    <Route path='/student_dashboard/added_courses' exact component={CourseFileLayouts} />
                    <Route path="/student_dashboard/find-your-course" exact component={AddCourse}/>
                </Switch>

            </main>
        </div>
    );
}



export default Dashboard;
