import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    ListItemIcon,
    IconButton,
    Collapse,
    Grid,
    InputBase
} from "@material-ui/core";
import Faker from "faker";
import rtl from "jss-rtl";
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Comment.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0)
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    },
    nested: {
        paddingRight: theme.spacing(8),
    },
}));

const Comment = ({ comments , replies, reduxReply, onReply, onLikeComment, reduxLikes, reduxOpens, onOpenReply, reduxNewText, onNewText}) => {
    const [nCommentString, setnCommentString] = React.useState('');

    const onChangeHandler = (event ,id) => {
        console.log(reduxNewText)
        console.log(id)
        // setnCommentString(
        //     event.target.value
        // )
        onNewText(id, event.target.value)
    }

    const onSubmit = (id) => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
        }
        if (reduxNewText[id].length !== 0) {
            axios.post('http://127.0.0.1:8000/api/course/comments/', {
                parent_comment_id: id,
                comment_text: reduxNewText[id]
            }, config).then((res) => {
                console.log(res)
                if(reduxReply[id]){
                    const oldreplies = reduxReply[id]
                    oldreplies.push(res.data)
                    console.log(oldreplies)
                    onReply(id, oldreplies)
                    onNewText(id, '')
                }
                else{
                    onReply(id, [res.data])
                    onNewText(id, '')
                }
                setnCommentString('')
            })
        }
    }

    const handleClick = (id) => {
        onOpenReply(id, !reduxOpens[id])
    };

    const handleClickLike = (id) => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
        }
        axios.put('http://127.0.0.1:8000/api/course/comment-likes/',{
            comment_id: id
        },config).then((res)=>{
            console.log(res)
            onLikeComment(id, res.data.liked)
            console.log(reduxLikes)
        })
    };

    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const classes = useStyles();
    return (
        <StylesProvider jss={jss}>
            <List className={classes.root} dir='rtl'>
                {comments.map(comment => {
                    return (
                        <React.Fragment key={comment.id}>
                            <ListItem key={comment.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="avatar" src={comment.picture} />
                                </ListItemAvatar>
                                <ListItemText
                                    style={{ textAlign: 'right' }}
                                    primary={
                                        <Typography className='text1'>
                                            {comment.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                dir='rtl'
                                                component="span"
                                                variant="body2"
                                                className='text2'
                                                color="textPrimary"
                                            >
                                                {comment.body}
                                            </Typography>
                                            {/* {` - ${comment.body}`} */}
                                        </>
                                    }
                                ></ListItemText>
                                <ListItemIcon >
                                    <IconButton onClick={() => handleClick(comment.id)}>
                                        <ReplyIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleClickLike(comment.id)}>
                                        {reduxLikes[comment.id] ? <FavoriteIcon color='secondary' /> : <FavoriteBorderOutlinedIcon />}
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                            <Collapse in={reduxOpens[comment.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding dir='rtl'>
                                    {
                                    reduxReply[comment.id]?.map(reply => {
                                        return (
                                            <ListItem key={reply.id} alignItems="flex-start" className={classes.nested}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={reply.profile_picture} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    style={{ textAlign: 'right' }}
                                                    primary={
                                                        <Typography className='text1'>
                                                            {`${reply.user_firstname} ${reply.user_lastname}`}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                dir='rtl'
                                                                component="span"
                                                                variant="body2"
                                                                className='text2'
                                                                color="textPrimary"
                                                            >
                                                                {reply.comment_text}
                                                            </Typography>
                                                            {/* {` - ${reply.body}`} */}
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })
                                    }
                                    <ListItem className={classes.nested} dir='rtl'>
                                        <Grid container wrap="nowrap" alignItems='center' style={{ minHeight: "5rem" }}>
                                            <Grid item xs zeroMinWidth>
                                                <InputBase
                                                    style={{ padding: '8px' }}
                                                    value={reduxNewText[comment.id]}
                                                    onChange={(event)=> onChangeHandler(event, comment.id)}
                                                    rowsMax={2}
                                                    multiline
                                                    fullWidth
                                                    className='input2'
                                                    placeholder="متن پیام"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton color="primary" className={classes.iconButton} onClick={() => onSubmit(comment.id)}>
                                                    <SendIcon className='icon' />
                                                </IconButton>
                                            </Grid>

                                        </Grid>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </List>
        </StylesProvider>

    );
};

const mapStateToProps = state => {
    return {
        reduxReply: state.replies,
        reduxComments: state.comments,
        reduxLikes: state.likes,
        reduxOpens: state.open,
        reduxNewText: state.nCommentString,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onReply: (id, reply) => dispatch({ type: actionTypes.REPLY, payload: reply, id:id }),
        onLikeComment: (id, like) => dispatch({type: actionTypes.LIKE_COMMENT, id:id, like:like }),
        onOpenReply: (id, open) => dispatch({type: actionTypes.OPEN_REPLAY, id:id, open:open }),
        onNewText: (id, txt) => dispatch({type: actionTypes.NEW_COMMENT_TEXT, id:id, txt:txt }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);