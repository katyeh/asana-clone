import React, { Component } from 'react';
import Sidebar from './layout/Sidebar';
// import { Header } from './layout/Header';
import { Route } from 'react-router-dom';
import ProjectDetail from './projects/ProjectDetail';
import { Box, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, InboxIcon, MailIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              My Tasks
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          >
          <div className={classes.toolbar} />
          <Divider />
            <List>
              <Sidebar />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <Route
                exact={true}
                path="/Project/:id"
                render={(props) => <ProjectDetail {...props} />}
              />
          </main>
        {/* <Box
          display='flex'
          width='auto'
        > */}
     {/*      <Box item> */}
            {/* <Sidebar /> */}
          {/* </Box> */}
        {/*   <Box item
            display='flex'
            flex='1 0 auto'
            justifyContent='center'
          > */}
          {/*   <Route
              exact={true}
              path="/Project/:id"
              render={(props) => <ProjectDetail {...props} />}
            /> */}
          {/* </Box> */}
        {/* </Box> */}
        {/* <Navbar /> */}
      </div>
    );
  }

export default Home;
