import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Event from '../../src/components/event.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Event', () => {
  it('should render in "debug" mode', () => {
    let component = mount(<Event />);  
    expect(component).toBeDefined();
  });
});