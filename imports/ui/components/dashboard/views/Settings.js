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
import Switch from "react-switch";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
      augmentation: 0,
      revolving: 0,
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
      } else if (id === "augmentation") {
        this.setState((prevState) => ({
          updateData: {
            ...prevState.updateData,
            augmentation: value,
          },
        }));
      } else if (id === "revolving") {
        this.setState((prevState) => ({
          updateData: {
            ...prevState.updateData,
            revolving: value,
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
      } else if (id === "augmentation") {
        this.setState({
          augmentation: value,
        });
      } else if (id === "revolving") {
        this.setState({
          revolving: value,
        });
      }
    }
  };

  handleChangeCheck = (checked) => {
    this.setState((prevState) => ({
      updateData: {
        ...prevState.updateData,
        is_active: checked ? 1 : 0,
      },
    }));
  };

  insertNewGrouping = () => {
    const {
      augmentation,
      revolving,
      groupingName,
      dateFrom,
      dateTo,
    } = this.state;
    const { getSettings } = this.state.data;
    const data = {
      augmentation,
      revolving,
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
    const {
      augmentation,
      revolving,
      updateData,
      groupingName,
      dateFrom,
      dateTo,
    } = this.state;
    const { settings } = this.state.data.state;
    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;
    const formInstance = (
      <form>
        <this.FieldGroup
          id="groupingName"
          type="text"
          label="Grouping Name"
          value={this.update ? updateData.groupings : groupingName}
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "groupingName")}
        />
        <br />
        <this.FieldGroup
          id="augmentation"
          type="number"
          label="Augmentation"
          value={
            this.update
              ? updateData.augmentation
                ? updateData.augmentation
                : 0
              : augmentation
          }
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "augmentation")}
        />
        <br />
        <this.FieldGroup
          id="revolving"
          type="number"
          label="Revolving"
          value={
            this.update
              ? updateData.revolving
                ? updateData.revolving
                : 0
              : revolving
          }
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "revolving")}
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
        <br />
        {this.update ? (
          <label className="control-label">
            In Use:{" "}
            <label
              className="control-label"
              style={{ color: updateData.is_active == 1 ? "green" : "red" }}
            >
              {updateData.is_active == 1 ? "Yes" : "No"}
            </label>
          </label>
        ) : null}
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
            Header: "Augmentation",
            accessor: "augmentation",
            minWidth: 30,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Revolving",
            accessor: "revolving",
            minWidth: 30,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
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
                  <div className="box-header with-border">
                    <h4 className="box-title">
                      {this.update
                        ? "Update Grouping #" + ('00000' + updateData.id).slice(-6)
                        : "New Grouping"}
                    </h4>
                    {this.update ? (
                      <Switch
                        className="pull-right"
                        onChange={this.handleChangeCheck}
                        checked={updateData.is_active == 1 ? true : false}
                        height={20}
                        width={40}
                      />
                    ) : null}
                  </div>
                  <div className="box-body" style={boxBodyHeight}>
                    {formInstance}
                  </div>
                  <div className="box-footer clearfix">
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
                  <div className="box-header with-border">
                    <h4 className="box-title">
                      Groupings{" "}
                      <OverlayTrigger placement="top" overlay={tooltip}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
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
                        height: window.innerHeight - 260,
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
