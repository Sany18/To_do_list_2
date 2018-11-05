import React from 'react';
import ReactDom from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from '../src/main.js';

Enzyme.configure({ adapter: new Adapter() })

describe('Main before sign in', () => {
	let component = mount(<Main />);

	it('should render in "debug" mode', () => {
		expect(component).toBeDefined();
	});

	describe('buttons', () => {
		it('"Sign in" button', () => {
			let but0 = component.find('button').at(0).text()
			expect(but0).toEqual('Sign in');
		});
		it('"Sign up" button', () => {
			let but1 = component.find('button').at(1).text()
			expect(but1).toEqual('Sign up');
		});
	});

	describe('forms', () => {
		it('have 7 inputs', () => {
			expect(component.find('input').length).toEqual(7);
		});
	});
});

describe('Main after sign in', () => {
	localStorage.setItem('access_token', 'imthetoken');

	let component = mount(<Main />);

	const modal = global.document.createElement('div');
	modal.setAttribute("id", 'modal');
	global.document.body.appendChild(modal);

	let btns = component.find('button');

	describe('buttons', () => {
		it('"New task" button', () => {
			expect(btns.at(0).text()).toEqual('New task');
		});

		describe('New task pop-up', () => {
			let modal = '';

			it('"New task" -> click on should be open pop-up', () => {
				component.find('#newTask').at(0).simulate('click');
				modal = document.getElementById('modal');
				expect(modal).toMatchSnapshot()
			});

			it('"Save" button', () => {
				expect(modal.getElementsByTagName('button')[1].innerHTML).toEqual('Save')
			})

			it('"Close" button', () => {
				expect(modal.getElementsByTagName('button')[0].innerHTML).toEqual('Close')		
			})

			it('click on "Close" button should close pop-up', () => {	
				component.find('#newTask').at(0).simulate('click');
				modal.getElementsByTagName('button')[0].click();
				expect(modal.innerHTML.length).toEqual(0);
			})
		})

		it('"Delete selected" button', () => {
			expect(btns.at(1).text()).toEqual('Delete selected');
		});
		it('"Log out" button', () => {
			expect(btns.at(2).text()).toEqual('Log out');
		});
	});

	it('#tasks', () => {
		expect(component.find('#tasks')).toBeDefined();
	});
});