import React, { Component } from "react";
import ReactTable from "react-table";
import { Button } from "react-bootstrap";
import SideBar from "../sidebar/SideBar.js";
import AppHeader from "../../app/AppHeader.js";
import AppFooter from "../../app/app_footer.js";
import AutoSuggestModal from "../../modal/AutoSuggestModal";
import ApplicationModal from "../../modal/ApplicationModal";
export default class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationModalData: [],
      data: props,
      showAutoSuggestModal: false,
      showApplicationModal: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps,
    });
  };

  toggleAutoSuggestModal = () => {
    this.setState((prevState) => ({
      showAutoSuggestModal: !prevState.showAutoSuggestModal,
    }));
  };

  toggleApplicationModal = (value = "close", data = []) => {
    if (value === "open") {
      this.setState((prevState) => ({
        showApplicationModal: !prevState.showApplicationModal,
        showAutoSuggestModal: !prevState.showAutoSuggestModal,
        applicationModalData: data,
      }));
    } else {
      this.setState((prevState) => ({
        showApplicationModal: !prevState.showApplicationModal,
        applicationModalData: data,
      }));
    }
  };

  render() {
    const {} = this.state;
    const {
      applicationModalData,
      data,
      showApplicationModal,
      showAutoSuggestModal,
    } = this.state;
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    let applicantProfilesColumns = [
      {
        Header: (
          <div>
            <h4>Applications List</h4>
          </div>
        ),
        width: 1000,
        columns: [
          {
            Header: "#",
            accessor: "id",
            minWidth: 15,
            className: "center",
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
            Header: "Last Name",
            accessor: "last_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Grouping",
            accessor: "last_name",
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
            Header: "Contact Number",
            accessor: "contact_number",
            minWidth: 65,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Created At",
            id: "created_at",
            accessor: (d) => {
              return new Date(d.created_at).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                hour12: true,
                minute: "2-digit",
              });
            },
            minWidth: 40,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Updated At",
            id: "updated_at",
            accessor: (d) => {
              return new Date(d.updated_at).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                hour12: true,
                minute: "2-digit",
              });
            },
            minWidth: 40,
            className: "right",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
        ],
      },
    ];
    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="application" />
        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1 style={{ color: "rgb(63,57,51)", fontSize: "20px" }}>
                <i className="fa fa-cog"></i> Manage Applications
              </h1>
            </section>
            <section className="content">
              <div className="box box-primary">
                <div className="box-body" style={{ padding: "0px" }}>
                  <ReactTable
                    className="-striped -highlight"
                    data={[]}
                    columns={applicantProfilesColumns}
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
                onClick={() => this.toggleAutoSuggestModal()}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i> New
                Application
              </Button>
            </section>
          </div>
        </div>
        <AppFooter />
        <div className="control-sidebar-bg"></div>
        <AutoSuggestModal
          profiles={data.state.applicantsProfiles}
          show={showAutoSuggestModal}
          toggleAutoSuggestModal={this.toggleAutoSuggestModal}
          toggleApplicationModal={this.toggleApplicationModal}
          value={""}
        />
        <ApplicationModal
          data={applicationModalData}
          profiles={data.state.applicantsProfiles}
          show={showApplicationModal}
          selectApplications={data.selectApplications}
          selectApplicantsProfile={data.selectApplicantsProfile}
          toggleApplicationModal={this.toggleApplicationModal}
        />
      </div>
    );
  }
}
