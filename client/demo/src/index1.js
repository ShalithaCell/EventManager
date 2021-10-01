import React, { Component } from 'react';
import { render } from 'react-dom';
import QueryString from 'query-string';
import { LinkedInPopUp } from '../../src';
import LinkedInPage from './LinkedInPage';

// eslint-disable-next-line react/prefer-stateless-function
class Demo1 extends Component {
  render() {
    const params = QueryString.parse(window.location.search);
    if (params.code || params.error) {
      return <LinkedInPopUp />;
    }
    return <LinkedInPage />;
  }
}

render(<Demo1 />, document.querySelector('#demo'));
