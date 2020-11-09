import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./PopUpstyle.scss";
import { ThemeProvider } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles';
import theme from './theme.js'

const useStyles = makeStyles(theme => ({
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
    const [name, setName] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
        setName("");
    };

    function handleChange(event) {
        setName(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAndAdd = () => {
        setOpen(false);
        props.handleNewCourse(name);
    };
    return (
        <ThemeProvider theme={theme}>
        
     
        <div className="popupMain">
            <Button className="addButton" variant="outlined" color="primary" onClick={handleClickOpen}>
                اضافه کردن کلاس جدید
            </Button>
            <Dialog className={classes.Dialogstyle} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle  >
                    <div className={classes.DialogTitlestyle}>
                    کلاس جدید
                   </div> 
                   </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        برای اضافه شدن به کلاس شناسه کلاس را وارد نمایید
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="شناسه کلاس"
                        type="Id"
                        fullWidth
                        value={name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className={classes.Button} onClick={handleClose} color="primary">
                        لغو
                    </Button>
                    <Button  className={classes.Button} onClick={handleCloseAndAdd} color="primary">
                        اضافه شدن
                    </Button>
                </DialogActions>
            </Dialog>
        </div> 
        </ThemeProvider>
    );
}

