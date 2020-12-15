import { Avatar, Badge, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, withStyles } from '@material-ui/core';
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

const useStyles = (theme) => ({
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
            boxShadow: `0 2px 2px 0 ${Color(color)
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
        events: [
            {
                id: 1,
                name: 'علی اکبری',
                profile: p1,
                class: 'ریاضی 2',
                event: 'پیوست!',
                time: '1 ساعت پیش',
                harf:'به'
            },
            {
                id: 2,
                name: 'ممد ممدی',
                profile: p2,
                event: 'خارج شد!',
                class: 'ادبیات',
                time: '2 ساعت پیش',
                harf:'از'
            }
        ]
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
                                <List>
                                    {this.state.events.map((event) => {
                                        return (
                                            <ListItem key={event.id}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={event.profile} />
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
                                                                {`${event.time} . `}
                                                            </Typography>
                                                            <Typography
                                                                dir='rtl'
                                                                component="span"
                                                                variant="body1"
                                                                className='text'
                                                                color="textPrimary"
                                                            >
                                                                {`${event.name} ${event.harf} کلاس ${event.class} ${event.event}`}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })}
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