import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import "./ListItems.scss";

export const mainListItems = (
    <div className="mainList">
        <ListItem button>
            <ListItemText  className="listItemText" primary="داشبورد"/>
            <ListItemIcon className="listItemIcon">
                <DashboardIcon/>
            </ListItemIcon>
        </ListItem>
        <ListItem button>
            <ListItemText className="listItemText" primary="پرسش و پاسخ"/>
            <ListItemIcon className="listItemIcon">
                <BarChartIcon/>
            </ListItemIcon>
        </ListItem>
        <ListItem button>
            <ListItemText  className="listItemText" primary="پروفایل"/>
            <ListItemIcon className="listItemIcon">
                <PeopleIcon/>
            </ListItemIcon>
        </ListItem>
        <ListItem button>
            <ListItemText className="listItemText" primary="سوابق"/>
            <ListItemIcon className="listItemIcon">
                <LayersIcon/>
            </ListItemIcon>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div className="secondaryList">
        <ListSubheader className="ListSubHeader">Secondary List Item</ListSubheader>
        <ListItem button>
            <ListItemText className="listItemText" primary="فروشگاه"/>
            <ListItemIcon className="listItemIcon">
                <ShoppingCartIcon/>
            </ListItemIcon>
        </ListItem>
        <ListItem button>
            <ListItemText className="listItemText" primary="تنظیمات"/>
            <ListItemIcon className="listItemIcon">
                <AssignmentIcon/>
            </ListItemIcon>
        </ListItem>
        <ListItem button>
            <ListItemText className="listItemText" primary="خروج"/>
            <ListItemIcon className="listItemIcon">
                <AssignmentIcon/>
            </ListItemIcon>
        </ListItem>
    </div>
);
