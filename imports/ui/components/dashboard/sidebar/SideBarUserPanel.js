import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SideBarUserPanel extends Component {
  constructor(props) {
    super(props);
    this.employeeInformation = this.props.employeeInformation;
  }

  componentDidMount() {
    $('.sidebar-menu').tree();
  }

  userDisplayName = () => {
    const { fullName, nickName } = this.employeeInformation.employee;
    let displayName = nickName ? nickName : fullName;

    return displayName;
  };

  render() {
    return (
      <div className="user-panel">
        <div className="pull-left image">
          <img
            alt="User"
            src={
              '/image-server/' +
              this.employeeInformation.currentAppointment.employmentType +
              '/' +
              this.employeeInformation.picture
            }
            className="img-circle"
          />
        </div>
        <div className="pull-left info">
          <p>{this.userDisplayName()}</p>
        </div>
      </div>
    );
  }
}
