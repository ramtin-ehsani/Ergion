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
import img from '../../../Pics/b59d9ae6fbaa82f17894fd7ed5f8ede0.jpg';
import img1 from '../../../Pics/math.jpg';
import img2 from '../../../Pics/prof.jpeg';
import img3 from '../../../Pics/riazi.jpeg';
import vid from '../../../Pics/test.mp4';
import pddf from '../../../Pics/HW.pdf';
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
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';


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
			fontFamily: 'IRANSans'
			// height: 50
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

const Write = () => {
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
	const[newstext,setnewstext]=React.useState("")
    



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

	let slider = useRef();

	const test = [
		{
			news:
				'دانشجویان جدیدالورود، لطفا فایل FirstManual.pdf را قبل از ورود به سامانه سامیا به دقت مطالعه نمایید. در ضمن می‌توانید از فیلم‌های تهیه شده نیز به عنوان راهنما استفاده نمایید.',
			media: vid
		},
		{
			news:
				'درس های من در سامانه گلستان ثبت شده است، اما در سامانه سامیا قابل مشاهده نیست؟ انتخاب واحد کردم، ولی درس های من هنوز اضافه نشده است؟ لطفا فایل راهنمای FAQ_GolestanSync را مطالعه فرمایید. ',
			media: img
		},
		{
			news:
				'جهت اطلاع از آخرین اخبار و اطلاعیه ها در مورد کلاس های مجازی دانشجویان حضوری، پردیس و مجازی لطفا در کانال تلگرامی @IUST_LMS عضو شوید',
			media: pddf
		},
		{
			news: 'test for english classes and im busy now i actually dont care about anything',
			media: [ img1, img2, img3, img ]
		},
		{
			news: 'null media',
			media: null
		}
	];

	const settings = {
		dots: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		// autoplay: true,
		autoplaySpeed: 2500,
		rtl: true,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: true
				}
			},
			{
				breakpoint: 760,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					// initialSlide: 2,
					dots: true
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					autoplaySpeed: 4000,
					autoplay: true,
				}
			}
		]
	
	}

	const slier = ( 
		<Slider
			ref={c => (slider = c)} {...settings}>
			{test[3].media.map((item) => (
				<div style={{display: "flex", justifyContent: "center", 
						position: "relative", width: "80%"}}>
					<img
						className={classes.test}
						src={item}
						alt="test"
					/>
				</div>
			))}
		</Slider>
	)

const	sendnewshandler=event=>
	{console.log(newstext);
		Axios.post('http://127.0.0.1:8000/api/course/course-news/',
		{related_course:1,text:newstext}, 
		{  headers :{
			"Authorization": `Token ${localStorage.getItem('token')}`}}).then(function(response){
		setnewstext("");
		console.log(response);	
		}).catch((error)=>{console.log(error);})
	}
const	newstexthandler=event=>
	{
		setnewstext(event.target.value);
	}
	const config = {
		headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
	};

	useEffect(() => {


		// const api = '';
		// axios.get(api, config).then((response) => {
		// 	setPostPage(response.data)
		// });
	}, []);

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
										<Avatar aria-label="recipe" className={classes.avatar}>
											<img src={img1} alt="tessacehr" minWidth="50" height="50" poster="R" />
										</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={
                                        <Typography className="instructor" variant="h6" color="primary">
                                        کلاس فیزیک</Typography>

									}
									subheader={
										<Typography className="date" component="h6">
											شنبه ۱۳۹۹/۱۱/۱۱
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


      <Grid container item xs zeroMinWidth>
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
            <Grid item>
      <IconButton className={classes.iconButton} aria-label="menu" onClick={sendnewshandler}>
        <SendOutlinedIcon />
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
