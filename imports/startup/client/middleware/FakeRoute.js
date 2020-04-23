import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class FakeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: [],
      existingPersonnelInformation: [],
      employeeInformation: {},
      applicantsProfiles: [],
      applicantsProfilesALL: [],
      applicantsRanking: [],
      application:[],
      introspect: {},
      isLogin: null,
      isLoad: false,
      permissions: [],
      settings: [],
      activeSettings: []
    };
  }

  componentDidMount() {
    HTTP.post(
      'http://localhost:3200/v2/graphql',
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          query:
            `{
              completeProfileForActivePlantillaNonPlantillaByEmpno(employeeNumber: "501444") {
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
          isLogin: true,
          introspect: {},
          userinfo: {},
          employeeInformation: employeeInformation,
          isLoad: true,
          permissions: [],
        });
      }
    );
    console.log("queries will run")
    //Queries
    this.selectApplicantsProfile();
    this.selectApplicantsProfileALL();
    this.selectApplicationALL()
    this.getRanking();
    this.getSettings();
    this.getAllCompleteProfile();
    this.selectApplications();
    this.getActiveSettings();
  }

  selectApplicantsProfile = () => {
    Meteor.call("select-profiles", (error, result) => {
      if (!error) {
        this.setState({
          applicantsProfiles: result,
        });
      }
      else{
        console.log(error)
      }
    });
  };

  selectApplicantsProfileALL = () => {
    Meteor.call("select-profiles-ALL", (error, result) => {
      if (!error) {
        this.setState({
          applicantsProfilesALL: result,
        });
      }
      else{
        console.log(error)
      }
    });
  };

  

  selectApplicationALL = () => {
    Meteor.call("select-applications-all", (error, result) => {
      if (!error) {
        this.setState({
          application: result,
        });
      }
      else{
        console.log(error)
      }
    });
  };

  selectApplications = () => {
    Meteor.call("select-applications", (error, result) => {
      if (!error) {
        this.setState({
          applications: result,
        });
      }
    });
  };

  getRanking = () => {
    Meteor.call("select-ranking", (error, result) => {
      if (!error) {
        this.setState({
          applicantsRanking: result,
        });
      }
    });
  };

  getActiveSettings = () => {
    Meteor.call("active-settings", (error, result) => {
      if (!error) {
        this.setState({
          activeSettings: result,
        });
      }
    });
  };

  getSettings = () => {
    Meteor.call("select-settings", (error, result) => {
      if (!error) {
        this.setState({
          settings: result,
        });
      }
    });
  };

  getAllCompleteProfile = () => {
    HTTP.post(
      "/http://localhost:3200/v2/graphql",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          query: `{
              profile {
                  employeeNumber
                  firstName
                  middleName
                  lastName
                  maidenName
                  suffixName
              }
            }`,
        },
      },
      (err, res) => {
        let result = JSON.parse(res.content);
        this.setState({
          existingPersonnelInformation: result.data.profile,
        });
      }
    );
  };

  render() {
    const { component: Component, ...props } = this.props;
    if (this.state.isLoad) {
      if (this.state.isLogin) {
        return <Route {...this} render={(props) => <Component {...this} />} />;
      } else if (this.state.isLogin) {
        return (
          <Route
            {...this}
            render={(props) => <Redirect to="/login"></Redirect>}
          />
        );
      }
    } else {
      return (
        <div
          style={{
            display: "block",
            margin: "0 auto",
            width: "50%",
            textAlign: "center",
          }}
        >
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
