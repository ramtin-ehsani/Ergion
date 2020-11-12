import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";


const home = ()=>{
    return(
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper>
                                <h1 className="ergion">Ergion</h1>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

    )

}


export default home;

