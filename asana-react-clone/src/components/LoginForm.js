import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/actions/authentication';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 40,
    margin: 'auto',
    maxWidth: 250,
    maxHeight: 400
  }
}));

const LoginForm = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('demo@user.com');
  const [password, setPassword] = useState('Password1!');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <main className={classes.root}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Box
            boxShadow={3}
            bgcolor="background.paper"
            m={1}
            p={1}
            style={{ width: '20rem', height: 'auto', padding: '2rem' }}
          >
            <Grid container spacing={2} direction="column" justify="center" alignItems="center">
              <Grid item>
                <div>
                  <h1>asana</h1>
                </div>
              </Grid>
              <Grid item>
                <TextField id="outlined-basic" label="Email address" variant="outlined"
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateProperty(setEmail)}
                  required
                  />
              </Grid>
              <Grid item>
                <TextField id="outlined-basic" label="Password" variant="outlined"
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updateProperty(setPassword)}
                  required
                />
              </Grid>
              <Grid item>
                <Button variant="contained" type='submit'>Login</Button>
              </Grid>
              <Grid item>
                <p> Don't have an account? '
                  <NavLink exact to='/signup' className='is-active'>
                    Sign Up
                  </NavLink>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </form>
    </main>
  );
};

export default LoginForm;
