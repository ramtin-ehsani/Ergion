import { Avatar, Badge, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import Color from 'color';
import MailIcon from '@material-ui/icons/Mail';
import ClassIcon from '@material-ui/icons/Class';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { yellow, green, blue } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import p1 from '../../../Pics/messi.jpg';
import p2 from '../../../Pics/lit.jpg';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import time from "@jacobmarshall/human-time";

const useStyles = (theme) => ({
    "@global": {
        "*::-webkit-scrollbar": {
          width: "0.4em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0,.2)",
        },
    },
    root: {
        display: 'flex',
    },
    grid: {
        marginTop: '24px'
    },
    card: ({ color }) => ({
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 12px 14px -12.125px ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    }),
    avatarMail: {
        color: theme.palette.getContrastText(yellow[600]),
        backgroundColor: yellow[600],
    },
    avatarClass: {
        color: theme.palette.getContrastText(blue[600]),
        backgroundColor: blue[600],
    },
    avatarStds: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[600],
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

});

class MainDashboard extends Component {
    state = {
        count: 2,
        events: [],
        hasMore: true,
    }

    loadMore(page){
        setTimeout(()=>{
            console.log(page)
            const config = {
                headers: { Authorization: `Token ${localStorage.getItem('api_key')}`}
                }
            var events = this.state.events;
            axios.get(`http://127.0.0.1:8000/api/teacher/timeline/?page=${page}`,config)
            .then((res)=>{
                res.data.data.map((event)=>{
                    var newE = event;
                    if(newE.type === 'comments'){
                        newE.type= `برای ${newE.course_name} ${newE.session_name} کامنت گذاشت`
                    }
                    else if(newE.type === 'like'){
                        newE.type= `${newE.session_name} از ${newE.course_name} را لایک کرد`
                    }
                    else if(newE.type === 'join'){
                        newE.type= `به کلاس ${newE.course_name} پیوست`
                    }
                    events.push(newE)
                })
                console.log(res.data.has_next)
                this.setState({hasMore:res.data.has_next,events:events})
            })
        },1500)
        

    }
    render() {
        const { classes } = this.props;
        const history = this.props.history;

        return (
            <Container>
                <CssBaseline />
                <Grid container item lg={10} className={classes.grid} direction='row' spacing={4}>
                    <Grid item xs>
                        <Badge style={{ width: '100%' }} color="secondary" badgeContent={this.state.count}>
                            <Card style={{ width: '100%' }} dir='rtl' className={classes.card}>
                                <CardActionArea>
                                    <CardHeader
                                        style={{ padding: '8px' }}
                                        avatar={
                                            <Avatar
                                                style={{ width: '70px', height: '70px' }} className={classes.avatarMail}>
                                                <MailIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                            </Avatar>
                                        }
                                        title={
                                            <Typography className='text' variant='h5'>
                                                سوال ها
                                        </Typography>
                                        }

                                    />
                                </CardActionArea>
                            </Card>
                        </Badge>
                    </Grid>
                    <Grid item xs>
                        <Card style={{ width: '100%' }} dir='rtl' className={classes.card}>
                            <CardActionArea onClick={() => history.push('/teacher_dashboard/added_courses')}>
                                <CardHeader
                                    style={{ padding: '8px' }}
                                    avatar={
                                        <Avatar
                                            style={{ width: '70px', height: '70px' }} className={classes.avatarClass}>
                                            <ClassIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography className='text' variant='h5'>
                                            کلاس ها
                                        </Typography>
                                    }
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card style={{ width: '100%' }} dir='rtl' className={classes.card}>
                            <CardActionArea>
                                <CardHeader
                                    style={{ padding: '8px' }}
                                    avatar={
                                        <Avatar
                                            style={{ width: '70px', height: '70px' }} className={classes.avatarStds}>
                                            <ReceiptIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography className='text' variant='h5'>
                                            دانش آموزان
                                        </Typography>
                                    }
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item lg={10} className={classes.grid} direction='row' spacing={4}>
                    <Grid item xs>
                        <Card dir='rtl' style={{ width: '100%', borderRadius: 16, boxShadow: 'none', }}>
                            <CardHeader
                                style={{ textAlign: 'right' }}
                                avatar={
                                    <UpdateIcon />
                                }
                                title={
                                    <Typography style={{ padding: '8px' }} className='text' variant='h5'>
                                        اتفاقات اخیر
                                </Typography>
                                }
                            />
                            <Divider light />
                            <CardContent>
                                <List style={{height: 200, overflow: 'auto'}} ref={(ref) => this.scrollParentRef = ref}>
                                    <InfiniteScroll
                                    pageStart={0}
                                    hasMore={this.state.hasMore}
                                    loadMore={this.loadMore.bind(this)}
                                    loader={<div className="loader" key={0}><CircularProgress/></div>}
                                    useWindow={false}
                                    getScrollParent={() => this.scrollParentRef}
                                    >
                                    {this.state.events.map((event) => {
                                        return (
                                            <ListItem key={event.id}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={event.user_profile_picture} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    style={{ textAlign: 'right' }}
                                                    primary={
                                                        <>
                                                            <Typography
                                                                dir='rtl'
                                                                component="span"
                                                                variant="body2"
                                                                className='text2'
                                                                color="textSecondary"
                                                            >
                                                                {
                                                                    time(new Date(event.creation_time))
                                                                    .replace("years", "سال")
                                                                    .replace("year", "سال")
                                                                    .replace("hours", "ساعت")
                                                                    .replace("hour", "ساعت")
                                                                    .replace("minutes", "دقیقه")
                                                                    .replace("minute", "دقیقه")
                                                                    .replace("days", "روز")
                                                                    .replace("day", "روز")
                                                                    .replace("seconds", "ثانیه")
                                                                    .replace("second", "ثانیه")
                                                                    .replace("ago", "پیش")
                                                                    +
                                                                    " . "
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                dir='rtl'
                                                                component="span"
                                                                variant="body1"
                                                                className='text'
                                                                color="textPrimary"
                                                            >
                                                                {`${event.user_firstname} ${event.user_lastname} ${event.type}`}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })}
                                    </InfiniteScroll>
                                </List>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withRouter(withStyles(useStyles)(MainDashboard));