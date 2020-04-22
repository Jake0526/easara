import React, { Component } from "react";
import SideBar from "../sidebar/SideBar.js";
import AppHeader from "../../app/AppHeader.js";
import AppFooter from "../../app/app_footer.js";
import DatePicker from "react-datepicker";
import {
  Button,
  ButtonGroup,
  ControlLabel,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Swal from "sweetalert2";
import ReactTable from "react-table";
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
      updateData: [],
      groupingName: "",
      dateFrom: new Date(),
      dateTo: new Date(),
    };
    this.update = false;
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps,
    });
  };

  handleChange = (value, id) => {
    if (this.update) {
      if (id === "groupingName") {
        this.setState((prevState) => ({
          updateData: {
            ...prevState.updateData,
            groupings: value,
          },
        }));
      } else if (id === "dateFrom") {
        this.setState((prevState) => ({
          updateData: {
            ...prevState.updateData,
            date_from: value,
          },
        }));
      } else if (id === "dateTo") {
        this.setState((prevState) => ({
          updateData: {
            ...prevState.updateData,
            date_to: value,
          },
        }));
      }
    } else {
      if (id === "groupingName") {
        this.setState({
          groupingName: value,
        });
      } else if (id === "dateFrom") {
        this.setState({
          dateFrom: value,
        });
      } else if (id === "dateTo") {
        this.setState({
          dateTo: value,
        });
      }
    }
  };

  insertNewGrouping = () => {
    const { groupingName, dateFrom, dateTo } = this.state;
    const { getSettings } = this.state.data;
    const data = {
      groupingName,
      dateFrom,
      dateTo,
    };
    Swal.fire({
      title: "Submit Form?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showClass: {
        popup: "animated fadeIn",
      },
      hideClass: {
        popup: "animated fadeOut faster",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.value) {
        Meteor.call("insert-grouping", data, (error, result) => {
          if (!error) {
            if (result === "success") {
              getSettings();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Grouping has been submitted",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeIn",
                },
                hideClass: {
                  popup: "animated fadeOut faster",
                },
                timer: 2500,
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Submission failed. Please try again",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeIn",
                },
                hideClass: {
                  popup: "animated fadeOut faster",
                },
                timer: 2500,
              });
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Submission failed. Please try again",
              showConfirmButton: false,
              showClass: {
                popup: "animated fadeIn",
              },
              hideClass: {
                popup: "animated fadeOut faster",
              },
              timer: 2500,
            });
          }
        });
      }
    });
  };

  updateGrouping = () => {
    const { updateData } = this.state;
    const { getSettings, selectApplications } = this.state.data;
    Swal.fire({
      title: "Update Grouping?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showClass: {
        popup: "animated fadeIn",
      },
      hideClass: {
        popup: "animated fadeOut faster",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.value) {
        Meteor.call("update-grouping", updateData, (error, result) => {
          if (!error) {
            if (result === "success") {
              getSettings();
              selectApplications();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Grouping has been updated",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeIn",
                },
                hideClass: {
                  popup: "animated fadeOut faster",
                },
                timer: 2500,
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Submission failed. Please try again",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeIn",
                },
                hideClass: {
                  popup: "animated fadeOut faster",
                },
                timer: 2500,
              });
            }
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Submission failed. Please try again",
              showConfirmButton: false,
              showClass: {
                popup: "animated fadeIn",
              },
              hideClass: {
                popup: "animated fadeOut faster",
              },
              timer: 2500,
            });
          }
        });
      }
    });
  };

  updateInformation = (data) => {
    this.update = true;
    this.setState({
      updateData: data,
    });
  };

  cancelUpdate = () => {
    this.update = false;
    this.setState({ state: this.state });
  };

  changeDateFrom = (date) => {
    this.handleChange(date, "dateFrom");
  };

  changeDateTo = (date) => {
    this.handleChange(date, "dateTo");
  };

  FieldGroup = ({ id, label, help, ...props }) => {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  };

  render() {
    const { updateData, groupingName, dateFrom, dateTo } = this.state;
    const { settings } = this.state.data.state;

    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;
    const formInstance = (
      <form>
        <this.FieldGroup
          id="formControlsText"
          type="text"
          label="Grouping Name"
          value={this.update ? updateData.groupings : groupingName}
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "groupingName")}
        />
        <br />
        <FormGroup controlId="dateFrom">
          <ControlLabel>Date From:</ControlLabel>
          <DatePicker
            name="datetime"
            className="form-control"
            style={{
              width: "100%",
              fontSize: "300px",
              overflow: "true",
            }}
            autoComplete="off"
            showYearDropdown
            scrollableYearDropdown
            selected={this.update ? updateData.date_from : dateFrom}
            yearDropdownItemNumber={100}
            dateFormat="MM-dd-yyyy"
            onChange={this.changeDateFrom}
          />
        </FormGroup>
        <br />
        <FormGroup controlId="dateTo">
          <ControlLabel>Date To:</ControlLabel>
          <DatePicker
            name="datetime"
            className="form-control"
            style={{
              width: "100%",
              fontSize: "300px",
              overflow: "true",
            }}
            autoComplete="off"
            showYearDropdown
            scrollableYearDropdown
            selected={this.update ? updateData.date_to : dateTo}
            yearDropdownItemNumber={100}
            dateFormat="MM-dd-yyyy"
            onChange={this.changeDateTo}
          />
        </FormGroup>
      </form>
    );
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    const boxHeight = {
      minHeight: `${window.innerHeight - 190}px`,
    };
    const boxBodyHeight = {
      minHeight: `${window.innerHeight - 290}px`,
    };
    const tooltip = (
      <Tooltip id="tooltip">Click a row to update a specific grouping.</Tooltip>
    );
    let settingsColumn = [
      {
        Header: (
          <div>
            <OverlayTrigger placement="top" overlay={tooltip}>
              <h4>Groupings List</h4>
            </OverlayTrigger>
          </div>
        ),
        width: 1000,
        columns: [
          {
            Header: "#",
            accessor: "id",
            minWidth: 10,
            className: "center",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Groupings",
            accessor: "groupings",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "In use",
            id: "is_active",
            minWidth: 15,
            accessor: (d) => {
              return d.is_active == "1" ? "Yes" : "";
            },
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset", color: "green" },
            className: "center",
          },
          {
            Header: "Date From",
            id: "date_from",
            accessor: (d) => {
              return new Date(d.date_from).toLocaleString("en-US", {
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
          {
            Header: "Date To",
            id: "date_to",
            accessor: (d) => {
              return new Date(d.date_to).toLocaleString("en-US", {
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
          {
            Header: "Date Created",
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
            minWidth: 55,
            className: "center",
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
        ],
      },
    ];
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="settings" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1 style={{ color: "rgb(63,57,51)", fontSize: "20px" }}>
                <i className="fa fa-cog"></i> Settings
              </h1>
            </section>
            <section className="content">
              <div
                className="col-md-6 col-lg-6 col-sm-6"
                style={{ paddingLeft: "0px", paddingRight: "15px" }}
              >
                <div className="box box-primary" style={boxHeight}>
                  <div class="box-header with-border">
                    <h4 class="box-title">
                      {this.update
                        ? "Update Grouping #" + updateData.id
                        : "New Grouping"}
                    </h4>
                  </div>
                  <div className="box-body" style={boxBodyHeight}>
                    {formInstance}
                  </div>
                  <div class="box-footer clearfix">
                    {this.update ? (
                      <ButtonGroup className="pull-right">
                        <Button
                          href="javascript:void(0)"
                          className="btn-flat"
                          onClick={() => this.updateGrouping()}
                          bsStyle="success"
                        >
                          <i className="fa fa-check"></i> Update
                        </Button>
                        <Button
                          href="javascript:void(0)"
                          className="btn-flat pull-right"
                          onClick={() => this.cancelUpdate()}
                          bsStyle="danger"
                        >
                          <i className="fa fa-times"></i> Cancel
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Button
                        href="javascript:void(0)"
                        className="btn-flat pull-right"
                        onClick={() => this.insertNewGrouping()}
                        bsStyle="success"
                      >
                        <i className="fa fa-check"></i> Submit
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-6 col-sm-6"
                style={{ paddingLeft: "0px", paddingRight: "15px" }}
              >
                <div className="box box-primary" style={boxHeight}>
                  <div class="box-header with-border">
                    <h4 class="box-title">
                      Groupings{" "}
                      <OverlayTrigger placement="top" overlay={tooltip}>
                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </h4>
                  </div>
                  <div className="box-body" style={boxBodyHeight}>
                    <ReactTable
                      className="-striped -highlight"
                      data={settings}
                      columns={settingsColumn}
                      defaultPageSize={reactTablePageSize}
                      PreviousComponent={PreviousIcon}
                      NextComponent={NextIcon}
                      showPageSizeOptions={false}
                      style={{
                        height: window.innerHeight - 320,
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
              </div>
            </section>
          </div>
        </div>
        <AppFooter />
        <div className="control-sidebar-bg"></div>
      </div>
    );
  }
}
