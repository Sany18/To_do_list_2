import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buttons from '../../src/components/buttons.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Buttons', () => {
  it('should render in "debug" mode', () => {
    let component = mount(<Buttons type='deleteTask'/>);
    expect(component).toBeDefined();
  });
  it('type newTask should render "New task" button', () => {
    let component = mount(<Buttons type='newTask' />);
    expect(component.find('#newTask')).toBeDefined();
  });
});