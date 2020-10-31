import React from 'react';  

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class Popup extends React.Component {  

  render() {  
return (  
<div>

<Dialog open={this.props.open} onClose={this.props.closePopup} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
  <DialogContent>
    <DialogContentText>
    {this.props.text}
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="CourseId"

      fullWidth
      onChange={this.props.CourseName} 
      value={this.props.CourseNameVal}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={this.props.closePopup} color="primary">
      Cancel
    </Button>
    <Button onClick={this.props.AddThisCourse} color="primary">
      Subscribe
    </Button>
  </DialogActions>
</Dialog>
</div>
);  
}  
}  

export default Popup;
