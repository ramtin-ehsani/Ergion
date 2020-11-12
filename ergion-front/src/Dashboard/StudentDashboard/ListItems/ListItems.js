import React, { useEffect, useState } from 'react';
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
import messi from "../../../Pics/mesi.jpeg";
import { useHistory } from "react-router-dom";



export function MainListItems(){
    const history = useHistory();
    let [firstname,setfirstname] = useState('')
    let [lastname,setlastname] = useState('')

    useEffect(()=>{
        setTimeout(() => {
            if(JSON.parse(localStorage.getItem('user') === null)){
                history.push('/login')
            }
            else{
                setfirstname(JSON.parse(localStorage.getItem('user'))['firstname'])
                setlastname(JSON.parse(localStorage.getItem('user'))['lastname'])
                console.log(1)
            }
          }, 400);
    },[])

    return(
        <div className="mainList">

        <ListItem className="test">
            <Avatar alt="messi" src={messi} className="desktopProfilePic"/>
        </ListItem>

        <ListItem>
            <p className="userName"> {`${firstname} ${lastname}`}</p>
        </ListItem>

        <Divider/>

        <ListItem button
        onClick={()=>{history.push('/dashboard')}}
        >
            <p className="dashboard">داشبورد</p>
            <ListItemIcon className="dashIcon">
                <DashboardIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button>
            <p className="profile">پروفایل</p>
            <ListItemIcon className="profileIcon">
                <PersonRoundedIcon/>
            </ListItemIcon>
        </ListItem>

        <ListItem button
        onClick={()=>{history.push('/dashboard/added_courses')}}
        >
            <p className="courses">کلاس</p>
            <ListItemIcon className="courseIcon">
                <ClassIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button>
            <p className="store">فروشگاه</p>
            <ListItemIcon className="storeIcon">
                <ShoppingCartIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button className="QA">
            <p className="QandA">سوالات</p>
            <ListItemIcon className="QandAIcon">
                <QuestionAnswerIcon/>
            </ListItemIcon>
        </ListItem>


        <Divider/>


        <ListItem button>
            <p className="setting">تنظیمات</p>
            <ListItemIcon className="setIcon">
                <SettingsIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button
        onClick={()=>{history.push('/login'); localStorage.removeItem('token');
        localStorage.removeItem('user');}}>
            <p className="exit">خروج</p>
            <ListItemIcon className="exitIcon">
                <ExitToAppIcon className="logoutIcon"/>
            </ListItemIcon>
        </ListItem>


        </div>
        )
}

export const MobileListItems = (
    <div className="mobileList">


        <ListItem>
            <Avatar alt="messi" src={messi}/>
            <p className="userName">لیونل مسی</p>
        </ListItem>

        <Divider/>

        <ListItem button>
            <p className="dashboard">داشبورد</p>
            <ListItemIcon className="dashIcon">
                <DashboardIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button>
            <p className="profile">پروفایل</p>
            <ListItemIcon className="profileIcon">
                <PersonRoundedIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button>
            <p className="store">فروشگاه</p>
            <ListItemIcon className="storeIcon">
                <ShoppingCartIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button className="QA">
            {/*<div className="PP">*/}
            <p className="QandA">سوالات</p>
            <ListItemIcon className="QandAIcon">
                <QuestionAnswerIcon/>
            </ListItemIcon>
            {/*</div>*/}
        </ListItem>


        <Divider/>


        <ListItem button>
            <p className="setting">تنظیمات</p>
            <ListItemIcon className="setIcon">
                <SettingsIcon/>
            </ListItemIcon>
        </ListItem>


        <ListItem button>
            <p className="exit">خروج</p>
            <ListItemIcon className="exitIcon">
                <ExitToAppIcon className="logoutIcon"/>
            </ListItemIcon>
        </ListItem>


    </div>
);
