import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {Box, Grid} from '@material-ui/core';
import "./Homepage.scss";

function HomePage() {
    return (
        <div className="HomePage">
            <h1>homepage</h1>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Link to="/homepage" style={{textDecoration: 'none'}}/>
                <Link to="/login" style={{textDecoration: 'none'}}>
                    <Button
                        variant="contained"
                        color="primary">
                        login
                    </Button>
                </Link>
                <Box margin={1}/>
                <Link to="/signup" style={{textDecoration: 'none'}}>
                    <Button
                        variant="contained"
                        color="primary">
                        sign up
                    </Button>
                </Link>
                <Box margin={1}/>
                <Link to="/dashboard" style={{textDecoration: 'none'}}>
                    <Button
                        variant="contained"
                        color="primary">
                        Dashboard
                    </Button>
                </Link>
            </Grid>
        </div>
    );
}

export default HomePage