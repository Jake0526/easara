import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideBarUserPanel from './SideBarUserPanel';
import SideBarSearchPanel from './sidebar_search_panel';
import SideBarMenu from './SideBarMenu.js';

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.employeeInfomation = this.props.middleware.employeeInformation.data.completeProfileForActivePlantillaNonPlantillaByEmpno[0];
    this.userDisplayName = this.userDisplayName.bind(this);
  }

  componentDidMount() {
    $('.sidebar-menu').tree();
  }

  userDisplayName() {
    var fullname = this.employeeInfomation.employee.firstName + ' ' + this.employeeInfomation.employee.lastName;

    return fullname;
  }


  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <SideBarUserPanel employeeInformation={this.employeeInfomation} />
          <SideBarMenu page={this.props.page}/>
        </section>
      </aside>
    );
  }
}
