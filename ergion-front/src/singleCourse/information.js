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
const useStyles = makeStyles(theme => ({

  titlestyle:{
      fontFamily: "IRANSans",
      fontSize: 22,
      color:"secondary",
alignItems:"center",
textAlign:"right"	
      
  },  
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


export default function Chart() {
  const [Add, setAdd] = React.useState(true);
  const [S, setS] = React.useState(false);
  const classes = useStyles();
  const [name, setname] = React.useState('فیزیک یازدهم');
  const [bio, setbio] = React.useState('در این جلسه قرار هست مقدمه ای برای نیرو و برایندگیری اون که کل سال یازدهم درگیر اون هستید بگیم  پس با دقت زیاد با ما همراه باشید');
const s=true;
  const handleAdd = () => {
    setAdd(!Add);
};
const handleName = (val) => {
setname(val);
};
const handleBio = (val) => {
  setbio(val);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        
          
        <div className={classes.Buttonpos}>
          
        {/* {Add?
      <Button size="medium" onClick={handleAdd} variant="contained" color="primary">
        <div className={classes.title}>
                        اضافه شدن
                   </div> </Button>
                    :
                    <Button size="medium" onClick={handleAdd} variant="contained" color="secondary">
                    <div className={classes.title}>
                    حذف
</div>
                </Button> */}
                
                
{/* }  */}

 <Box r={1}><AddButtonAndPopUp classes={classes.EditButton} name={name} bio={bio} handleNewName={handleName} handleNewBio={handleBio}/>
         </Box> 
        
 </div>
    
   <b><big> {name} </big></b>
      
    
   
   
      <p>{bio}</p>

</ThemeProvider>
    </React.Fragment>
  );
}