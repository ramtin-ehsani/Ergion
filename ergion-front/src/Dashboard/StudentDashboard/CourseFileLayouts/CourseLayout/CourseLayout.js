import React, { Component } from 'react';  
import Popup from './PopUp';  
import "./CourseLayout.scss"
import CourseWidget from './CourseWidget'; 
import { NextWeek } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

class App extends Component {  

  constructor(props){  
super(props);  
this.state = { 
    Course:[],
    showPopup: false,
    Adding:false,
    NextCourse:""
};  
}  

  togglePopup() {  
this.setState({  
     showPopup: !this.state.showPopup 
});  
 }  
 AddCourse() {  
    this.setState({  
         showPopup: !this.state.showPopup , 
         
         Course:[...this.state.Course,this.state.NextCourse],
        Adding:true,
        NextCourse:""
    });  
     } 
     CourseNameHandler=(event)=>
     {
        this.setState({NextCourse: event.target.value});
     }
  render() {  
      let Courses=null
      if(this.state.Adding)
      {Courses=(
      <div>{this.state.Course.map(course =>
      {
        return(  <CourseWidget name={course} /> );
      })}

        </div>);
    
}
return (  
<div>  

<button variant="outlined" color="secondary" onClick={this.togglePopup.bind(this)}> Add course</button>  

{this.state.showPopup ?  
<Popup  
          text='Add Course'  
          closePopup={this.togglePopup.bind(this)}  
          AddThisCourse={this.AddCourse.bind(this)}
          CourseName={this.CourseNameHandler}
          CourseNameVal={this.state.NextCourse}
          open={this.state.showPopup }
/>  
: null  
}  
{Courses}
</div>  


);  
}  
}  

export default App;