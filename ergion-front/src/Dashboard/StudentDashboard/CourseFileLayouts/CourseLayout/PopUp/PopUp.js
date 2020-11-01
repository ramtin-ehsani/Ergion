import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./PopUpstyle.scss";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState('');
    const handleClickOpen = () => {
        setOpen(true);
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
        <div className="popupMain">
            <Button className="addButton" variant="outlined" color="primary" onClick={handleClickOpen}>
                اضافه کردن کلاس جدید
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">کلاس جدید</DialogTitle>
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
                    <Button onClick={handleClose} color="primary">
                        لغو
                    </Button>
                    <Button onClick={handleCloseAndAdd} color="primary">
                        اضافه شدن
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

