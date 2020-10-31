import React from 'react';
import Box from '@material-ui/core/Box';

 


  
class Widget extends React.Component {  

  render() {  
  
    
      return (
        <div style={{ width: '100%' }}>
          <Box display="flex" p={1} boxShadow={3} component="span" display="block" p={1} m={1} bgcolor="background.paper">
         <p>{this.props.name}</p>   
          </Box>

        </div>
      );
    }
}  


export default  Widget;

