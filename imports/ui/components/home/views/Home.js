import React, { Component } from 'react';

import Header from '../layout/Header.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
		
		this.users = [];
		// this.users = Meteor.users.find().fetch();
		// this.currentUser = Meteor.user();

		this.state = {
			user: {
				username: "jake0526",
				firstname: "Alvin Jake",
				lastname: "Pabuaya"
			}
		}

		this.currentUser = "";
	}

	componentDidMount() {
		$('body').addClass('layout-top-nav');
	}

	render() {

		return (
			<div className="wrapper">
				<Header user={this.state.user} history={this.props.history}/>

				<div className="content-wrapper">
					<div className="container" id="content-area">
						<section className="content-header">
							<h1>
							Top Navigation
							<small>Example 2.0</small>
							</h1>
							<ol className="breadcrumb">
								<li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
								<li><a href="#">Layout</a></li>
								<li className="active">Top Navigation</li>
							</ol>
						</section>

						<section className="content-header">
							<h1>
							Home
							<small>Description</small>
							</h1>

							<ol className="breadcrumb">
							<li className="active">
								<i className="fa fa-users" /> Home
							</li>
							</ol>
						</section>

						<section className="content">

						</section>
					</div>
				</div>

				{/* <AppFooter />
				<div className="control-sidebar-bg" /> */}
			</div>
		);
	}
};