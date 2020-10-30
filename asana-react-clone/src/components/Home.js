import React, { Component } from 'react';
import Sidebar from './layout/Sidebar';
// import { Header } from './layout/Header';

class Home extends Component {
  render() {
    let heading = "This is a heading";
    let subheading = "subheading"
    return (
      <div className="Home">
        {/* <Navbar /> */}
        <Sidebar />
      </div>
    );
  }
}

export default Home;
