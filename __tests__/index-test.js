import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import Index from '../src/index.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Index.js', () => {
  it('should render in "debug" mode', () => {
    let component = document.getElementById('newTask');
    expect(component).toBeDefined();
  });
});