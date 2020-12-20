import React, { useEffect, useRef, useState } from 'react';
import './news.scss';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, Theme, createStyles, StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CssBaseline from '@material-ui/core/CssBaseline';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Divider from '@material-ui/core/Divider';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Title from '../../Title';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/SendOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const useStyles = makeStyles((theme) =>
	createStyles({

		root0: {
			fontFamily: 'IRANSans',
			display:'flex',
			flexGrow: 1,
			overflow: 'hidden',
			padding: theme.spacing(0, 2),
			margin:theme.spacing(1),
		  },
		input: {
			display: 'none',
		  },
		root: {
			fontFamily: 'IRANSans',
			// minWidth: '30%',
			justifyContent: 'center',
		
			alignItems: 'center',
			textAlign: 'center',
            width: '100% ',
            margin:theme.spacing(2) ,
		},
		root1: {
			fontFamily: 'IRANSans',
			// minWidth: '30%',
			justifyContent: 'center',
			// backgroundColor: "skyblue",
			alignItems: 'center',
			textAlign: 'center',
			width: '65% !important'
		},
		media: {
			// paddingTop: "30%",
			// backgroundColor: 'red'
			// height: 400,
		},
		title: {
			fontFamily: 'IRANSans',
			// height: 50,
			padding: 8,
		},
		tab: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper
		},
		spacing: {
			marginTop: '30px'
			// marginBottom: "30px",
		},
		test: {
			minWidth: 327,
			maxWidth: 327,
			maxHeight: 300,
			minHeight: 300,
		},
		reply: {
			display: 'flex',
		flexWrap: 'wrap',
	   
	  },
	})
);

const jss = create({ plugins: [ ...jssPreset().plugins, rtl() ] });

const Write = (props) => {
	let [ width, setWidth ] = useState(getWidth());
	const classes = useStyles();
	const [ postPage, setPostPage ] = useState(null);
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
	const[newstext,setnewstext]=React.useState("");
	const[newsid,setnewsid]=React.useState(0);
	const [images,setimages]=React.useState([image1,image2,image3,image4])
	const[courseid,setcourseid]=React.useState(0);
React.useEffect(()=>
	{	
		setcourseid(props.course.id);
		if(isvideo)
	{
setdimage(true);
setdpdf(true);

	}
	if(ispdf)
	{
		setdimage(true);
		setdvideo(true);
	}
	if(isimage>0)
	{
		setdimage(true);
		setdpdf(true);

		if(isimage===4)
		{
			setdimage(true);
		}
		}	}
)





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
const image1delete=()=>{
setimage1(image2);
setimage2(image3);
setimage3(image4);
setimage4(null);
setisimage(isimage-1);
}
const image2delete=()=>{
	
	setimage2(image3);
	setimage3(image4);
	setimage4(null);
	setisimage(isimage-1);
	
	}
	const image3delete=()=>{
	
		
		setimage3(image4);
		setimage4(null);
		setisimage(isimage-1);
		
		}
		const image4delete=()=>{
	
		
		
			setimage4(null);
			setisimage(isimage-1);
			
			}
			const videodelete=()=>{
	
		
		setisvideo(false);
		setvideo(null);
				
				}




const	sendnewshandler=event=>
	{
		Axios.post('http://127.0.0.1:8000/api/course/news/',
		{course_id:courseid,description:newstext}, 
		{  headers :{
			"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
		setnewsid(response.data.post_id);	
		setnewstext("");

		if(isimage===4)
		{
			const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",image4)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authoriza`	/xz,mnbtion": `Token ${localStorage.getItem('token')}`}}).then(function(response){
		
			setisimage(isimage-1);
			setimage4(null);
			
			}).catch((error)=>{console.log(4);})
		
		}
		if(isimage===3)
		{
			const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",image3)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
				setisimage(isimage-1);
			setimage3(null);
			
			}).catch((error)=>{console.log(3);})
		
		}
		if(isimage===2)
		{
			const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",image2)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
				setisimage(isimage-1);
			setimage2(null);
			}).catch((error)=>{console.log(2);})
		
		}
		if(isimage===1)
		{ const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",image1)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authorization": `Token ${localStorage.getItem('token')}`}}).then(response=>{
					setisimage(isimage-1);
			setimage1(null);
			console.log('yyyyyyyyyyy');
			}).catch((error)=>{console.log(error); })
		
		}
		if(isvideo)
		{
			const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",video)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
			setvideo(null);
			
			}).catch((error)=>{console.log(0);})
		

		}
		if(ispdf)
		{
			const fileData=new FormData()
			fileData.append('post_id',response.data.post_id)
			fileData.append("file",pdf)
			Axios.post('http://127.0.0.1:8000/api/course/post-files/',
			fileData,		{  headers :{
				"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
		setpdf();
			}).catch((error)=>{console.log(6);})
			
		}
		setdimage(false);
		setdpdf(false);
		setdvideo(false);
		props.getupdate(courseid);
	
		}).catch((error)=>{console.log(error);})
		console.log(isimage);
		console.log(ispdf);
		console.log(isvideo);	

		

	}
const	newstexthandler=event=>
	{
		setnewstext(event.target.value);
	}
	const config = {
		headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
	};






	return (
		<React.Fragment>
			<StylesProvider jss={jss}>
				<CssBaseline />
				<div

					className="post-page-main"
				>

							<Card className={classes.root} dir="rtl">
								<CardHeader
									className={classes.title}
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar} style={{ width: 70, height: 70 }}>
											<img src={props.course.instructor_profile_picture} alt="tessacehr" minWidth="50" height="50" poster="R" />
										</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={
										<Typography
										className="nametypo"
                                        style={{
                                          marginRight: "12px",
										
										  direction:"rtl"
                                        }}
                                      >
                                        <Box
                                          fontSize={20}
										  fontWeight="fontWeightBold"
										  direction='rtl'
                                        >
                                       {props.course.instructor_firstname + " "+
									   props.course.instructor_lastname}
                                        </Box>
                                      </Typography>

									}
									subheader={
										<Typography className="date" component="h6">
								
										</Typography>
									}
								/>
						
								<CardContent>
								<Paper component="form" className={classes.root}>
								<Container className={classes.container}>
         <Grid container>
         <Grid container item>

      <InputBase
        className="reply"
        multiline={true}
        fullWidth={true}
        rows={4}
        placeholder="خبر جدید اضافه کنید."
		inputProps={{ 'aria-label': 'search google maps' }}
		onChange={newstexthandler}
		value={newstext}
      />
{isimage>=1?   <Grid item direction='column'>
<iconButton id='id1' onClick={image1delete}><HighlightOffIcon style={{ color: 'red' }}/></iconButton>
<img src={URL.createObjectURL(image1)} alt="test" width="150" height="150" /></Grid> : ""}
          
{isimage>=2?   <Grid item direction='column'>
<iconButton id='id2' onClick={image2delete}><HighlightOffIcon style={{ color: 'red' }}/></iconButton>
<img src={URL.createObjectURL(image2)} alt="test" width="150" height="150" /></Grid> : ""}
{isimage>=3?   <Grid item direction='column'>
<iconButton id='id3' onClick={image3delete}><HighlightOffIcon style={{ color: 'red' }}/></iconButton>
<img src={URL.createObjectURL(image3)} alt="test" width="150" height="150" /></Grid> : ""}
{isimage>=4?   <Grid item direction='column'>
<iconButton id='id4' onClick={image4delete}><HighlightOffIcon style={{ color: 'red' }}/></iconButton>
<img src={URL.createObjectURL(image4)} alt="test" width="150" height="150" /></Grid> : ""}
         
{isvideo? 		 <Grid item>		<iconButton id='vd1' onClick={videodelete}><HighlightOffIcon style={{ color: 'red' }}/>		</iconButton>				<video width="100%" height="400" controls>
											<source src={URL.createObjectURL(video)} type="video/mp4" />
											Sorry, your browser doesn't support embedded videos.
										</video>  </Grid>: ""}
        
          <Grid item>
              {ispdf? <iframe src={URL.createObjectURL(pdf)} height="400" width="100%" />:""}
          </Grid>
      </Grid>
      <Grid container item>


      <Grid container item xs zeroMinWidth>
      <input accept="application/pdf" className={classes.input} id="pdf" type="file" name="pdf" onChange={onchangepdf}/>
      {/* <label htmlFor="pdf"> */}
      {/* <IconButton color="primary" aria-label="upload picture" component="span" disabled={dpdf}>
        <InsertDriveFileIcon fontSize="default" />
      </IconButton> */}
      {/* </label> */}
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
            <Grid item>
      <IconButton className={classes.iconButton} aria-label="menu" onClick={sendnewshandler} disabled={newstext.length===0}>
        <SendIcon />
      </IconButton></Grid>
      </Grid>
</Grid>
</Container>
    </Paper>
								</CardContent>
								
							</Card>
						

				</div>
			</StylesProvider>
		</React.Fragment>
	);
};

export default Write;
