import { Avatar, Badge, Box, ButtonGroup, Card, CardActionArea, CardContent,
    CardHeader, CircularProgress, Container, CssBaseline, Divider, 
    Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, 
    Snackbar, 
    Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import Color from 'color';
import MailIcon from '@material-ui/icons/Mail';
import ClassIcon from '@material-ui/icons/Class';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { yellow, green, blue } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import time from "@jacobmarshall/human-time";
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        '.MuiCardHeader-action':{
            alignSelf:'center'
        },
        '.MuiCardHeader-avatar':{
            margin:'0 4px 0 0'
        }
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
        '&:hover': {
            boxShadow: `0 12px 14px -12.125px ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    }),
    cardDisabled: ({ color }) => ({
        minWidth: 256,
        borderRadius: 16,
        backgroundColor:'whitesmoke'
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
        count: 0,
        events: [],
        hasMore: true,
        requests: [],
        mounted_reqs:false,
        open:false,
        mounted_events:false,
    }

    loadMore(page){
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
                    if (newE.session_name !== null)
                        newE.type= `برای ${newE.course_name} ${newE.session_name} کامنت گذاشت`
                    else
                    newE.type= `برای خبر ${newE.course_name} کامنت گذاشت`
                }
                else if(newE.type === 'like'){
                    if (newE.session_name !== null)
                        newE.type= `${newE.session_name} از ${newE.course_name} را لایک کرد`
                    else newE.type= `خبر از ${newE.course_name} را لایک کرد`
                }
                else if(newE.type === 'join'){
                    newE.type= `به کلاس ${newE.course_name} پیوست`
                }
                else if(newE.type === 'question'){
                    newE.type= `از ${newE.session_name} کلاس ${newE.course_name} سوال کرد`
                }
                events.push(newE)
            })
            axios.get('http://127.0.0.1:8000/api/teacher/profile-details/',config)
            .then((res)=>{
                let count = res.data.count_of_questions;
                this.setState({count:count})
            })
            console.log(res.data.has_next)
            this.setState({hasMore:res.data.has_next,events:events,mounted_events:true})
            if(page === 1){
                axios.get('http://127.0.0.1:8000/api/teacher/join-requests/',config)
                .then((res)=>{
                    let requests=[]
                    res.data.map((req)=>{
                        requests.push(req)
                    })
                    this.setState({requests:requests, mounted_reqs:true})
                })
            }
        })
        

    }
    
    toFarsiNumber=(n)=> {
        const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    
        return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
    }

    rejectHandler=(id)=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('api_key')}`}
        }
        let requests = this.state.requests.slice();
        let item = requests.splice(id,1);
        this.setState({requests});
        axios.post('http://127.0.0.1:8000/api/teacher/join-requests/',{
            accept:0,
            id: item[0].id
        },config).then((res)=>{
            console.log(res)
        })
    }

    acceptHandler=(id)=>{
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('api_key')}`}
        }
        let requests = this.state.requests.slice();
        let item = requests.splice(id,1);
        this.setState({requests, open:true});
        axios.post('http://127.0.0.1:8000/api/teacher/join-requests/',{
            accept:1,
            id: item[0].id
        },config).then((res)=>{
            console.log(res)
        })
    }

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open:false})
    };

    render() {
        const { classes } = this.props;
        const history = this.props.history;

        return (
            <Container>
                <CssBaseline />
                <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleCloseSnack}>
                    <Alert onClose={this.handleCloseSnack} severity="success">
                        <Typography className='text'>
                        درخواست قبول شد
                        </Typography>
                    </Alert>
                </Snackbar>
                <Grid container item lg={10} className={classes.grid} direction='row' spacing={4}>
                    <Grid item xs>
                            <Card style={{ width: '100%' }} dir='rtl' className={classes.card}>
                                <CardActionArea onClick={() => history.push('/teacher_dashboard/questions')}>
                                    <CardHeader
                                        style={{ padding: '14px', textAlign:'right'}}
                                        avatar={
                                            <Badge color="secondary" badgeContent={this.state.count} overlap='circle'>
                                            <Avatar
                                                style={{ width: '70px', height: '70px' }} className={classes.avatarMail}>
                                                <MailIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                            </Avatar>
                                            </Badge>
                                        }
                                        title={
                                            <Typography className='text' variant='h5' style={{marginRight:'16px'  }}>
                                                سوال ها
                                        </Typography>
                                        }

                                    />
                                </CardActionArea>
                            </Card>
                    </Grid>
                    <Grid item xs>
                        <Card style={{ width: '100%' }} dir='rtl' className={classes.card}>
                            <CardActionArea onClick={() => history.push('/teacher_dashboard/added_courses')}>
                                <CardHeader
                                    style={{ padding: '14px', textAlign:'right'}}
                                    avatar={
                                        <Avatar
                                            style={{ width: '70px', height: '70px' }} className={classes.avatarClass}>
                                            <ClassIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography className='text' variant='h5' style={{marginRight:'16px'}}>
                                            کلاس ها
                                        </Typography>
                                    }
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Card style={{ width: '100%' }} dir='rtl' className={classes.cardDisabled}>
                            <CardActionArea disabled={true} disableRipple={true} disableTouchRipple={true}>
                                <CardHeader
                                    style={{ padding: '14px', textAlign:'right'}}
                                    avatar={
                                        <Avatar
                                            style={{ width: '70px', height: '70px' }} className={classes.avatarStds}>
                                            <ReceiptIcon style={{ width: '50px', height: '50px', color: 'white' }} />
                                        </Avatar>
                                    }
                                    title={
                                        <Typography className='text' variant='h5' style={{marginRight:'16px'}}>
                                            دانش آموزان
                                        </Typography>
                                    }
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item lg={10} className={classes.grid} direction='row' spacing={4}>
                    <Grid item xs={12} lg={4}>
                        <Card dir='rtl' style={{ width: '100%', borderRadius: 16 }}>
                            <CardHeader
                                style={{ textAlign: 'right' }}
                                avatar={
                                    <PeopleOutlineOutlinedIcon />
                                }
                                title={
                                    <Typography style={{ padding: '8px' }} className='text' variant='h5'>
                                        عضو شدن
                                </Typography>
                                }
                            />
                            <Divider light />
                            <CardContent>
                                <List style={{height: 200, overflow: 'auto'}}>
                                    {this.state.requests.length === 0?
                                    (
                                    this.state.mounted_reqs ? (
                                        <Typography
                                        style={{
                                            margin: '0',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            msTransform: 'translate(-50%, -50%)',
                                            transform: 'translate(-50%, -50%)'}}
                                        className='text'>
                                            درخواستی یافت نشد
                                        </Typography>)
                                        :(
                                            <CircularProgress/>
                                        )
                                    ):
                                    (this.state.requests.map((req,index)=>{
                                        return(
                                            <Card key={req.id} dir='rtl' elevation={0}>
                                                <CardHeader
                                                dir='rtl'
                                                className='text'
                                                style={{padding:'8px 2px'}}
                                                avatar={
                                                    <Avatar alt="avatar" src={req.student_profile_picture} />
                                                }
                                                title={
                                                    <Typography style={{marginLeft:'2px',marginRight:'8px'}} className='text'>
                                                        {`${req.student_firstname} ${req.student_lastname}`}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <Box style={{marginLeft:'2px',marginRight:'8px'}} className='text'>
                                                        {req.course_name}
                                                    </Box>
                                                }
                                                action={
                                                <ButtonGroup dir='ltr'>
                                                    <IconButton color='secondary' onClick={()=>this.rejectHandler(index)}>
                                                        <ClearIcon/>
                                                    </IconButton>
                                                    <IconButton color='primary' onClick={()=>this.acceptHandler(index)}>
                                                        <DoneIcon/>
                                                    </IconButton>
                                                </ButtonGroup>
                                                }
                                                >
                                                </CardHeader>
                                                
                                            </Card>
                                        )
                                    }))
                                    
                                    }
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Card dir='rtl' style={{ width: '100%', borderRadius: 16 }}>
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
                                    {this.state.events.length === 0 && this.state.mounted_events ?
                                        (<Typography
                                        style={{
                                            margin: '0',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            msTransform: 'translate(-50%, -50%)',
                                            transform: 'translate(-50%, -50%)'}}
                                        className='text'>
                                            اتفاقی یافت نشد
                                        </Typography>):
                                        (<InfiniteScroll
                                        pageStart={0}
                                        hasMore={this.state.hasMore}
                                        loadMore={this.loadMore.bind(this)}
                                        loader={<div className="loader" key={0}><CircularProgress/></div>}
                                        useWindow={false}
                                        threshold={5}
                                        getScrollParent={() => this.scrollParentRef}
                                        >
                                        {this.state.events.map((event) => {
                                            return (
                                                <ListItem key={event.creation_time}>
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
                                                                        this.toFarsiNumber(time(new Date(event.creation_time))
                                                                        .replace("years", "سال")
                                                                        .replace("year", "سال")
                                                                        .replace("months", "ماه")
                                                                        .replace("month", "ماه")
                                                                        .replace("weeks", "هفته")
                                                                        .replace("week", "هفته")
                                                                        .replace("hours", "ساعت")
                                                                        .replace("hour", "ساعت")
                                                                        .replace("minutes", "دقیقه")
                                                                        .replace("minute", "دقیقه")
                                                                        .replace("days", "روز")
                                                                        .replace("day", "روز")
                                                                        .replace("seconds", "ثانیه")
                                                                        .replace("second", "ثانیه")
                                                                        .replace("ago", "پیش"))
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
                                        </InfiniteScroll>)}
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