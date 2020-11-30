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


import Comments from "./Comments";
import './Comments.scss'
import { Button, CssBaseline, Grid, Paper, Tab, Tabs, withStyles } from "@material-ui/core";
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
    marginBottom: "30px",
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
        <Box p={3}>
          <Typography>{children}</Typography>
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
  const [open, setOpen] = React.useState(true);
  const [media, setMedia] = useState('');
  const [files, setFiles] = useState([]);
  const [episodes, setEpisodes] = useState([])
  const [description, setDescription] = useState('')

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
    axios.get(`http://127.0.0.1:8000/api/episode/?episode_id=${episode_id}`,config)
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
            id: file.id
          }
          const oldFiles = files
          oldFiles.push(newFile)
          setFiles(oldFiles)
        }
      })
    })
    axios.get(`http://127.0.0.1:8000/api/chapter-episodes/?chapter_id=${chapter_id}`,config)
    .then((res)=>{
      //console.log(res)
      res.data.map((episode)=>{
        const newEpisode = {
          id: episode.id,
          name: episode.name,
          chapter_id: episode.chapter_id,
          description: episode.episode_description,
          selected: false
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
      }
    })
    })
  },[])

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline>
        {/* <Container> */}
          <Grid container item className={classes.spacing} lg={10} md={12} direction='row' justify="space-evenly">
            <Grid container item={true} justify="space-between" className={classes.spacing} style={{margin:'2px'}} md={8} lg={8} spacing={4}>
            {media === '' ? (
              <Typography></Typography>):
              (<Grid item container>
                <ReactPlayer
                width='100%'
                height='100%'
                url={media}
                controls
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
                          <Box fontSize={20}>
                          </Box>
                        ):(
                        <Box fontSize={20}>
                          {description}
                        </Box>
                        )}
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    {files.map((tabFile) => (
                    <Grid container spacing={2} dir="rtl" key={tabFile.id}>
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography style={{ alignSelf: 'center' }} component='div' noWrap>
                                <div style={{ display: 'flex' }}>
                                <HandlePreviewIcon src={fileNameExtractor(tabFile.src)} />
                                    <Box style={{ marginRight: '10px' }}>
                                        {fileNameExtractor(tabFile.src)}
                                    </Box>
                                  </div>
                                </Typography>
                                <div style={{ alignSelf: 'center' }} />
                                <div style={{ alignSelf: 'center' }}>
                                    <Button className='text' variant="contained" color="primary" onClick={()=>handleDownload(tabFile.src)}>
                                            دانلود
                                    </Button>
                                </div>

                            </div>
                        </Grid>
                    </Grid>
                    ))}
                    </TabPanel>
                  </SwipeableViews>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Comments />
              </Grid>
            </Grid>
            <Grid alignContent='flex-start' alignItems='stretch' style={{margin:'2px'}} item container className={classes.spacing} md={3} lg={3} spacing={4}>
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