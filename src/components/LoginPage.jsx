import React from 'react';
import { connect } from 'react-redux';
import {
	startLoginWithGoogle,
	startLoginWithFacebook,
	startLoginWithTwitter,
	startLoginWithGithub,
} from '../actions/auth';

export const LoginPage = (props) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="box-layout__title">Expensify</h1>
			<p>It's time to get your expenses under control.</p>
			<button
				className="box-layout__button button--red"
				onClick={props.startLoginWithGoogle}>
				<i className="fa fa-google fa-fw" />
				Login with Google
			</button>
			<button
				className="box-layout__button"
				onClick={props.startLoginWithFacebook}>
				<i className="fa fa-facebook fa-fw" />
				Login with Facebook
			</button>
			<button
				className="box-layout__button button--light-blue"
				onClick={props.startLoginWithTwitter}>
				<i className="fa fa-twitter fa-fw" />
				Login with Twitter
			</button>
			<button
				className="box-layout__button button--dark"
				onClick={props.startLoginWithGithub}>
				<i className="fa fa-github fa-fw" />
				Login with Github
			</button>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
	startLoginWithFacebook: () => dispatch(startLoginWithFacebook()),
	startLoginWithTwitter: () => dispatch(startLoginWithTwitter()),
	startLoginWithGithub: () => dispatch(startLoginWithGithub()),
});

export default connect(
	undefined,
	mapDispatchToProps,
)(LoginPage);
