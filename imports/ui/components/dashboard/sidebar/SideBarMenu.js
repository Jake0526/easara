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
            <i className="fa fa-bar-chart" /> <span> Dashboard </span>
          </Link>
        </li>

        <li className={this.page == 'application' ? 'active' : ''}>
          <Link to="/application">
            <i className="fa fa-book" /> <span> Application </span>
          </Link>
        </li>
        
        <li className={this.page == 'ranking' ? 'active' : ''}>
          <Link to="/ranking">
            <i className="fa fa-users" /> <span> Ranking </span>
          </Link>
        </li>

        <li className="header"></li>

        <li>
          <a href="https://portal.hrmis.davaocity.gov.ph/">
            <i className="fa fa-sign-out" /> <span> Back to portal  </span>
          </a>
        </li>
      </ul>
    );
  }
}

SideBarMenu.propTypes = {
  page: PropTypes.string,
};
