import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import theme from './theme.js';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({


    root: {
        display:'flex',
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 2),
      },
   
  }));
export default function Record(){
    const classes = useStyles();
    return(
        <div className={classes.root}>
        <ThemeProvider theme={theme}>
        <Grid container xs={12} spacing={2}>
<Typography variant='h3' component='h1' gutterBottom>
دانش آموز
</Typography>

            </Grid>

        </ThemeProvider>
        </div>
        

    );
}