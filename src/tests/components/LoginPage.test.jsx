import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<LoginPage />);
	expect(wrapper).toMatchSnapshot();
});

test('should call startLoginWithGoogle on button click', () => {
	const startLoginWithGoogle = jest.fn();
	const wrapper = shallow(
		<LoginPage startLoginWithGoogle={startLoginWithGoogle} />,
	);
	wrapper
		.findWhere((n) => n.text() === 'Login with Google' && n.type() === 'button')
		.simulate('click');
	expect(startLoginWithGoogle).toHaveBeenCalled();
});

test('should call startLoginWithFacebook on button click', () => {
	const startLoginWithFacebook = jest.fn();
	const wrapper = shallow(
		<LoginPage startLoginWithFacebook={startLoginWithFacebook} />,
	);
	wrapper
		.findWhere(
			(n) => n.text() === 'Login with Facebook' && n.type() === 'button',
		)
		.simulate('click');
	expect(startLoginWithFacebook).toHaveBeenCalled();
});

test('should call startLoginWithTwitter on button click', () => {
	const startLoginWithTwitter = jest.fn();
	const wrapper = shallow(
		<LoginPage startLoginWithTwitter={startLoginWithTwitter} />,
	);
	wrapper
		.findWhere(
			(n) => n.text() === 'Login with Twitter' && n.type() === 'button',
		)
		.simulate('click');
	expect(startLoginWithTwitter).toHaveBeenCalled();
});

test('should call startLoginWithGithub on button click', () => {
	const startLoginWithGithub = jest.fn();
	const wrapper = shallow(
		<LoginPage startLoginWithGithub={startLoginWithGithub} />,
	);
	wrapper
		.findWhere((n) => n.text() === 'Login with Github' && n.type() === 'button')
		.simulate('click');
	expect(startLoginWithGithub).toHaveBeenCalled();
});
