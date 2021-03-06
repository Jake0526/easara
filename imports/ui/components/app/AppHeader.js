import React, { Component } from "react";
import PropTypes from "prop-types";

import AppHeaderNotificationMenu from "./header_menus/AppHeaderNotificationMenu.js";
import AppHeaderUserMenu from "./header_menus/AppHeaderUserMenu.js";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.employeeInfomation = this.props.middleware.employeeInformation.data.completeProfileForActivePlantillaNonPlantillaByEmpno[0];

    this.logout = this.logout.bind(this);
    this.userDisplayName = this.userDisplayName.bind(this);
  }

  logout() {
    Meteor.logout(() => {
      this.props.history.push();
    });
  }

  userDisplayName() {
    if (this.employeeInfomation.employee.nickName) {
      return this.employeeInfomation.employee.nickName;
    } else {
      return (
        this.employeeInfomation.employee.firstName +
        " " +
        this.employeeInfomation.employee.lastName
      );
    }
  }

  render() {
    return (
      <header className="main-header">
        <a href="#" className="logo">
          <span className="logo-mini">
            <b>E</b>
          </span>
          <span className="logo-lg">
            <b>EASARA</b>{" "}
            <span
              style={{
                color: "black",
                fontSize: "11px",
                paddingLeft: "5px",
              }}
            >
              v0.9.2
            </span>
          </span>
        </a>

        <nav className="navbar navbar-static-top">
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <AppHeaderNotificationMenu />
              <AppHeaderUserMenu
                middleware={this.props.middleware}
                history={history}
              />
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

// const AppHeader = ({ user, history }) => (
//   <header className="main-header">

//     <a href="#" className="logo">
//       <span className="logo-mini"><b>U</b>P</span>
//       <span className="logo-lg"><b>SSO</b>Administrator</span>
//     </a>

//     <nav className="navbar navbar-static-top">
//       <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
//         <span className="sr-only">Toggle navigation</span>
//       </a>

//       <div className="navbar-custom-menu">
//         <ul className="nav navbar-nav">

//           <AppHeaderNotificationMenu />
//           <AppHeaderUserMenu user={user} history={history} />

//         </ul>
//       </div>
//     </nav>

//   </header>
// );

// AppHeader.propTypes = {
//   user: PropTypes.object,
//   history: PropTypes.object,
// };

// export default AppHeader;
