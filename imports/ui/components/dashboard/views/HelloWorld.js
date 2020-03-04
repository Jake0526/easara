import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactModal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  AutoField,
  TextField,
  LongTextField,
  RadioField,
  SubmitField,
  ErrorsField,
} from 'uniforms-bootstrap4';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';

import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import LoadingComponent from '../../app/CustomTableLoader.js';

//Component

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.users = [];
    // this.users = Meteor.users.find().fetch();
    // this.currentUser = Meteor.user();

    this.state = {
      test: 'This is a test',
    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');
  }

  testClick = () => {
    this.setState({
      test: '**** you',
    });
  };

  render() {
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };

    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="dashboard" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1>Hello World {this.state.test}</h1>

              <ol className="breadcrumb">
                <li className="active">
                  <i className="fa fa-users" /> Hello World
                </li>
              </ol>
            </section>

            <section className="content">
              <div className="box box-primary">
                <div className="box-body">
                  lorem ipsum
                  <button type="button" className="btn btn-primary" onClick={this.testClick}>
                    Click me!.
                  </button>
                  <br />
                </div>
              </div>
            </section>
          </div>
        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
}
