import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import AddButtonAndPopUp from './PopUp';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme.js';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import { positions } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import "./information.scss";
import Box from '@material-ui/core/Box';
import {Redirect, useHistoey} from "react-router-dom";
import Axios from 'axios';
import Mytypography from './mytypography';
import Mytypography1 from './mytypography1';

import { Router } from '@material-ui/icons';
import {browserHistory} from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import PropTypes from 'prop-types';
import Record from './records';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
const useStyles = makeStyles(theme => ({

 
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
}));


export default function Information(props) {
  const [Add, setAdd] = React.useState(true);

  const classes = useStyles();
  const [name, setname] = React.useState(props.course.name);
  const [bio, setbio] = React.useState(props.course.about_course);
  const [subject, setsubject] = React.useState(props.course.subject);

  const [T,setT]=React.useState(false);
  const [S,setS]=React.useState(false);
  const[hascourse,sethasCourse]=React.useState(false);
  const[isowner,setisowner]=React.useState(false);
  const[id,setid]=React.useState('');
  const [snackbar, setsnackbar] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snackbar;
  

  const handleClose = () => {
    setsnackbar({ ...snackbar, open: false });
  };

  React.useEffect(()=>
  {
    setname(props.course.name);
    setbio(props.course.about_course);
    setsubject(props.course.subject);
    setid(props.course.id);
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
        }
      }
      else{
        setS(true);
        setTimeout(() => {
          const promise=Axios.get('http://127.0.0.1:8000/api/student-courses/',
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
                  setAdd(false);
                }
              }
              )
            }
          )
          
        }, 500);
      }

    }
  })





  const handleAdd = () => {
    if(localStorage.getItem("api_key")==='null')
    {
      
window.location="/login";
    }
    else{
      Axios.put('http://127.0.0.1:8000/api/student-courses/' ,{id:id},
      {
         headers :{
          "Authorization": `Token ${localStorage.getItem('token')}`,
         },


      }
      
     );
     setsnackbar({...snackbar,open:true});
        setAdd(!Add);
    }

   
};
const handleName = (val) => {
setname(val);
};
const handleBio = (val) => {
  setbio(val);
  };

  if (T){
    return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        
          
        <div className={classes.Buttonpos}>
{isowner &&
 <Box r={1}><AddButtonAndPopUp classes={classes.EditButton} name={name} bio={bio} handleNewName={handleName} handleNewBio={handleBio}/>
         </Box>  }
        
 </div>
 <Title> {name} </Title>
 <Typography variant="h4"> {subject}</Typography>
 <p>
<Mytypography>{bio}</Mytypography></p>
      

</ThemeProvider>
    </React.Fragment>
  );}
  else{
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <Container maxWidth="lg" >
          <Grid container xs={12}  spacing={1}>
           
            {/* <Grid container item spacing={0} justify="flex-start" alignItems="flex-start"> */}
        
              <Grid item> 
             
          {Add?
        
            <Button size="large" onClick={handleAdd} variant="contained" color="primary">
         
       
          <span className={classes.title}>
                          اضافه شدن
                     </span> </Button>
                      :
                      <Button size="large" onClick={handleAdd} variant="contained" color="secondary">
                      <span className={classes.title}>
                      حذف
  </span>
                  </Button>
                
                  
                  
  }  


         </Grid> 
         
 <Grid item>
 <IconButton color="secondary" aria-label="add an alarm">
     <ShareIcon/>
      </IconButton>
 </Grid>

        
    

        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="شما به درس اضافه شدید"
        key={vertical + horizontal}
      />
  



   <Grid container item justify="flex-end" alignItems="flex-start" > 
   <Title> {name} فیزیک </Title></Grid>
   <Grid container item justify="flex-end" alignItems="flex-start">
 <Mytypography variant="h4"> 
فیزیک یازدهم{subject}</Mytypography></Grid>
 <Grid container item justify="flex-start" alignItems="flex-start">
 
<Mytypography>{bio} 
 کتاب "راه و رسم استخدام" که تیم جاب‌ویژن اونو تالیف کرده، مختصر و مفید مطالب مربوط به استخدام رو گفته و خوندنش ازتون وقت زیادی نمی‌گیره. رعایت کردن نکاتش هم کار سختی نیست. ولی همین نکات پایه‌ای می‌تونه شانستون رو برای استخدام شدن چند برابر کنه
 کتاب "راه و رسم استخدام" که تیم جاب‌ویژن اونو تالیف کرده، مختصر و مفید مطالب مربوط به استخدام رو گفته و خوندنش ازتون وقت زیادی نمی‌گیره. رعایت کردن نکاتش هم کار سختی نیست. ولی همین نکات پایه‌ای می‌تونه شانستون رو برای استخدام شدن چند برابر کنه</Mytypography>

</Grid>

{/* <Grid container item justify='flex-end' alignItems='flex-end' >
 <Grid item xs zeroMinWidth>
 

 <Mytypography1 >دانش آموز </Mytypography1>
 </Grid>

 <Grid item xs zeroMinWidth> 

 <Mytypography1 >ظرفیت</Mytypography1></Grid>
 <Grid item xs zeroMinWidth>

 <Mytypography1 >قسمت</Mytypography1>
</Grid>

</Grid> */}


</Grid>


</Container>
  </ThemeProvider>
      </React.Fragment>
    );

  }
}