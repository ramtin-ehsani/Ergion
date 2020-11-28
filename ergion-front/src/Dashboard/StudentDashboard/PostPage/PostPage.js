import React, { useEffect, useRef, useState } from 'react';
import './PostPage.scss';
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
import Comments from './Comment/Comments';
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";


const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			fontFamily: 'IRANSans',
			// minWidth: '30%',
			justifyContent: 'center',
			// backgroundColor: "skyblue",
			alignItems: 'center',
			textAlign: 'center',
			width: '65% !important'
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
		}
	})
);

const jss = create({ plugins: [ ...jssPreset().plugins, rtl() ] });

const PostPage = () => {
	let [ width, setWidth ] = useState(getWidth());
	const classes = useStyles();
	const [ isRed, setIsRed ] = useState(false);
	const [ isImg, setIsImg ] = useState(false);
	const [ isMultiImg, setisMultiImg ] = useState(true);
	const [ isVideo, setIsVideo ] = useState(false);
	const [ isPdf, setIsPdf ] = useState(false);
	const [ postPage, setPostPage ] = useState(null);

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



	const config = {
		headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(getWidth());
		});

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
					style={
						width > 1279 ? (
							{
								minWidth: width - 247,
								maxWidth: width - 247,
								backgroundColor: 'none'
							}
						) : (
							{ backgroundColor: 'none', width: '100%' }
						)
					}
					className="post-page-main"
				>
					<Grid container item className={classes.spacing}>
						<Grid
							container
							item={true}
							className={classes.spacing}
							style={{
								dir: 'rtl',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								textAlign: 'center',
								backgroundColor: 'none'
							}}
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
										<Typography className="instructor" component="h4">
											صادق جعفری
										</Typography>
									}
									subheader={
										<Typography className="date" component="h6">
											شنبه ۱۳۹۹/۱۱/۱۱
										</Typography>
									}
								/>
								<Divider />
								<CardContent>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
										className="aboutPost"
									>
										هوش مصنوعی را باید گستره پهناور تلاقی و ملاقات بسیاری از دانش‌ها، علوم، و فنون
										قدیم و جدید دانست. ریشه‌ها و ایده‌های اصلی آن را باید در فلسفه، زبان‌شناسی،
										ریاضیات، روان‌شناسی، عصب‌شناسی، فیزیولوژی، تئوری کنترل، احتمالات و بهینه‌سازی
										جستجو کرد و کاربردهای گوناگون و فراوانی در علوم رایانه، علوم مهندسی، علوم
										.زیست‌شناسی و پزشکی، علوم اجتماعی و بسیاری از علوم دیگر دارد
									</Typography>
								</CardContent>
								<CardMedia
									className={classes.media}
									// image={img}
									title="news-media"
								>
									{/* {
										isMultiImg ? (slier) : ''
									} */}
									{isMultiImg ? (
										test[3].media.map((item) => (
											<img src={item} alt="test" width="24.5%" height="280" />
										))) : ('')
									}
									{isPdf ? <iframe src={test[2].media} height="400" width="100%" /> : ''}
									{isImg ? <img src={img1} alt="test" width="35%" height="280" /> : ''}
									{isVideo ? (
										<video width="100%" height="400" controls>
											<source src={vid} type="video/mp4" />
											Sorry, your browser doesn't support embedded videos.
										</video>
									) : (
										''
									)}
								</CardMedia>
								<CardActions className="post-footer" dir="ltr">
									<div className="icon-footer">
										<IconButton className="comment-icon">
											<ShareIcon />
										</IconButton>
										<span className="span-footer" />
										<div className="share-like-icon">
											<IconButton>
												<CommentIcon />
											</IconButton>
											<IconButton onClick={() => setIsRed(!isRed)}>
												{isRed ? (
													<FavoriteIcon style={{ color: 'red' }} />
												) : (
													<FavoriteBorderIcon />
												)}
											</IconButton>
										</div>
									</div>
								</CardActions>
							</Card>
							<div className={classes.root1} dir="rtl">
								<Comments />
							</div>
						</Grid>
					</Grid>
				</div>
			</StylesProvider>
		</React.Fragment>
	);
};

export default PostPage;
