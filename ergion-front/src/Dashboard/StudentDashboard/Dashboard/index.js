import React from 'react';
import {
    Container,
    Grid,
    // makeStyles
} from '@material-ui/core';
import Timeline from '../TimeLine/TimeLine';
import Suggestedcourse from './suggest';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';




// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         maxHeight: '100%',
//         paddingBottom: theme.spacing(5),
//         paddingTop: theme.spacing(5),
//     }
// }));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif'
  },
  direction: 'rtl'
});

const Dashboard = () => {

    return (
        <StylesProvider jss={jss} >

      <ThemeProvider theme={theme} >
            <Container maxWidth="lg" >

                <Grid
                    container
                    spacing={2}
                    lg={10}
                    item={true}
                    dir='rtl'


                >
                    <Grid
                        item
                        lg={9}
                        md={9}
                        xs={12}
                    >
                        <Timeline />
                    </Grid>

                    <Grid
                        item
                        lg={3}
                        md={3}
                        xs={false}
                    >

                       <Suggestedcourse/> 
                    </Grid>
                    
                </Grid>
            </Container>
        </ThemeProvider>
        </StylesProvider>
    )
}

export default Dashboard;