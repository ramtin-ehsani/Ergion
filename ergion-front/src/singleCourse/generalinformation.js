import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
//import "generalinformation.scss";
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme.js';

function preventDefault(event) {
  event.preventDefault();
}


const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  generalinformation:{
    fontFamily: "IRANSans",
  },
   
  }));


export default function generalinformation(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <div className="generalinformation">
        
      

      <Typography color="textSecondary" className={classes.depositContext}>
      <p>نام استاد:</p>
        


<Link color="primary" href="#" onClick={preventDefault}>
نگین درخشان
        </Link>
<p>
تعداد دانش آموزان:
</p>
<p>
۲۳
</p>

<p>
تعداد فایل ها:
</p>
۱۶
<p>
آخرین به روز رسانی:
</p>    
<p>
۹۹/۸/۱۸
</p>
      </Typography>
      

      </div>
      </ThemeProvider>
    </React.Fragment>
  );
}