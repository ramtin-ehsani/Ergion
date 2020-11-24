import React from "react";
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

const Comment = ({ comments }) => {
    const [open, setOpen] = React.useState({ 1: false, 2: false, 3: false, 4: false, 5: false });
    const [nCommentString, setnCommentString] = React.useState('');
    const [replies, setReplies] = React.useState({ 1: [], 2: [], 3: [], 4: [], 5: [] });
    const [liked, setLiked] = React.useState({ 1: false, 2: false, 3: false, 4: false, 5: false })

    const onChangeHandler = (event) => {
        setnCommentString(
            event.target.value
        )
    }

    const onSubmit = (id) => {
        const newComment = {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": nCommentString
        }
        if (nCommentString.length !== 0) {
            setReplies({
                ...replies, [id]: [...replies[id], newComment]
            })
            setnCommentString('')
        }
    }

    const handleClick = (id) => {
        setOpen({ ...open, [id]: !open[id] });
    };

    const handleClickLike = (id) => {
        setLiked({ ...liked, [id]: !liked[id] });
    };

    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const classes = useStyles();
    return (
        <StylesProvider jss={jss}>
            <List className={classes.root} dir='rtl'>
                {comments.map(comment => {
                    console.log("Comment", comment);
                    return (
                        <React.Fragment key={comment.id}>
                            <ListItem key={comment.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="avatar" src={Faker.image.people()} />
                                </ListItemAvatar>
                                <ListItemText
                                    style={{ textAlign: 'right' }}
                                    primary={
                                        <Typography className={classes.fonts}>
                                            {comment.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                dir='rtl'
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {comment.email}
                                            </Typography>
                                            {` - ${comment.body}`}
                                        </>
                                    }
                                ></ListItemText>
                                <ListItemIcon >
                                    <IconButton onClick={() => handleClick(comment.id)}>
                                        <ReplyIcon />
                                    </IconButton>
                                    <IconButton onClick={()=> handleClickLike(comment.id)}>
                                        {liked[comment.id] ? <FavoriteIcon color='secondary'/> : <FavoriteBorderOutlinedIcon/>}
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                            <Collapse in={open[comment.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding dir='rtl'>
                                    {replies[comment.id].map(reply => {
                                        return (
                                            <ListItem key={reply.id} alignItems="flex-start" className={classes.nested}>
                                                <ListItemAvatar>
                                                    <Avatar alt="avatar" src={Faker.image.people()} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    style={{ textAlign: 'right' }}
                                                    primary={
                                                        <Typography className={classes.fonts}>
                                                            {reply.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                dir='rtl'
                                                                component="span"
                                                                variant="body2"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {reply.email}
                                                            </Typography>
                                                            {` - ${reply.body}`}
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })}
                                    <ListItem className={classes.nested} dir='rtl'>
                                        <Grid container wrap="nowrap" alignItems='center' style={{ minHeight: "5rem" }}>
                                            <Grid item xs zeroMinWidth>
                                                <InputBase
                                                    style={{padding:'8px'}}
                                                    value={nCommentString}
                                                    onChange={onChangeHandler}
                                                    rowsMax={2}
                                                    multiline
                                                    fullWidth
                                                    className='input2'
                                                    placeholder="متن پیام"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton color="primary" className={classes.iconButton} onClick={()=> onSubmit(comment.id)}>
                                                    <SendIcon className='icon'/>
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

export default Comment;