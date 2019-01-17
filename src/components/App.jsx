import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '../dist/css/App.css';

import React from 'react';
import SiteSelection from './principal/SiteSelection';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';



export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SiteSelection} />
        </Switch>
      </BrowserRouter>
    );
  }
}
