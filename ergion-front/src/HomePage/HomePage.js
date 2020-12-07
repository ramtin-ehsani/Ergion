import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { Box, Grid } from '@material-ui/core';
import "./Homepage.scss";

function HomePage() {

    React.useState(() => {
        if (localStorage.getItem('api_key') !== 'null') {
            if (localStorage.getItem('user') !== null) {
                if ((JSON.parse(localStorage.getItem('user'))['role']) === "T") {
                    window.location = '/teacher_dashboard';
                } else {
                    window.location = '/student_dashboard';
                }
            }
        }

    })
    return (
        <div className='App'>
            <h1>homepage</h1>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary">
                        login
                    </Button>
                </Link>
                <Box margin={1} />
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary">
                        sign up
                    </Button>
                </Link>
            </Grid>
        </div>
    );
}

export default HomePage