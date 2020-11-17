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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%' ,
    height:'100%',
    margin:'auto',

  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%' ,
    height:'100%',
    objectFit:'cover',
    padding:0,
    
  },

}));

export default function Coursemedia(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className="root">
    <CardMedia
        className={classes.caver}
        height="100%"
        component='img'
        objectFit='cover'
        image={props.course.course_cover}
        title={props.course.name}
    />
    </Card>

  );
}