import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbars from "./Toolbar/Toolbar"
import "./StudentDashboard.scss";
import StudentProfile from '../../Profile/StudentProfile';
import { Route, Switch } from 'react-router-dom';
import Template from './Template'
import * as actionTypes from '../../store/actions'
import { useDispatch } from 'react-redux';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100%',
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
        
        axios.get('http://127.0.0.1:8000/api/student_dashboard/student_details/', config)
            .then((res) => {
                // handle success
                const avatarImage = res.data.profile_picture
                const firstName = res.data.firstname
                const lastName = res.data.lastname
                const grade = res.data.grade
                const email = res.data.email
                usedispatch({ type: actionTypes.LOGIN, grade: grade, email: email, firstName: firstName, lastName: lastName, profilePicture: avatarImage })


            })
            .catch((error) => {
                // handle error
                console.log(error);
            })


    })





    return (
        <div className={"dashboard"}>
            <CssBaseline />
            <Toolbars />
            <main className={classes.content} >
                <div className={classes.appBarSpacer} />
                <Switch >
                    <Route path='/dashboard' exact component={Template} />
                    <Route path='/dashboard/profile' exact component={StudentProfile} />
                </Switch>

            </main>
        </div>
    );
}



export default Dashboard;