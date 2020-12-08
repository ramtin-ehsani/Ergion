import React, { useEffect, useRef, useState } from 'react';
import './publicProfile.scss';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, createStyles, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { Avatar, CardHeader, Typography, Divider, CardContent, CircularProgress, Grid } from '@material-ui/core';
import img from '../../../Pics/cl.jpg';

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
		}
	})
);

const PublicProfile = () => {
	let [ width, setWidth ] = useState(getWidth());
	const classes = useStyles();

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(getWidth());
		});
	}, []);

	if (true) {
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
						<Card className="main-card" />
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
