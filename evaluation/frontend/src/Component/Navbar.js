import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from "react-router-dom";


export default class Navbar extends React.Component {
  render(){
    return (
      <div className="">
        <AppBar position="static">
          <Toolbar>
            <div>
              <p className="btn bg-light mx-5" style={{color:"#964DAE"}} >
                <Link to="/">Welcome to Movie Booking Platform</Link>           
              </p>
            </div>
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

