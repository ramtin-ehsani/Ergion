import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import "./ListItems.scss";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



export const MainListItems = () => {

    const history = useHistory();

    const navigateToProfile = () => {
        history.push('/student_dashboard/profile');
    }

    const navidagteToDashboard = () => {
        history.push('/student_dashboard');
    }

    const logOut = () => {
        localStorage.setItem("api_key", null)
        window.location = '/login'

    }

    const user = useSelector(state => state.loggedInUser)

    return (
        <div className="mainList">

            <ListItem className="test">
                <Avatar alt="عکس پروفایل" src={user.profilePicture} className="desktopProfilePic" />
            </ListItem>

            <ListItem>
                <p className="userName">
                    {user.firstName + ' ' + user.lastName}
                </p>
            </ListItem>

            <Divider />

            <ListItem dir='rtl' button onClick={navidagteToDashboard} style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <p className="dashboard" >داشبورد</p>
                
            </ListItem>

            <ListItem dir='rtl' button onClick={navigateToProfile} style={{paddingTop:'0px'}}>
            <ListItemIcon >
                    <PersonRoundedIcon />
                </ListItemIcon>
                <p className="profile">پروفایل</p>
                
            </ListItem>

            <ListItem button dir='rtl' style={{paddingTop:'0px'}}
                onClick={() => { history.push('/student_dashboard/added_courses') }}
            >
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <p className="courses">کلاس های من</p>
                
            </ListItem>


            <ListItem button dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <p className="store">فروشگاه</p>
                
            </ListItem>


            <ListItem button className="QA" dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <QuestionAnswerIcon />
                </ListItemIcon>
                <p className="QandA">سوالات</p>
                
            </ListItem>


            <Divider />


            <ListItem button dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <p className="setting">تنظیمات</p>
                
            </ListItem>


            <ListItem button onClick={logOut} dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <ExitToAppIcon className="logoutIcon" />
                </ListItemIcon>
                <p className="exit">خروج</p>
                
            </ListItem>


        </div>
    )

}


export const MobileListItems = () => {


    const history = useHistory();

    const navigateToProfile = () => {
        history.push('/student_dashboard/profile');
    }

    const navidagteToDashboard = () => {
        history.push('/student_dashboard');
    }

    const logOut = () => {
        localStorage.setItem("api_key", null)
        window.location = '/login'

    }

    const user = useSelector(state => state.loggedInUser)

    return (
        <div className="mobileList">


            <ListItem>
                <Avatar alt="عکس پروفایل" src={user.profilePicture} />
                <p className="userName">
                    {user.firstName + ' ' + user.lastName}</p>
            </ListItem>

            <Divider />

            <ListItem dir='rtl' button onClick={navidagteToDashboard} style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <p className="dashboard" >داشبورد</p>
                
            </ListItem>


            <ListItem dir='rtl' button onClick={navigateToProfile} style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <PersonRoundedIcon />
                </ListItemIcon>
                <p className="profile">پروفایل</p>
                
            </ListItem>

            <ListItem button dir='rtl' style={{paddingTop:'0px'}}
                onClick={() => { history.push('/student_dashboard/added_courses') }}
            >
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <p className="courses">کلاس های من</p>
                
            </ListItem>


            <ListItem button dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <p className="store">فروشگاه</p>
                
            </ListItem>


            <ListItem button className="QA" dir='rtl' style={{paddingTop:'0px'}}>
                {/*<div className="PP">*/}
                <ListItemIcon>
                    <QuestionAnswerIcon />
                </ListItemIcon>
                <p className="QandA">سوالات</p>
                
                {/*</div>*/}
            </ListItem>


            <Divider />


            <ListItem button dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <p className="setting">تنظیمات</p>
                
            </ListItem>


            <ListItem button onClick={logOut} dir='rtl' style={{paddingTop:'0px'}}>
            <ListItemIcon>
                    <ExitToAppIcon className="logoutIcon" />
                </ListItemIcon>
                <p className="exit">خروج</p>
                
            </ListItem>


        </div>

    )

}
