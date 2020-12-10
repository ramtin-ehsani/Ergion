import React, { useEffect, useState } from "react";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./Player.scss";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import { AttachFile, Description, PictureAsPdf, MovieCreationOutlined } from '@material-ui/icons';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';


import Comments from "./Comments";
import './Comments.scss'
import { Button, CssBaseline, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, withStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import axios from "axios";
import ReactPlayer from "react-player";

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "50px",
    marginBottom: "100px",
  },
  header: {
    marginTop: "40px",
    fontWeight: 600
  },
  button: {
    color: "orange"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '100%',
  },
  nested: {
    paddingRight: theme.spacing(4),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ height: "10rem" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CommentMain() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [media, setMedia] = useState('');
  const [files, setFiles] = useState([]);
  const [episodes, setEpisodes] = useState([])
  const [description, setDescription] = useState('')
  const [like, setLiked] = useState(false)
  const [likes, setLikes] = useState()

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleLikeEpisode = ()=>{
    const episode_id = window.location.href.split('/')[7];
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
    }
    axios.put('http://127.0.0.1:8000/api/course/post-likes/',{
      post_id:episode_id
    },config)
    if(!like){
      setLikes(likes+1)
    }
    else{
      setLikes(likes-1)
    }
    setLiked(!like)
  }

  const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
  const fileNameExtractor = (src) => {
    const lastIndexOfSlash = String(src).lastIndexOf('/')
    const lastIndexOfDot = String(src).lastIndexOf('.')
    let name = String(src).substring(lastIndexOfSlash + 1)
    const type = String(src).substring(lastIndexOfDot)

    if (name.length > 15) {
        name = name.substring(0, 15) + type
    }
    return name

  }
  const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3f50b5',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

  const handleDownload = (file) => {
    axios({
        url: file,
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileNameExtractor(file));
        document.body.appendChild(link);
        link.click();
    }).catch((error) => {
        console.log(error)
    })

}
  const HandlePreviewIcon = (props) => {
    const { src } = props

    const type = fileNameExtractor(src)

    if (type.includes("mp4")) return <MovieCreationOutlined color='primary'/>
    if (type.includes("jpg")
        || type.includes("jpeg")
        || type.includes("png")) {
        return <ImageIcon color='primary'/>
    }
    if (type.includes("zip")) return <Description color='primary'/>

    if (type.includes("pdf")) return <PictureAsPdf color='primary'/>

    return <AttachFile color='primary'/>

  }


  useEffect(()=>{
    const episode_id = window.location.href.split('/')[7];
    const chapter_id = window.location.href.split('/')[5];
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
    }
    axios.get(`http://127.0.0.1:8000/api/course/post-files/?post_id=${episode_id}`,config)
    .then((res)=>{
      res.data.map((file)=>{
        const src = file.file
        const lastIndexOfDot = String(src).lastIndexOf('.')
        const type = String(src).substring(lastIndexOfDot)
        if(type === '.mp4'){
          setMedia(src)
        }
        else{
          const newFile = {
            src: src,
            id: file.id,
            size: file.size,
          }
          const oldFiles = files
          oldFiles.push(newFile)
          setFiles(oldFiles)
        }
      })
    })
    axios.get(`http://127.0.0.1:8000/api/course/chapter-episodes/?chapter_id=${chapter_id}`,config)
    .then((res)=>{
      //console.log(res)
      res.data.map((episode)=>{
        const newEpisode = {
          id: episode.id,
          name: episode.name,
          chapter_id: episode.chapter_id,
          description: episode.episode_description,
          selected: false,
          liked: episode.liked,
          likes: episode.likes_count
        }
        if(String(newEpisode.id) === String(episode_id)){
          newEpisode.selected = true
        }
        const oldEps = episodes
        oldEps.push(newEpisode)
        setEpisodes(oldEps)
      })
    res.data.map((newEpisode)=>{
      if(String(newEpisode.id) === String(episode_id)){
        setDescription(newEpisode.episode_description)
        setLiked(newEpisode.liked)
        setLikes(newEpisode.likes_count)
      }
    })
    })
  },[])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline>
        {/* <Container> */}
          <Grid container item className={classes.spacing} lg={10} md={12} direction='row' spacing={3} justify="space-evenly"  >
            <Grid container item={true} xs={12} md={8} lg={8} spacing={4}>
            {media === '' ? (
              <Typography></Typography>):
              (<Grid item container>
                <ReactPlayer
                width='100%'
                height='100%'
                url={media}
                controls
                style={{ backgroundColor: '#000' }}
                />
                </Grid>
                )}
                
              <Grid item xs={12}>
                <AppBar position="static" dir='rtl' color='transparent'>
                  <Tabs value={value} onChange={handleChange} indicatorColor='primary'>
                    <Tab  className='title' label="توضیحات" {...a11yProps(0)} />
                    <Tab className='title' label="فایل ها" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <Paper className={classes.paper}>
                  <SwipeableViews
                    axis={'x-reverse'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0}>
                      <Typography className='title' component="div">
                        {description === '' ? (
                          <Box fontSize={20} p={3}>
                            توضیحی وجود ندارد
                          </Box>
                        ):(
                        <Box fontSize={20} p={3}>
                          {description}
                        </Box>
                        )}
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    {files.length > 0 ? (
                      <TableContainer dir="rtl">
                          <Table aria-label="customized table" dir="rtl">
                              <TableHead dir="rtl">
                                  <TableRow dir="rtl" className='title'>
                                      <StyledTableCell align="center"><Typography className='title'>آیکون</Typography></StyledTableCell>
                                      <StyledTableCell align="center"><Typography className='title'>اسم فایل</Typography></StyledTableCell>
                                      <StyledTableCell align="center"><Typography className='title'>حجم</Typography></StyledTableCell>
                                      <StyledTableCell align="center"><Typography className='title'>دانلود</Typography></StyledTableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {files.map((tabFile) => (
                                      <StyledTableRow dir="rtl" key={tabFile.id}>
                                          <StyledTableCell align="center">
                                              <HandlePreviewIcon src={fileNameExtractor(tabFile.src)} />
                                          </StyledTableCell>
                                          <StyledTableCell align="center">
                                              <Box >
                                                  {fileNameExtractor(tabFile.src)}
                                              </Box>
                                          </StyledTableCell>
                                          <StyledTableCell align="center">
                                              <div dir='ltr'>
                                                  <Box style={{ color: 'grey' }} fontSize={14}>
                                                      {bytesToSize(tabFile.size)}
                                                  </Box>
                                              </div>
                                          </StyledTableCell>
                                          <StyledTableCell align="center">
                                              <Button variant="outlined" color='primary' onClick={() => handleDownload(tabFile.src)}>

                                                  <GetAppRoundedIcon />
                                              </Button>
                                          </StyledTableCell>
                                      </StyledTableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </TableContainer>) : (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography
                              style={{ marginTop: '12px' }} className='title' >
                              <Box fontSize={18}  >
                                 فایلی وجود ندارد
                              </Box>

                          </Typography>
                      </div>
                  )}
                    </TabPanel>
                  </SwipeableViews>
                  <Grid container spacing={3} style={{margin:'3px'}} alignItems='center' justify='flex-start'>
                    <Grid item style={{padding:'4px'}}>
                      <IconButton onClick={handleLikeEpisode}>
                      {like ? <FavoriteIcon color='secondary' /> : <FavoriteBorderOutlinedIcon />}
                      </IconButton>
                    </Grid>
                    <Grid item style={{padding:'4px'}}>
                      <Typography className='title' dir='rtl'>
                        {likes}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Comments />
              </Grid>
            </Grid>
            <Grid alignContent='flex-start' alignItems='stretch' item container md={3} lg={3} spacing={4}>
              {/* <Paper style={{ padding: '32px' }}>
                <Typography className={classes.header} variant="h4" gutterBottom>
                  Episodes
                </Typography>
              </Paper> */}
              <Grid item xs={12} className='stick'>
                <Paper>
                  <ListItem button onClick={handleClick} dir='rtl'>
                    <ListItemIcon>
                      <ClassIcon />
                    </ListItemIcon>
                    <ListItemText dir='rtl'>
                      <Typography className='title' style={{ textAlign: 'right' }}>
                        سایر جلسات
                  </Typography>
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {episodes.map((episode)=>{
                        return(
                        <ListItem button className={classes.nested} key={episode.id} selected={episode.selected}
                        onClick={()=>{window.location=`/student_dashboard/chapter/${episode.chapter_id}/episode/${episode.id}`}}>
                          <ListItemIcon>
                            <SchoolIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography className='title' style={{ textAlign: 'right' }}>
                              {episode.name}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                        )
                      })}
                    </List>
                  </Collapse>
                </Paper>
              </Grid>


            </Grid>
          </Grid>
        {/* </Container> */}
      </CssBaseline>
    </ThemeProvider>
  );
}

export default withStyles(useStyles)(CommentMain);