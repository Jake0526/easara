import React, { Component } from "react";
import ReactTable from "react-table";
import { Button } from "react-bootstrap";
import SideBar from "../sidebar/SideBar.js";
import AppHeader from "../../app/AppHeader.js";
import AppFooter from "../../app/app_footer.js";
import PreviousIcon from "../../react-table-custom-component/PreviousComponent";
import NextIcon from "../../react-table-custom-component/NextComponent";
//COMPONENTS
import AutoSuggestProfileModal from "../../modal/AutoSuggestProfileModal";
import ApplicantProfileModal from "../../modal/ApplicantProfileModal";

import "react-confirm-alert/src/react-confirm-alert.css";
import "../../css/app.css";

export default class ApplicantProfile extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.state = {
      data: props,
      lookUpData: [],
      showApplicationModal: false,
      showAutoSuggestProfileModal: false,
      updateData: null,
    };
  }

  componentDidMount() {
    $("body").addClass("sidebar-mini");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  toggleApplicationModal = (type) => {
    if (type === "close") {
      this.setState((prevState) => ({
        lookUpData: [],
        showApplicationModal: !prevState.showApplicationModal,
        updateData: null,
        update: false,
      }));
    } else {
      this.setState((prevState) => ({
        showApplicationModal: !prevState.showApplicationModal,
      }));
    }
  };

  updateInformation = (data) => {
    this.setState({
      updateData: data,
      showApplicationModal: true,
      update: true,
    });
  };

  toggleAutoSuggestProfileModal = (value = "default", lookUpData = []) => {
    if (value === "close") {
      this.setState((prevState) => ({
        showAutoSuggestProfileModal: !prevState.showAutoSuggestProfileModal,
        lookUpData,
      }));
    } else {
      this.setState((prevState) => ({
        showAutoSuggestProfileModal: !prevState.showAutoSuggestProfileModal,
      }));
    }
  };

  render() {
    const {
      data,
      showAutoSuggestProfileModal,
      showApplicationModal,
      lookUpData,
      updateData,
      update,
    } = this.state;

    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    const { applicantsProfiles, religionOptions } = this.state.data.state;
    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;
    let applicantsColumn = [
      {
        Header: (
          <div>
            <h4>Applicant Profiles List</h4>
          </div>
        ),
        width: 1000,
        columns: [
          {
            id: "id",
            Header: "#",
            Cell: (d) => d.index + 1,
            width: 35,
            style: { whiteSpace: "unset" },
            className: "center",
          },
          {
            Header: "Last Name",
            accessor: "last_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "First Name",
            accessor: "first_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Ext",
            accessor: "name_ext",
            minWidth: 12,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
            className: "center",
          },
          {
            Header: "Middle Name",
            accessor: "middle_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Maiden Name",
            accessor: "maiden_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Address",
            accessor: "address",
            minWidth: 100,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Political District",
            accessor: "political_district",
            minWidth: 65,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Congressional District",
            accessor: "congressional_district",
            minWidth: 65,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Contact Number",
            accessor: "contact_number",
            minWidth: 65,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
            className: "center",
          },
          {
            Header: "Birth Date",
            id: "birth_date",
            accessor: (d) => {
              return new Date(d.birth_date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              });
            },
            minWidth: 40,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
            className: "center",
          },
        ],
      },
    ];
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="applicant-profiles" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1 style={{ color: "rgb(63,57,51)", fontSize: "20px" }}>
                <i className="fa fa-cog"></i> Manage Profiles
              </h1>
            </section>

            <section className="content">
              <div className="box box-primary">
                <div className="box-body" style={{ padding: "0px" }}>
                  <ReactTable
                    className="-striped -highlight"
                    data={applicantsProfiles}
                    columns={applicantsColumn}
                    defaultPageSize={reactTablePageSize}
                    PreviousComponent={PreviousIcon}
                    NextComponent={NextIcon}
                    showPageSizeOptions={false}
                    style={{
                      height: window.innerHeight - 202,
                    }}
                    getTrProps={(state, rowInfo) => {
                      return {
                        onClick: (e) => {
                          this.updateInformation(rowInfo.row._original);
                        },
                      };
                    }}
                  />
                </div>
              </div>
              <Button
                className="pull-right"
                bsStyle="primary"
                onClick={() => this.toggleApplicationModal()}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i> New Profile
              </Button>
            </section>
          </div>
        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>
        <AutoSuggestProfileModal
          profiles={data.state.existingPersonnelInformation}
          show={showAutoSuggestProfileModal}
          toggleAutoSuggestProfileModal={this.toggleAutoSuggestProfileModal}
          value={""}
        />
        <ApplicantProfileModal
          lookUpData={lookUpData}
          show={showApplicationModal}
          toggleApplicationModal={this.toggleApplicationModal}
          toggleAutoSuggestProfileModal={this.toggleAutoSuggestProfileModal}
          selectApplications={data.selectApplications}
          selectApplicantsProfile={data.selectApplicantsProfile}
          religionOptions={religionOptions}
          updateData={updateData}
          update={update}
        />
      </div>
    );
  }
}
