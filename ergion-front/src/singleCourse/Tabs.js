import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Content from './Content';
import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabFont: {
        fontSize: 18,
    }
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Vazir", sans-serif'
    },
    direction: 'rtl'
});

export default function NavTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <StylesProvider jss={jss} >
            <ThemeProvider theme={theme} >

                <div className={classes.root} dir='rtl'>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        indicatorColor="primary"
                        textColor="primary"
                    >

                        <Tab label="مطالب" {...a11yProps(0)} className={classes.tabFont} />
                        <Tab label="اخبار" {...a11yProps(1)} className={classes.tabFont} />


                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChange}
                    >
                    <TabPanel value={value} index={0}>
                        <Content course={props.course}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        اخبار
                        </TabPanel>
                    </SwipeableViews>
                </div>

            </ThemeProvider>
        </StylesProvider>
    );
}