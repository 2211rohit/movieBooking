import React from 'react';
import Home from './Component/Home';
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Seats from "./Component/Seats";

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <Route path="/" exact component={Home} />
          <Route path="/seats/:id" component={Seats} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
