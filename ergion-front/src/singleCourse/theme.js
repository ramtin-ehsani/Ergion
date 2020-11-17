import { Table, TableCell } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    body1: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
    
      direction: 'rtl',
      textAlign:"right"

    },
    body2: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
    
      direction: 'rtl',
      textAlign:"right"

    },
    h2: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
    
      direction: 'rtl',
      textAlign:"right"
    

    },
    h5: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 30,
      
      direction: 'rtl',
      textAlign:"right"
    

    },
    h3: {
      fontFamily: "IRANSans" ,
      fontWeight: 300,
      fontSize: 16,
      color:"gray",
      direction: 'rtl',
      textAlign:"right"
    

    },
    h4: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
      direction: 'rtl',
      textAlign:"right"
    
    }
  },


}

);

export default theme;