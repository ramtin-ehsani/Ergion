import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { positions } from '@material-ui/system';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from './theme.js'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    Dialogstyle:{
        fontFamily: "IRANSans",
    },
    DialogTitlestyle:{
        fontFamily: "IRANSans",
    },  
      Button:{
        fontFamily: "IRANSans",
    },
   
  }));

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [name, setName] = React.useState(props.name);
    const [bio, setbio] = React.useState(props.bio);
    const handleClickOpen = () => {
        setOpen(true);
        
    };

    function handleChangename(event) {
        setName(event.target.value);
    }
    function handleChangebio(event) {
        setbio(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAndEdit = () => {
        setOpen(false);
        props.handleNewName(name);
        props.handleNewBio(bio);
    };
    return (
        <ThemeProvider theme={theme}>
        
     
        <div className="popupMain">
            <Button positions="right" className="addButton" variant="outlined" color="primary" onClick={handleClickOpen}>
            ویرایش
            </Button>
            <Dialog className={classes.Dialogstyle} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle  >
                    <div className={classes.DialogTitlestyle}>
                    ویرایش اطلاعات کلاس
                   </div> 
                   </DialogTitle>
                <DialogContent>
<div className={classes.root}>
                <TextField 
                
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                 value={name}
                 onChange={handleChangename}
                required id="standard-required"  defaultValue={props.name} />

                <TextField 
                 multiline
                 rowsMax={4}
                                style={{ margin: 8 }}
                                fullWidth
                                margin="normal"
              value={bio}
              onChange={handleChangebio}
                required id="standard-required" defaultValue={props.bio} />
</div>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.Button} onClick={handleClose} color="primary">
                        لغو
                    </Button>
                    <Button  className={classes.Button} onClick={handleCloseAndEdit} color="primary">
                    ویرایش
                    </Button>
                </DialogActions>
            </Dialog>
        </div> 
        </ThemeProvider>
    );
}

