import React, {Component} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

import "./App.css";

//this needs state
class App extends Component {
  constructor() {
    super()
    this.state = {
      placeholder: ''
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path='/' exact component={LogIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/profile' exact component={Profile} />
          {/* <Route path="/" component={LandingPage} /> */}
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}



// function App() {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <BrowserRouter>
//         <Route path='/' component={LogIn} />
//         <Route path='/signup' component={SignUp} />
//         {/* <Route path="/" component={LandingPage} /> */}
//       </BrowserRouter>
//     </MuiThemeProvider>
//   );
// }

export default App;
