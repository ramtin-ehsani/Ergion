
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme.js';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import TextField from '@material-ui/core/TextField';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import InputBase from '@material-ui/core/InputBase';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import img1 from '../../../Pics/math.jpg';
const useStyles = makeStyles((theme) => ({
  container: {
    width:'100%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    margin: theme.spacing(0),

  },
  root: {
    display:'flex',
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 2),
    margin:theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(0),

  width:'100%',
    margin: theme.spacing(1),
   // padding: theme.spacing(2),
   padding: theme.spacing(2),
   paddingRight: theme.spacing(0),
   paddingLeft: theme.spacing(0),
  
  // display: 'flex',
   overflow: 'auto',
   flexDirection: 'column',
        
      },
      reply: {
        display: 'flex',
    flexWrap: 'wrap',
   
  },
  input: {
    display: 'none',
  },
  
}));

const message = 'new episode'

export default function AutoGridNoWrap() {
    const [image1,setimage1]=React.useState();
    const [image2,setimage2]=React.useState();
    const [image3,setimage3]=React.useState();
    const [image4,setimage4]=React.useState();
    const [video,setvideo]=React.useState();
    const [pdf,setpdf]=React.useState({});
    const [isvideo,setisvideo]=React.useState(false);
    const [ispdf,setispdf]=React.useState(false);
    const [isimage,setisimage]=React.useState(0);
    const [dpdf,setdpdf]=React.useState(false);
    const [dvideo,setdvideo]=React.useState(false);
    const [dimage,setdimage]=React.useState(false);
    

  const classes = useStyles();
const [openreply,setopenreply]=React.useState(false);

const handleopenreply=()=>
{
setopenreply(!openreply);
};
const onchangeimage=event=>
{
   
   
    switch(isimage)
    {
        case 0:setimage1(event.target.files[0]);
        case 1:setimage2(event.target.files[0]);
        case 2:setimage3(event.target.files[0]);
        case 3:setimage4(event.target.files[0]); 


    }
    if (isimage===3) 
    {
        setdimage(true);
    }
    setisimage(isimage+1);
    setdvideo(true);
    setdpdf(true);
    console.log(event.target.files[0]);
    console.log(image1);


}
const onchangevideo=event=>
{
setvideo(event.target.files[0]);
    setisvideo(true);
    setdpdf(true);
    setdimage(true);


}
const onchangepdf=event=>
{
setpdf(event.target.files[0]);
    setispdf(true);
    setdvideo(true);
    setdimage(true);


}
  return (
    <div className={classes.root}>
        <ThemeProvider theme={theme}>
                  <Container className={classes.container}>
          <Grid container xs={12} >
           
          <Grid item xs={12} >
      <Paper className={classes.paper}>
        <Grid container xs={12} spacing={2} justify='flex-end' direction='row-reverse'>
          <Grid item spacing={3}> 
            <Avatar></Avatar>
           
          </Grid>

          <Grid item xs zeroMinWidth spacing={2}>


          <Title variant="h4" color="primary">
کلاس فیزیک</Title>
          
<Grid container item justify='flex-start' alignItems='flex-start'>


        <Grid item xs zeroMinWidth>

     <Paper component="form" className={classes.root}>
         <Grid container>
         <Grid container item>

      <InputBase
        className={classes.reply}
        multiline={true}
        fullWidth={true}
        rows={4}
        placeholder="خبر جدید اضافه کنید."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      {isimage}          <Grid item>
{isimage>=1? <img src={URL.createObjectURL(image1)} alt="test" width="150" height="150" />: ""}
          </Grid>
          <Grid item>
{isimage>=2? <img src={URL.createObjectURL(image2)} alt="test" width="150" height="150" />: ""}
          </Grid>
          <Grid item>
{isimage>=3? <img src={URL.createObjectURL(image3)} alt="test" width="150" height="150" />: ""}
          </Grid>
          <Grid item>
{isimage>=4? <img src={URL.createObjectURL(image4)} alt="test" width="150" height="150" />: ""}
          </Grid>
          <Grid item>
{isvideo? 										<video width="100%" height="400" controls>
											<source src={URL.createObjectURL(video)} type="video/mp4" />
											Sorry, your browser doesn't support embedded videos.
										</video>: ""}
          </Grid>
          <Grid item>
              {ispdf? <iframe src={URL.createObjectURL(pdf)} height="400" width="100%" />:""}
          </Grid>
      </Grid>
      <Grid container item>

      <Grid item>
      <IconButton className={classes.iconButton} aria-label="menu">
        <SendOutlinedIcon />
      </IconButton></Grid>
      <Grid container item alignItems='flex-end' justify='flex-end' alignContent='flex-end' direction='row' xs zeroMinWidth>
      <input accept="application/pdf" className={classes.input} id="pdf" type="file" name="pdf" onChange={onchangepdf}/>
      <label htmlFor="pdf">
      <IconButton color="primary" aria-label="upload picture" component="span" disabled={dpdf}>
        <InsertDriveFileIcon fontSize="default" />
      </IconButton>
      </label>
      <input accept="image/*" className={classes.input} id="image" type="file" name="image" onChange={onchangeimage}/>
      <label htmlFor="image">
      <IconButton color="primary" aria-label="upload picture" component="span" disabled={dimage}> 
        <CropOriginalIcon fontSize="default" />
      </IconButton>
      </label>
      <input accept="video/*" className={classes.input} id="video" type="file" name="video" onChange={onchangevideo}/>
      <label htmlFor="video">
      <IconButton color="primary" aria-label="upload picture" component="span" disabled={dvideo}>
        <VideoLibraryIcon fontSize="default" />
      </IconButton>
      </label>
</Grid>
      
      </Grid>
</Grid>
    </Paper>
    </Grid>
    </Grid>





          </Grid> 
          
          
      </Grid>  




       
      </Paper>
      </Grid>
      </Grid>
      </Container>
     </ThemeProvider>
    </div>
  );
}
