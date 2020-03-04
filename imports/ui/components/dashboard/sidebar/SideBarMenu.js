import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);

    this.page = this.props.page;
  }

  render() {
    return (
      <ul className="sidebar-menu" data-widget="tree">
        <li className="header center">Main Navigation</li>

        <li className={this.page == 'dashboard' ? 'active' : ''}>
          <Link to="/">
            <i className="fa fa-user-secret" /> <span> Dashboard </span>
          </Link>
        </li>

        <li className={this.page == 'application' ? 'active' : ''}>
          <Link to="/application">
            <i className="fa fa-book" /> <span> Application </span>
          </Link>
        </li>
      </ul>
    );
  }
}

SideBarMenu.propTypes = {
  page: PropTypes.string,
};
