import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LinkedInPopUp } from '../../src';
// eslint-disable-next-line import/extensions,import/no-unresolved
import LinkedInPage from './LinkedInPage';

// eslint-disable-next-line react/prefer-stateless-function
class Demo extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/linkedin" component={LinkedInPopUp} />
          <Route path="/" component={LinkedInPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
