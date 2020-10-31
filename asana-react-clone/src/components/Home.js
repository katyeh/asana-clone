import React, { Component } from 'react';
import Sidebar from './layout/Sidebar';
// import { Header } from './layout/Header';
import { Route } from 'react-router-dom';
import ProjectDetail from './projects/ProjectDetail';

class Home extends Component {
  render() {
    let heading = "This is a heading";
    let subheading = "subheading"
    return (
      <div className="Home">
        <Sidebar />
        <Route
          exact={true}
          path="/Project/:id"
          render={(props) => <ProjectDetail {...props} />}
        />
        {/* <Navbar /> */}
      </div>
    );
  }
}

export default Home;
