import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Clock from '../../src/components/clock.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Clock', () => {
  it('should render in "debug" mode', () => {
    let component = mount(<Clock />);  
    expect(component).toBeDefined();
  });
});