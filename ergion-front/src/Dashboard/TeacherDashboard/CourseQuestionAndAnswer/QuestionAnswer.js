import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Grid, IconButton, InputBase, ThemeProvider, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, StylesProvider, jssPreset } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import SendIcon from '@material-ui/icons/Send';
import math from '../../../Pics/math.jpg';
import { withRouter } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    grid: {
        marginTop: '16px'
    },
    active: {
        backgroundColor: "red"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    cardActions: {
        padding: theme.spacing(0),
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9
        height: 100,
        width: '100%',
        objectFit: 'fill'
    },

});

class MailAnswer extends Component {
    state={
        expanded:false,
        answer:'',
    }
    handleExpandClick = () => {
        this.setState({
            expanded:!this.state.expanded
        })
    };

    handleTextChange = (event) => {
        this.setState({
            answer:event.target.value
        })
    }

    render(){
        const { classes } = this.props;
        const theme = createMuiTheme({
            direction: 'rtl',
        });
    
        const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
        return (
            <ThemeProvider theme={theme}>
                <StylesProvider jss={jss}>
                    <Grid container spacing={4} justify='center'>
                        <Grid item xs>
                            <Card dir='rtl' style={{ width: '100%' }}>
                                <CardHeader
                                    className='text'
                                    avatar={
                                        <Avatar src={''} />
                                    }
                                    title={
                                        <Typography className='text'>
                                            نوید اکبری
                                </Typography>
                                    }
                                    subheader="September 14, 2020"
                                />
                                <CardContent style={{ textAlign: 'right' }}>
                                    <Typography className='text' variant="body2" color="textPrimary" component="p">
                                        سلام خواستم بپرسم که آیا خونتون مورچه داره؟
                            </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: this.state.expanded,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={this.state.expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardHeader
                                        className='text'
                                        style={{ marginRight: '20px' }}
                                        avatar={
                                            <Avatar src={''} />
                                        }
                                        title={
                                            <Typography className='text'>
                                                استاد جعفری
                                            </Typography>
                                        }
                                        subheader="September 16, 2020"
                                    />
                                    <CardContent style={{ textAlign: 'right', marginRight: '20px' }}>
                                        <Typography className='text' variant="body2" color="textPrimary" component="p">
                                            سلام خیر نداره
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                            <Grid dir='rtl' container wrap="nowrap" alignItems='center' style={{ minHeight: "8rem" }}>
                                <Grid item xs>
                                    <InputBase
                                        style={{ padding: '8px' }}
                                        value={this.state.answer}
                                        onChange={this.handleTextChange}
                                        rowsMax={2}
                                        multiline
                                        fullWidth
                                        className='input'
                                        placeholder="متن جواب"
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton color="primary">
                                        <SendIcon className='icon' />
                                    </IconButton>
                                </Grid>
    
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Card className="courselayout">
                                <CardMedia
                                    className={classes.cardMedia}
                                    component='img'
                                    image={math}
                                    title={''}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom className="text1">
                                        کلاس فلان
                                </Typography>
                                    <Typography className="text1">
                                        جلسه فلان
                                </Typography>
                                </CardContent>
                                <Divider />
                                <Divider />
                                <Divider />
                                <Divider />
                                <CardActions className={classes.cardActions}>
                                <Button fullWidth size="small" variant='contained' color="primary" className='text1' href={`/student_dashboard/added_courses/`}>
                                        مشاهده
                                </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
    
                </StylesProvider>
            </ThemeProvider>
    
        )
    }


    
}

export default withStyles(useStyles)(withRouter(MailAnswer));