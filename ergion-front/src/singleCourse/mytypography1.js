import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import theme from './theme.js';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  titlestyle:{
      fontFamily: "IRANSans",
  },  

 
}));

export default function Title(props) {
  const classes = useStyles();
  return (
   
    <ThemeProvider theme={theme}>
    <Typography component="h4" variant="h4" color="primary" gutterBottom align="right">
      {props.children}
    </Typography></ThemeProvider>
  );
}

// Title.propTypes = {
//   children: PropTypes.node,
//}
;