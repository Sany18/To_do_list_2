import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Registration from '../../src/components/registration.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() })

describe('Registration', () => {
  it('should render in "debug" mode', () => {
    let component = mount(<Router><Registration /></Router>);  
    expect(component).toBeDefined();
  });
});