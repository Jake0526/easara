import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.page = this.props.page;
  }

  render() {
    return (
      <ul className="sidebar-menu" data-widget="tree">
        <li className="header center">Main Navigation</li>

        <li className={this.page == "dashboard" ? "active" : ""}>
          <Link to="/">
            <i className="fa fa-bar-chart" /> <span> Dashboard </span>
          </Link>
        </li>

        <li className={this.page == "applicant-profiles" ? "active" : ""}>
          <Link to="/applicant-profiles">
            <i className="fa fa-book" /> <span> Profiles </span>
          </Link>
        </li>

        <li className={this.page == "application" ? "active" : ""}>
          <Link to="/application">
            <i className="fa fa-list" /> <span> Applications </span>
          </Link>
        </li>

        {/* <li
          className={"treeview" + ranking + rankingHistory}
          style={{ height: "auto" }}
        >
          <a href="#">
            <i className="fa fa-users"></i>
            <span>Ranking</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li className={this.page == "ranking" ? "active" : ""}>
              <Link to="/ranking">
                <i className="fa fa-circle-o" /> <span> Generate Ranking </span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={this.page == "ranking" ? "active" : ""}>
          <Link to="/ranking">
            <i className="fa fa-users" /> <span> Generate Ranking </span>
          </Link>
        </li>

        <li className={this.page == "settings" ? "active" : ""}>
          <Link to="/settings">
            <i className="fa fa-cog" /> <span> Settings </span>
          </Link>
        </li>

        <li>
          <a href="https://portal.hrmis.davaocity.gov.ph/">
            <i className="fa fa-arrow-left" /> <span> Back to portal </span>
          </a>
        </li>
      </ul>
    );
  }
}

SideBarMenu.propTypes = {
  page: PropTypes.string,
};
