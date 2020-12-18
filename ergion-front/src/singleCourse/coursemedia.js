import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import purple from '@material-ui/core/colors/purple';
import Fab from "@material-ui/core/Fab";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 'auto',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    height: '100%',
    //objectFit:'fill',
    padding: 0,

  },
  newCourseAddImage: {
    position: 'absolute',
    right: 25,
    bottom: 10,
    margin: 4,
    color: purple[900],
    width: 40,
    height: 40,
},
input: {
    display: "none"
},
newCourseAddImageContainer: {
  position: 'relative',
  marginBottom: 4,
  marginTop: 4,

},
newCourseCardMedia: {
  height: 170,
  width: '100%',
  objectFit: 'cover',

},
}));

export default function Coursemedia(props) {
  const classes = useStyles();
  const theme = useTheme();
const [isowner,setisowner]=React.useState(false);
const [selectedFile, setSelectedFile] = React.useState(null);
const [coverImage, setCoverImage] = React.useState("");
 React.useEffect(()=>
 {
  if(JSON.parse(localStorage.getItem('user'))!==null)
  {

      if((JSON.parse(localStorage.getItem('user'))['id'])===props.course.instructor_id)
      {
        setisowner(true);
      }
    }
  }
 )




  const onFileChange = event => {   
    
    setSelectedFile(event.target.files[0])
    setCoverImage(URL.createObjectURL(event.target.files[0]))

    Axios.put(`http://127.0.0.1:8000/api/course/${props.course.id}`,
    {course_cover:coverImage},
    {
       headers :{
        "Authorization": `Token ${localStorage.getItem('token')}`,
       },
  
  
    }
    
   ).then(response=>{console.log('yes')})

  
};
  return (
    
       <div className={classes.newCourseAddImageContainer}>
      <CardMedia
        className={classes.newCourseCardMedia}
        height="100%"
        component='img'
        image={props.course.course_cover}
        title={props.course.name}
      />
      {isowner && 
      <div>
        <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={onFileChange}
                                    />
                                    <label htmlFor='contained-button-file'>

                                        <Fab
                                            component="span"
                                            className={classes.newCourseAddImage}>

                                            <AddPhotoAlternateIcon />

                                        </Fab>
                                    </label> </div>}
  </div>  

  );
}