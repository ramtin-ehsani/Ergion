import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
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
        history.push('/dashboard/profile');
    }

    const navidagteToDashboard = () => {
        history.push('/dashboard');
    }

    const logOut = () => {
        localStorage.setItem("api_key", null)
        window.location = '/login'

    }

    const user = useSelector(state => state.loggedInUser)


    return (
        <div className="mainList">

            <ListItem className="test">
                <Avatar alt="messi" src={user.profilePicture} className="desktopProfilePic" />
            </ListItem>

            <ListItem>
                <p className="userName">
                    {user.firstName + ' ' + user.lastName}
                </p>
            </ListItem>

            <Divider />

            <ListItem button>
                <p className="dashboard" onClick={navidagteToDashboard}>داشبورد</p>
                <ListItemIcon className="dashIcon">
                    <DashboardIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button onClick={navigateToProfile}>
                <p className="profile">پروفایل</p>
                <ListItemIcon className="profileIcon" >
                    <PersonRoundedIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button>
                <p className="store">فروشگاه</p>
                <ListItemIcon className="storeIcon">
                    <ShoppingCartIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button className="QA">
                <p className="QandA">سوالات</p>
                <ListItemIcon className="QandAIcon">
                    <QuestionAnswerIcon />
                </ListItemIcon>
            </ListItem>


            <Divider />


            <ListItem button>
                <p className="setting">تنظیمات</p>
                <ListItemIcon className="setIcon">
                    <SettingsIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button onClick={logOut}>
                <p className="exit">خروج</p>
                <ListItemIcon className="exitIcon">
                    <ExitToAppIcon className="logoutIcon" />
                </ListItemIcon>
            </ListItem>


        </div>

    )
}





export const MobileListItems = () => {


    const history = useHistory();

    const navigateToProfile = () => {
        history.push('/dashboard/profile');
    }

    const navidagteToDashboard = () => {
        history.push('/dashboard');
    }

    const logOut = () => {
        localStorage.setItem("api_key", null)
        window.location = '/login'

    }

    const user = useSelector(state => state.loggedInUser)

    return (
        <div className="mobileList">


            <ListItem>
                <Avatar alt="messi" src={user.profilePicture} />
                <p className="userName">
                    {user.firstName + ' ' + user.lastName}</p>
            </ListItem>

            <Divider />

            <ListItem button>
                <p className="dashboard" onClick={navidagteToDashboard}>داشبورد</p>
                <ListItemIcon className="dashIcon">
                    <DashboardIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button onClick={navigateToProfile}>
                <p className="profile">پروفایل</p>
                <ListItemIcon className="profileIcon">
                    <PersonRoundedIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button>
                <p className="store">فروشگاه</p>
                <ListItemIcon className="storeIcon">
                    <ShoppingCartIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button className="QA">
                {/*<div className="PP">*/}
                <p className="QandA">سوالات</p>
                <ListItemIcon className="QandAIcon">
                    <QuestionAnswerIcon />
                </ListItemIcon>
                {/*</div>*/}
            </ListItem>


            <Divider />


            <ListItem button>
                <p className="setting">تنظیمات</p>
                <ListItemIcon className="setIcon">
                    <SettingsIcon />
                </ListItemIcon>
            </ListItem>


            <ListItem button onClick={logOut}>
                <p className="exit">خروج</p>
                <ListItemIcon className="exitIcon">
                    <ExitToAppIcon className="logoutIcon" />
                </ListItemIcon>
            </ListItem>


        </div>

    )
}

