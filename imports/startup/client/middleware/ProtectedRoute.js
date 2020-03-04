import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allEmployeeInformation: {},
      employeeInformation: {},
      introspect: {},
      isLogin: null,
      isLoad: false,
      permissions: [],
      permissions: [],
    };
  }

  componentDidMount() {
    HTTP.post(
      '/is-login',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
      (err, res) => {
        var isLoginResult = JSON.parse(res.content);

        if (isLoginResult.isLogin) {
          HTTP.post(
            '/graphqlv2',
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              data: {
                query:
                  `{
                    completeProfileForActivePlantillaNonPlantillaByEmpno(employeeNumber: "` +
                  isLoginResult.userinfo.employee_number +
                  `") {
                                employeeNumber
                                employee {
                                    lastName
                                    firstName
                                    extensionName
                                    middleName
                                    maidenName
                                    nickName
                                    fullName
                                    fullNameReverse
                                }
                                phoneNumber
                                birthDate
                                age
                                religion
                                sex
                                tin
                                gsis
                                hdmf
                                philHealth
                                sss
                                umid
                                psn
                                isLicensed
                                contact {
                                    name
                                    relationship
                                    address
                                    number
                                }
                                picture
                                signature
                                biometrics {
                                    fingerprints {
                                        finger1
                                        finger2
                                        finger3
                                        finger4
                                        finger5
                                    }
                                    facial
                                    iris
                                }
                                rfid  {
                                    officialID
                                    atm
                                }
                                currentAppointment {
                                    employmentType
                                    officeCode
                                    officeName
                                    subOfficeName
                                    position
                                    itemNumber
                                    programCode
                                    program
                                    division
                                    districtSectionUnit
                                    extensionOffice
                                    areaCode
                                    areaType
                                    vacancyDate
                                    vacancyStatus
                                    publicationCode
                                }
                                currentEmployment {
                                    actualSalaryAnnual
                                    actualSalaryMonthly
                                    step
                                    statusAppointment
                                    remarksAppointment
                                    designationCode 
                                    workStationCode
                                    workStationExtensionCode
                                    rate
                                }
                                workSchedule {
                                    mon
                                    tue
                                    wed
                                    thu
                                    fri
                                    sat
                                    sun
                                }
                            }
                        }`,
              },
            },
            (err, res) => {
              var employeeInformation = JSON.parse(res.content);

              this.setState({
                isLogin: isLoginResult.isLogin,
                introspect: isLoginResult.introspect,
                userinfo: isLoginResult.userinfo,
                employeeInformation: employeeInformation,
                isLoad: true,
                permissions: isLoginResult.permissions,
              });
            }
          );
        } else {
          if (isLoginResult.expired) {
            window.location.href = '/logout';
          } else {
            window.location.href = '/login';
          }
        }
      }
    );

    this.queryAllEmployee();
  }

  queryAllEmployee = () => {};

  render() {
    const { component: Component, ...props } = this.props;
    console.log(this.state);
    if (this.state.isLoad) {
      if (this.state.isLogin) {
        return <Route {...this} render={props => <Component {...this} />} />;
      } else if (this.state.isLogin) {
        return <Route {...this} render={props => <Redirect to="/login"></Redirect>} />;
      }
    } else {
      return (
        <div style={{ display: 'block', margin: '0 auto', width: '50%', textAlign: 'center' }}>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }
  }
}
