import React, { useEffect, useRef, useState } from 'react';
import './publicProfile.scss';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, StylesProvider, jssPreset } from '@material-ui/core/styles';
import {
	Avatar,
	CardHeader,
	Typography,
	Divider,
	CardContent,
	CircularProgress,
	Grid,
	Hidden,
	Box,
	Button,
	Container,
	TextField,
	CardMedia,
	CardActions
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ButtonGroup } from '@material-ui/core';
import img from '../../../Pics/cl.jpg';
import axios from 'axios';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import PieChartIcon from '@material-ui/icons/PieChart';
import { ChatRounded } from '@material-ui/icons';
import Student from '@material-ui/icons/SupervisorAccount';
import ClassIcon from '@material-ui/icons/Class';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const jss = create({ plugins: [ ...jssPreset().plugins, rtl() ] });

const useStyles = makeStyles((theme) =>
	createStyles({
		spacing: {
			marginTop: '30px'
		},
		process: {
			display: 'flex',
			'& > * + *': {
				marginLeft: theme.spacing(25)
			},
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			width: '75% !important',
			marginTop: 100
		},
		root: {
			height: 'auto'
		},
		root1: {
			marginTop: '10px',
			height: '670px'
		},
		// avatar: {
		// 	height: 150,
		// 	width: 150
		// },
		icon: {
			marginRight: theme.spacing(2)
		},
		heroContent: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(8, 0, 6)
		},
		heroButtons: {
			marginTop: theme.spacing(4)
		},
		cardGrid: {
			paddingTop: theme.spacing(1),
			display: 'flex',
			justifyContent: 'flex-end',
			width: '100%'
		},
		card: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		},
		cardMedia: {
			minHeight: '250px',
			maxHeight: '250px',
			width: '100%',
			objectFit: 'cover'
		},
		cardContent: {
			flexGrow: 1,
			padding: theme.spacing(1)
		},
		cardActions: {
			// height: 50,
			padding: theme.spacing(0)
		},
		footer: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(6)
		},
		alertText: {
			fontFamily: 'IRANSans',
			display: 'flex',
			fontSize: 20
		},
		avatar: {
			backgroundColor: 'red'
		}
	})
);

const PublicProfile = () => {
	let [ width, setWidth ] = useState(getWidth());
	const classes = useStyles();
	const [ suggest, setSuggest ] = useState(true);
	const [ details, setDetails ] = useState(null);
	const [ myclasses, setMyclasses ] = useState(null);
	const [ open, setOpen ] = useState(false);

	const config = {
		headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	function copyToClipboard(id) {
		let textField = document.createElement('textarea');
		textField.innerText = 'http://localhost:3000/course/' + id;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
		setOpen(true);
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(getWidth());
			if (width > 1279) setSuggest(!suggest);
		});
		axios.get('', config).then((res) => {
			setDetails(res.data);
		});
		axios.get('http://127.0.0.1:8000/api/all-courses/', config).then((response) => {
			setMyclasses(response.data);
		});
	}, []);

	if (myclasses != null) {
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
						className="all"
					>
						<div
							style={{
								justifyContent: 'flex-end',
								display: 'flex',
								width: '100%',
								backgroundColor: 'none'
							}}
						>
							<Grid
								style={
									width > 1279 ? (
										{
											backgroundColor: 'none'
										}
									) : (
										{
											display: 'none'
										}
									)
								}
								lg={3}
							>
								<h1>Suggestion</h1>
							</Grid>
							<Grid
								style={
									width > 1279 ? (
										{
											backgroundColor: 'none'
										}
									) : (
										{
											width: '100%'
										}
									)
								}
								lg={9}
							>
								<div style={{ width: '100%', backgroundColor: 'none' }} className="main-container">
									<Container maxWidth="lg" style={{ backgroundColor: 'none' }}>
										<Grid container spacing={4} item={true} direction="column" alignItems="center">
											<Grid item lg={12} md={12} xs={12}>
												<Box borderRadius={12} marginTop={3}>
													<div className={classes.root}>
														<CardContent>
															<Grid container spacing={3} dir="rtl">
																{width > 650 ? (
																	<Grid
																		item
																		md={12}
																		style={{
																			alignSelf: 'center',
																			backgroundColor: 'none',
																			display: 'flex'
																		}}
																		xs={12}
																		dir="rtl"
																	>
																		<Box
																			borderRadius={12}
																			border="3px solid gainsboro"
																			style={{
																				width: '100%',
																				alignItems: 'center',
																				height: 'fit-content'
																			}}
																		>
																			<div className="cover">
																				<div className="avatar-div">
																					<Avatar
																						style={{
																							minWidth: 170,
																							minHeight: 170,
																							maxHeight: 170,
																							maxWidth: 170
																						}}
																						src={img}
																					>
																						<p
																							style={{
																								fontFamily: 'IRANSans'
																							}}
																						>
																							ممرضا
																						</p>
																					</Avatar>
																				</div>
																				<div className="wtf">
																					<div className="separator">
																						<div style={{ width: '23%' }} />
																						<div className="bottom-row">
																							<p className="counter">
																								<ClassIcon className="footer-icon" />کلاس
																								ها: ۲۳ عدد
																							</p>
																							<p className="counter">
																								<Student className="footer-icon" />دانش
																								اموزان: ۳۷ نفر
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div
																				style={{
																					width: '100%',
																					display: 'flex',
																					position: "relative"
																				}}
																			>
																				{/* <div
																					style={{
																						width: '25%',
																						display: 'flex'
																					}}
																				/> */}
																				<div className="name-div">
																					<p className="name-family-name">
																						استاد محمدرضا شجریان
																					</p>
																					<p className="email">
																						<EmailIcon style={{ marginLeft: '5px' }} />{' '}
																						sadeghJ10@gmail.com
																					</p>
																				</div>
																			</div>
																		</Box>
																	</Grid>
																) : (
																	<Grid
																		item
																		md={12}
																		style={{
																			alignSelf: 'center',
																			backgroundColor: 'none',
																			display: 'flex'
																		}}
																		xs={12}
																		dir="rtl"
																	>
																		<Box
																			borderRadius={12}
																			border="3px solid gainsboro"
																			style={{
																				width: '100%',
																				alignItems: 'center',
																				height: 'fit-content'
																			}}
																		>
																			<div className="avatar-div-600">
																				<Avatar
																					style={{
																						minWidth: 150,
																						minHeight: 150,
																						maxWidth: 150,
																						maxHeight: 150
																					}}
																					src={img}
																				>
																					<p
																						style={{
																							fontFamily: 'IRANSans'
																						}}
																					>
																						ممرضا
																					</p>
																				</Avatar>
																			</div>
																			<div className="name-div-600">
																				<p className="name-family-name">
																					استاد محمدرضا شجریان
																				</p>
																				<p className="email-600">
																					<EmailIcon style={{ marginLeft: '5px' }} />sadeghJ10@gmail.com
																				</p>
																				<div
																					style={{
																						flexDirection: 'column',
																						display: 'flex',
																						lineHeight: '0%'
																					}}
																				>
																					<p className="email">
																						<ClassIcon className="footer-icon" />کلاس
																						ها:{' '}
																						<p className="numbers-style">۲۳ عدد</p>
																					</p>
																					<p className="email">
																						<Student className="footer-icon" />دانش
																						اموزان:{' '}
																						<p className="numbers-style">۳۷ نفر</p>
																					</p>
																				</div>
																			</div>
																		</Box>
																	</Grid>
																)}

																<Grid
																	item
																	md={12}
																	xs={12}
																	sm={12}
																	className="items-grid"
																>
																	<Box
																		boxShadow={0}
																		border="3px solid gainsboro"
																		borderRadius={12}
																		style={{ width: '100%', alignItems: 'center' }}
																	>
																		<div>
																			<p className="title-about-me">
																				<InfoIcon style={{ marginLeft: '5px' }} />
																				درباره‌ من:{' '}
																			</p>
																			<p className="about-me">
																				پلنگ صورتی مجموعه فیلمهای کمدی-پلیسی است
																				که اولین آن‌ها در سال ۱۹۶۴ ساخته شد و با
																				موفقیت آن دنباله‌های زیادی برایش ساخته
																				شد. تمرکز این مجموعه بر روی کاراگاه و
																				کارهای او نیست بلکه محور آن شخصیت پلنگ
																				صورتی است.[۱] اغلب .فیلمهای مجموعه پلنگ
																				صورتی ساخته بلیک
																			</p>
																		</div>
																	</Box>
																</Grid>
															</Grid>
														</CardContent>
													</div>
												</Box>
											</Grid>
										</Grid>
									</Container>
								</div>
							</Grid>
						</div>
						<CardHeader
							title={
								<Typography dir="rtl" component="h1" className="my-classes-title">
									کلاس های من
								</Typography>
							}
						/>
						<StylesProvider jss={jss}>
							<main className="main">
								<Container className={classes.cardGrid} maxWidth="xl">
									<Grid dir="rtl" container spacing={3} lg={9} item={true} md={12}>
										{myclasses &&
											myclasses.map((course) => (
												<Grid
													className="cardSpacing"
													item
													key={course.id}
													xs={12}
													sm={6}
													md={4}
												>
													<Card className="layout1">
														<CardMedia
															className={classes.cardMedia}
															component="img"
															image={course.course_cover}
															title={course.sunject}
														/>
														<CardContent className={classes.cardContent} spacing={3}>
															<Typography
																gutterBottom
																variant="h5"
																component="h2"
																className="courseNamePlace"
															>
																{course.name}
															</Typography>
															<Typography className="courseCapacityPlace" component="h6">
																ظرفیت کلاس:{' ' + course.capacity}
															</Typography>
														</CardContent>
														<Divider />
														<Divider />
														<Divider />
														<Divider />
														<CardActions className={classes.cardActions}>
															<ButtonGroup fullWidth>
																<Button
																	href={`/student_dashboard/added_courses/${course.id}`}
																	className="toSeeButton"
																	size="medium"
																	color="primary"
																	variant="contained"
																>
																	مشاهده
																</Button>
																<Divider style={{ minWidth: '3px', maxWidth: '3px' }} />
																<Button
																	size="medium"
																	color="primary"
																	onClick={() => copyToClipboard(course.id)}
																	action={localStorage.setItem('id', course.id)}
																	endIcon={
																		<ShareIcon style={{ marginRight: '10px' }} />
																	}
																	variant="contained"
																	className="toSeeButton"
																>
																	اشتراک
																</Button>
															</ButtonGroup>
															<Snackbar
																// className={classes.snackBAr}
																dir="ltr"
																open={open}
																autoHideDuration={1500}
																onClose={handleClose}
															>
																<Alert
																	className={classes.alertText}
																	onClose={handleClose}
																	severity="success"
																	variant="filled"
																>
																	لینک کلاس کپی شد
																</Alert>
															</Snackbar>
														</CardActions>
													</Card>
												</Grid>
											))}
									</Grid>
								</Container>
							</main>
						</StylesProvider>
					</div>
				</StylesProvider>
			</React.Fragment>
		);
	} else {
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
								<div className={classes.process}>
									<CircularProgress />
								</div>
							</Grid>
						</Grid>
					</div>
				</StylesProvider>
			</React.Fragment>
		);
	}
};

export default PublicProfile;
