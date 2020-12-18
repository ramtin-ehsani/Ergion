import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import AddButtonAndPopUp from './PopUp';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { createMuiTheme, jssPreset, makeStyles, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme.js';

import { sizing } from '@material-ui/system';
import { positions } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import "./information.scss";
import Box from '@material-ui/core/Box';
import {Redirect, useHistoey} from "react-router-dom";
import Axios from 'axios';
import Mytypography from './mytypography';
import Mytypography1 from './mytypography1';
import Avatar from '@material-ui/core/Avatar';
import { Grade, Router } from '@material-ui/icons';
import {browserHistory} from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import PropTypes from 'prop-types';
import Record from './records';
import { Divider, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Chip from '@material-ui/core/Chip';
import "./information.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";
import rtl from "jss-rtl";
import TextField from '@material-ui/core/TextField';
import CourseLayout from './CourseLayout';


const useStyles = makeStyles(theme => ({
  chipo: {
    display: 'flex',
   
    justifyContent: 'right',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }},

 
    Button:{
      fontFamily: "IRANSans",
  },
  Buttonpos:{
    fontFamily: "IRANSans",
    marginRight: theme.spacing(1),
    width:"25%",
    
     
  },
  title:{
    fontFamily: "IRANSans",
  },
  inf:{
    fontWeight:'600',
    display:'inline',
    padding:theme.spacing(1),
  }
}));


export default function Information(props) {
  const [Add, setAdd] = React.useState(0);

  const classes = useStyles();
  const [name, setname] = React.useState(props.course.name);
  const [bio, setbio] = React.useState(props.course.about_course);
  const [tempbio, settempbio] = React.useState(props.course.about_course);
  const [subject, setsubject] = React.useState(props.course.subject);
  const [grade, setgrade] = React.useState(props.course.grade);
  const [T,setT]=React.useState(false);
  const [S,setS]=React.useState(false);
  const[hascourse,sethasCourse]=React.useState(false);
  const[isowner,setisowner]=React.useState(false);
  const[id,setid]=React.useState('');
  const [edit,setedit]=React.useState(false);
  const [editmode,seteditmode]=React.useState(0);
  const [snackbar, setsnackbar] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackbar;
  

  const handleClose = () => {
    setsnackbar({ ...snackbar, open: false });
  };

const getcourse=(id)=>
{
  setid(id);   
  const promise
  = Axios.get(`http://127.0.0.1:8000/api/course/1`)
promise.then(
  response => {

 
    setname(response.data.name);
    setgrade(response.data.grade);
  
    setsubject(response.data.subject);
    setbio(response.data.about_course);
props.getupdate();

  }
)
}
React.useEffect(()=>
{
getcourse(props.course.id);},[])

  React.useEffect(()=>
  {
getcourse(props.course.id);

    if(JSON.parse(localStorage.getItem('user'))!==null)
    {
      if((JSON.parse(localStorage.getItem('user'))['role'])==="T")
      {
        setT(true);
        console.log(props.course)
        console.log(JSON.parse(localStorage.getItem('user')))
        if((JSON.parse(localStorage.getItem('user'))['id'])===props.course.instructor_id)
        {
          setisowner(true);
          if(editmode!=2)
          {
seteditmode(1);
          }
        }
      }
      else{
        setS(true);
        setTimeout(() => {
          const promise=Axios.get('http://127.0.0.1:8000/api/course/',
          {
            headers:{
              "Authorization": `Token ${localStorage.getItem('token')}`,
            },
          }
            
          )
          promise.then(
            result=>{
              result.data.map((course)=>{
                if(course.id===props.course.id)
                {
                  sethasCourse(true);
                  setAdd(2);
                }
              }
              )
            }
          )
          
        }, 500);
      }

    }
  })
  

const edithandler=()=>
{ seteditmode(2);
  
  setedit(true);

}
const okhandler=()=>
{
  Axios.put(`http://127.0.0.1:8000/api/course/${props.course.id}`,
  {about_course:tempbio},
  {
     headers :{
      "Authorization": `Token ${localStorage.getItem('token')}`,
     },


  }
  
 ).then(response=>{console.log(tempbio)
setbio(tempbio)});

seteditmode(1);
setedit(false);
}


  const handleAdd = () => {
    if(localStorage.getItem("api_key")==='null')
    {
      
window.location="/login";
    }
    else{
      Axios.put('http://127.0.0.1:8000/api/student/courses/' ,{course_id:id},
      {
         headers :{
          "Authorization": `Token ${localStorage.getItem('token')}`,
         },


      }
      
     );
     setsnackbar({...snackbar,open:true});
     if(Add===1)
     {
       setAdd(2);
     }
     if(Add===2)
     {
       setAdd(1);
     }
        
    }

   
};


  function handleChangebio(event) {
    settempbio(event.target.value);
}
    return (
      <React.Fragment>
      <ThemeProvider theme={theme}>
        
      <Grid container>  
        
<Grid container item>
{isowner &&

<CourseLayout course={props.course} getupdate={getcourse}/>
}

{Add===1 &&
        
        <Button size='medium' onClick={handleAdd} variant="contained" color="primary">
      
      
      <Typography inline variant='button'>
                      اضافه شدن
                      </Typography></Button>
}
{Add===2 &&
                  <Button size='medium' onClick={handleAdd} variant="contained" color="secondary">
                  <Typography inline variant='button'>
                  حذف
    </Typography>
              </Button>
            
              
              
      }  
 <IconButton aria-label="add an alarm">
     <ShareIcon/>
      </IconButton>
      <Grid  item alignItems='flex-start' justify='flex-start'  >  
  
  </Grid>
      <Grid  item alignItems='flex-end' justify='flex-end' direction='row-reverse' xs zeroMinWidth>
 <Typography variant='h4' inline color='primary' > {name} </Typography> 


</Grid>

 </Grid>



</Grid> 
        

 <Grid container>

<Grid container justify='flex-end'>
<Typography inline variant='body2'>/{subject}</Typography> <Typography variant="body1"> {subject}</Typography>
</Grid>

<Grid container justify='right' direction='row-reverse' justifyContent='right'>

<p>
<Mytypography>{bio} </Mytypography></p></Grid>

      <Grid container justify='center' alignItems='center' spacing={2} direction='row-reverse'>
 <Grid item xs zeroMinWidth justify='center' alignItems='center' >
 
 <Typography inline className={classes.inf} variant="body1" color="textSecondary" >{props.course.students_count}  </Typography>
 <Typography inline className={classes.inf} variant="body1" color="primary" >دانش آموز</Typography>
 
 

</Grid>

 <Grid item xs zeroMinWidth justify='center' alignItems='center' >  
 <Typography inline className={classes.inf} variant="body1" color="textSecondary" >{props.course.capacity}   </Typography>
<Typography className={classes.inf} variant="body1" color="primary" inline >  ظرفیت</Typography>

</Grid>
 <Grid item xs zeroMinWidth justify='center' alignItems='center'>
 <Typography inline className={classes.inf} variant="body1" color='textSecondary' >{props.course.episodes_count}   </Typography>
 <Typography className={classes.inf} variant="body1" color="primary" inline  >قسمت</Typography>
</Grid>

</Grid>
</Grid>
</ThemeProvider>
    </React.Fragment>
  );}
  