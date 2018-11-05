import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Task from '../../src/components/task-form.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Task-form', () => {	
	let component = mount(<Task />);

	it('should render in "debug" mode', () => {
		expect(component).toBeDefined();
	});

	it('"Save" button', () => {
		expect(component.find('button').at(1).text()).toEqual('Save')
	})

	it('"Close" button', () => {
		expect(component.find('button').at(0).text()).toEqual('Close')		
	})

	it('set value in inputs', () => {
		let input = component.find('input').at(0);
		let input2 = component.find('textarea').at(0);
		input.simulate('change', {target: {name: 'title', value: 'some teeexxt'}});
		input2.simulate('change', {target: {name: 'theme', value: 'some task text'}});
		expect(component.state('value').title).toEqual('some teeexxt');
		expect(component.state('value').theme).toEqual('some task text');
	})
});