
// import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// import Title from './Title';
// import { Button } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from './theme.js';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import TextField from '@material-ui/core/TextField';
// import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
// import IconButton from '@material-ui/core/IconButton';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
// import InputBase from '@material-ui/core/InputBase';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
// import Divider from '@material-ui/core/Divider';
// import Container from '@material-ui/core/Container';
// const useStyles = makeStyles((theme) => ({
//   container: {
//     width:'100%',
//     paddingTop: theme.spacing(0),
//     paddingBottom: theme.spacing(1),
//     paddingRight: theme.spacing(0),
//     paddingLeft: theme.spacing(0),
//     margin: theme.spacing(0),

//   },
//   root: {
//     display:'flex',
//     flexGrow: 1,
//     overflow: 'hidden',
//     padding: theme.spacing(0, 2),
//     margin:theme.spacing(1),
//   },
//   paper: {
//     margin: theme.spacing(0),

//   width:'100%',
//     margin: theme.spacing(1),
//    // padding: theme.spacing(2),
//    padding: theme.spacing(2),
//    paddingRight: theme.spacing(0),
//    paddingLeft: theme.spacing(0),
  
//   // display: 'flex',
//    overflow: 'auto',
//    flexDirection: 'column',
        
//       },
//       reply: {
//         display: 'flex',
//     flexWrap: 'wrap',
   
//   },
  
// }));

// const message = 'new همچنین طی هماهنگی های صورت گرفته توسط دکتر انتظاری، مسئول ACM و المپیاد دانشکده، با برخی از اساتید محترم دانشکده، دانشجویان دروس مبانی برنامه‌سازی، برنامه‌نویسی پیشرفته، ساختمان داده و تحلیل و طراحی الگوریتم می‌توانند با شرکت در این مسابقه و کسب رتبه برتر (تیم های اول تا سوم دانشکده) نمره امتیازی دریافت کنند. جزئیات این پوینت در هر درس متفاوت و طبق صلاحدید استاد است.'

// export default function AutoGridNoWrap() {
//   const classes = useStyles();
// const [openreply,setopenreply]=React.useState(false);

// const handleopenreply=()=>
// {
// setopenreply(!openreply);
// };
// const [ isImg, setIsImg ] = React.useState(false);
// const [ isMultiImg, setisMultiImg ] = React.useState(true);
// const [ isVideo, setIsVideo ] = React.useState(false);
// const [ isPdf, setIsPdf ] = React.useState(false);
//   return (
//     <React.Fragment>
   
//         <ThemeProvider theme={theme}>
//                   <Container xs={12}  md={4} lg={3} className={classes.container}>

//       <Paper className={classes.paper}>
//         <Grid container xs={12} spacing={2}  justify='flex-end' direction='row-reverse'>
      
//           <Grid  spacing={3}> 
//             <Avatar></Avatar>
           
//           </Grid>

        

//           <Grid item xs zeroMinWidth spacing={2}>


//           <Title variant="h4" color="primary">
// کلاس فیزیک</Title>
// <Grid item spacing={3}> 
//             <Avatar></Avatar>
           
//           </Grid>
          
//             <Typography >{message}</Typography>
            
//             <Grid container xs spacing={2} alignItems='flex-end' justify='flex-end'>
//             {isMultiImg ? (
// 										test[3].media.map((item) => (
//                       <Grid item xs zeroMinWidth> 
// 											<img src={item} alt="test" width="150" height="150" /></Grid>
// 										))) : ('')
// 									}
// 									{isPdf ? <iframe src={test[2].media} height="400" width="100%" /> : ''}
// 									{isImg ? <img src={img1} alt="test" width="35%" height="280" /> : ''}
// 									{isVideo ? (
// 										<video width="100%" height="400" controls>
// 											<source src={vid} type="video/mp4" />
// 											Sorry, your browser doesn't support embedded videos.
// 										</video>
// 									) : (
// 										''
// 									)}
//                   </Grid>

// <Grid container justify='center' alignItems='center' spacing={2} direction='row-reverse'>  
// <Grid item xs zeroMinWidth spacing={2}>      

// <IconButton onClick={handleopenreply}> 
//   <ModeCommentOutlinedIcon></ModeCommentOutlinedIcon>
// </IconButton>

//   </Grid>
// <Grid item xs zeroMinWidth>
// <IconButton>
//   <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
// </IconButton></Grid>
// <Grid item xs zeroMinWidth>
// <IconButton>
//   <ShareOutlinedIcon></ShareOutlinedIcon>
// </IconButton></Grid>

//  </Grid>



//           </Grid> 
          
          
//       </Grid>  




//         <Grid container item justify='flex-start' alignItems='flex-start'>
// {openreply&&

//         <Grid item xs zeroMinWidth>

//      <Paper component="form" className={classes.root}>
//       <IconButton className={classes.iconButton} aria-label="menu">
//         <SendOutlinedIcon />
//       </IconButton>
//       <InputBase
//         className={classes.reply}
//         multiline={true}
//         fullWidth={true}
//         placeholder="نظر خود را وارد کنید."
//         inputProps={{ 'aria-label': 'search google maps' }}
//       />

//     </Paper>
//     </Grid>}

            
        
//         </Grid>
//       </Paper>

//       </Container>
//      </ThemeProvider>
   
//     </React.Fragment>
//   );
// }
