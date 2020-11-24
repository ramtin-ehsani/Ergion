import { Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Comment from "./Comment";
import SendIcon from '@material-ui/icons/Send';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import './Comments.scss';

const useStyles = makeStyles((theme) => ({
    root: {
    //   padding: '2px 4px',
    //   display: 'flex',
    //   alignItems: 'center',
    //   width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
    //   padding: 10,
    },
    divider: {
    //   height: 28,
    //   margin: 4,
    },
    color: {
        backgroundColor: 'white'
    }
  }));

class Comments extends Component {
  state = {
    comments: [],
    isFetching: true,
    nCommentString:'',
    newComment:{},
  };

  async fetchData(url) {
    const response = await fetch(url);
    let data = await response.json();
    return data;
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts/1/comments";
    let data = this.fetchData(url);
    data.then(comments => {
      let commentList = comments.slice(0, 10);
      this.setState(
        {
          comments: commentList,
          isFetching: false
        },
        () => console.log("New State", this.state.comments)
      );
    });
  }

  onChangeHandler= (event)=>{
    this.setState({
        nCommentString: event.target.value
    })    
  }

  onSubmit = ()=>{
      const newComment = {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": this.state.nCommentString
      }
      if(newComment.body.length !== 0){
        this.setState({
            comments:[...this.state.comments, newComment],
            nCommentString:''
        })
      }
  }

  render() {
    const classes = this.props;
    const formData = this.state;
    const { comments, isFetching } = this.state;
    return isFetching ? "Loading..." : (
        <Grid container direction='row' spacing={2} dir='rtl'>
            <Typography className='title' component="div">
                <Box fontSize={20}>
                    کامنت بگذارید
                </Box>
            </Typography>
            <Grid container wrap="nowrap" alignItems='center' style={{ minHeight: "5rem" }}>
                <Grid item xs zeroMinWidth>
                <InputBase
                    style={{padding:'8px'}}
                    value={formData.nCommentString}
                    onChange={this.onChangeHandler}
                    rowsMax={2}
                    multiline
                    fullWidth
                    className='input'
                    placeholder="متن پیام"
                    />
                </Grid>
                <Grid item>
                <IconButton color="primary" onClick={this.onSubmit}>
                    <SendIcon className='icon' />
                </IconButton>
                </Grid>                
                
            </Grid>
            <Grid item style={{padding:'0px'}} dir='rtl' xs={12}>
                <Comment comments={comments} />
            </Grid>
        </Grid>
    
    );
  }
}
export default (Comments);