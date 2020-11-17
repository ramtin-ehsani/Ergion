import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
//import "generalinformation.scss";
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme.js';
import Mytypography1 from './mytypography1';
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


export default function Generalinformation(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <div className="generalinformation">
        
      

      <Typography color="textSecondary" className={classes.depositContext}>
      <p>نام استاد:</p>
        


<Link color="primary" href="#" onClick={preventDefault}>
{props.course.instructor_firstname} {props.course.instructor_lastname} 
        </Link>
        <p>
        مقطع:
        </p>
        <Mytypography1>
{props.course.grade}</Mytypography1>
<p>
ظرفیت:
</p>
<Mytypography1>
{props.course.capacity}
</Mytypography1>

<p>
تعداد فایل ها:
</p>
<Mytypography1>
۱۶</Mytypography1>
<p>
آخرین به روز رسانی:
</p>    
<Mytypography1>
۹۹/۸/۱۸
</Mytypography1>
      </Typography>
      

      </div>
      </ThemeProvider>
    </React.Fragment>
  );
}