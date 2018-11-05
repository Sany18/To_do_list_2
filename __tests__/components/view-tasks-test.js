import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Article from '../../src/components/view-tasks.js';

Enzyme.configure({ adapter: new Adapter() })

describe('View-task', () => {
	const component = mount(<Article />);
	const tasks = [
		{
			"id": 10,
			"title": "Cabbages and Kings",
			"theme": "If we hack the system, we can get to the IB capacitor through the mobile XML interface!",
			"priority": 3,
			"due_date": "2018-10-30T00:00:00.000Z",
			"is_done?": true,
			"user_id": 1
		},	
		{
			"id": 11,
			"title": "The Heart Is Deceitful Above All Things",
			"theme": "Programming the circuit won't do anything, we need to generate the neural smtp circuit!",
			"priority": 3,
			"due_date": "2018-10-30T00:00:00.000Z",
			"is_done?": false,
			"user_id": 1
		}
	];

	it('should render in "debug" mode', () => {
		expect(component).toBeDefined();
	});

	it('render tasks', () => {
		component.setState({ tasks: tasks});
		component.setState({ isLoading: true});
    expect(component.find('.task').length).toEqual(2);
  });
});