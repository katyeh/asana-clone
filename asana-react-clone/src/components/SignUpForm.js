import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from "@material-ui/core";

import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authentication';
import { NavLink } from 'react-router-dom';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      fullName,
      email,
      password,
      confirmPassword,
    };
    dispatch(signUp(newUser));
  };

  return (
    <main>
      <h1>Sign Up Form</h1>
        <form onSubmit={handleSubmit}>
          <Grid container justify="center">
            <Box
              boxShadow={3}
              bgcolor="background.paper"
              m={1}
              p={1}
              style={{ width: '20rem', height: 'auto', padding: '2rem' }}
            >
              <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                  <div>
                    <h1>Sign Up</h1>
                  </div>
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" lable="Full Name" variant="outlined"
                    type='text'
                    placeholder='Full Name'
                    value={fullName}
                    onChange={updateProperty(setFullName)}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" lable="Full Name" variant="outlined"
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={updateProperty(setEmail)}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" lable="Full Name" variant="outlined"
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updateProperty(setPassword)}
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" lable="Full Name" variant="outlined"
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={updateProperty(setConfirmPassword)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" type='submit'>Sign Up</Button>
                </Grid>
                <Grid item>
                  <p> Already have an account? '
                  <NavLink exact to='/login' className='is-active'>
                    Log In
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

export default SignUpForm;
