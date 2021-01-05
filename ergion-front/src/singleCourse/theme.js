import { Table, TableCell } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
   
    h6: {
      fontFamily: "IRANSans" ,
      fontWeight: 500,
      fontSize: 18,
    
      direction: 'center',
      textAlign:"center"

    },
    body2: {
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
    
      direction: 'rtl',
      textAlign:"right"

    },
    body1: {
      fontFamily: "IRANSans" ,
      fontWeight: 600,
      fontSize: 16,


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
      fontWeight: 600,
      fontSize: 18,
      direction: 'rtl',
      textAlign:"right"
    
    },
    subtitle1:{
      fontFamily: "IRANSans" ,
      fontWeight: 400,
      fontSize: 16,
      direction: 'rtl',
      textAlign:"right"

    },
  },


}

);

export default theme;