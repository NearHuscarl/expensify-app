import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = (props) => (
	<div>
		<input type="text" placeholder="abc@gmail.com" autoFocus />
		<input type="password" placeholder="your password" />
		<button onClick={props.startLogin}>Login</button>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin()),
});

export default connect(
	undefined,
	mapDispatchToProps,
)(LoginPage);
