import React, { Component } from 'react';
import Sidebar from './layout/Sidebar';
// import { Header } from './layout/Header';
import { Route } from 'react-router-dom';
import ProjectDetail from './projects/ProjectDetail';
import { Box } from '@material-ui/core';

class Home extends Component {
  render() {
    let heading = "This is a heading";
    let subheading = "subheading"
    return (
      <div className="Home">
        <Box
          display='flex'
          width='auto'
        >
          <Box item>
            <Sidebar />
          </Box>
          <Box item
            display='flex'
            flex='1 0 auto'
            justifyContent='center'
          >
            <Route
              exact={true}
              path="/Project/:id"
              render={(props) => <ProjectDetail {...props} />}
            />
          </Box>
        </Box>
        {/* <Navbar /> */}
      </div>
    );
  }
}

export default Home;
