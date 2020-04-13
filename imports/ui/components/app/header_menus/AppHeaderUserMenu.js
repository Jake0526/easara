/* eslint-disable import/no-unresolved */
import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AppHeaderUserMenu extends Component {
  constructor(props) {
    super(props);

    this.employeeInfomation = this.props.middleware.employeeInformation.data.completeProfileForActivePlantillaNonPlantillaByEmpno[0];
  }

  userDisplayName = () => {
    const { fullName, nickName } = this.employeeInfomation.employee;
    let displayName = nickName ? nickName : fullName;

    return displayName;
  };

  render() {
    const { fullName } = this.employeeInfomation.employee;
    return (
      <li className="dropdown user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img
            src={`/image-server/${this.employeeInfomation.currentAppointment
              .employmentType +
              "/" +
              this.employeeInfomation.picture}`}
            className="user-image"
            alt="User Image"
          />
          <span className="hidden-xs">{this.userDisplayName()}</span>
        </a>

        <ul className="dropdown-menu">
          <li className="user-header">
            <img
              src={`/image-server/${this.employeeInfomation.currentAppointment
                .employmentType +
                "/" +
                this.employeeInfomation.picture}`}
              className="img-circle"
              alt="User Image"
            />
            <p>{fullName}</p>
            <p>
              <small>
                {this.employeeInfomation.currentAppointment.officeName}
              </small>
            </p>
          </li>

          <li className="user-body">
            <div className="row">
              <div className="col-xs-12 text-center">
                {this.employeeInfomation.currentAppointment.position}
              </div>
            </div>
          </li>

          <li className="user-footer">
            <div className="pull-left">
              <a href="#" className="btn btn-default btn-flat">
                Profile
              </a>
            </div>
            <div className="pull-right">
              <a href="/logout" className="btn btn-default btn-flat">
                Sign out
              </a>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}
