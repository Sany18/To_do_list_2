import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Buttons from '../src/components/buttons.js';

Enzyme.configure({ adapter: new Adapter() })

// test('bla', () => {
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
// });

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Buttons />);
  
    expect(component).toMatchSnapshot();
  });
});