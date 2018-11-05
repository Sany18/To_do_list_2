import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../src/components/login.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Login', () => {
  it('should render in "debug" mode', () => {
    let component = mount(<Login />);  
    expect(component).toBeDefined();
  });
});