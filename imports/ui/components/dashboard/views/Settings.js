import React, { Component } from "react";
import SideBar from "../sidebar/SideBar.js";
import AppHeader from "../../app/AppHeader.js";
import AppFooter from "../../app/app_footer.js";
import { Button, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactTable from "react-table";
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps,
    });
  };

  handleChange = (value, id) => {
    if (id === "revolving") {
      this.setState({
        revolving: value,
      });
    } else if (id === "augmentation") {
      this.setState({
        augmentation: value,
      });
    }
  };

  updateInformation = () => {
    const { getSettings, toggleSettingsModal } = this.state.data;
    Swal.fire({
      title: "Submit Form?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showClass: {
        popup: "animated fadeInDown faster",
      },
      hideClass: {
        popup: "animated fadeOutUp faster",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.value) {
        const { augmentation, revolving } = this.state;
        let data = {
          augmentation,
          revolving,
        };
        Meteor.call("update-settings", data, (error, result) => {
          if (!error) {
            if (result === "success") {
              getSettings();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Settings has been successfuly updated",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeInDown faster",
                },
                hideClass: {
                  popup: "animated fadeOutUp faster",
                },
                timer: 2500,
              });
              toggleSettingsModal();
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Submission failed. Please try again",
                showConfirmButton: false,
                showClass: {
                  popup: "animated fadeInDown faster",
                },
                hideClass: {
                  popup: "animated fadeOutUp faster",
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
                popup: "animated fadeInDown faster",
              },
              hideClass: {
                popup: "animated fadeOutUp faster",
              },
              timer: 2500,
            });
          }
        });
      }
    });
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
    const { settings } = this.state.data.state;
    console.log(settings);
    let reactTablePageSize = Math.floor(window.innerHeight - 220) * 0.0232;
    const formInstance = (
      <form>
        <this.FieldGroup
          id="formControlsText"
          type="text"
          label="Grouping Name"
          value={""}
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "revolving")}
        />
        <br />
        <this.FieldGroup
          id="formControlsText"
          type="number"
          label="Maximum Augmentation Slots"
          value={""}
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "augmentation")}
        />
        <br />
        <this.FieldGroup
          id="formControlsText"
          type="number"
          label="Maximum Augmentation Slots"
          value={""}
          placeholder="Enter value"
          onChange={(e) => this.handleChange(e.target.value, "augmentation")}
        />
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
                    <h4 class="box-title">Ranking</h4>
                  </div>
                  <div className="box-body" style={boxBodyHeight}>
                    {formInstance}
                  </div>
                  <div class="box-footer clearfix">
                    <Button
                      href="javascript:void(0)"
                      className="btn-flat pull-right"
                      onClick={() => this.updateInformation()}
                      bsStyle="success"
                    >
                      <i className="fa fa-check"></i> Submit
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-lg-6 col-sm-6"
                style={{ paddingLeft: "0px", paddingRight: "15px" }}
              >
                <div className="box box-primary" style={boxHeight}>
                  <div class="box-header with-border">
                    <h4 class="box-title">Groupings</h4>
                  </div>
                  <div className="box-body" style={boxBodyHeight}>
                    <ReactTable
                      className="-striped -highlight"
                      data={settings}
                      columns={[]}
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
                  <div class="box-footer clearfix">
                    <Button
                      href="javascript:void(0)"
                      className="btn-flat pull-right"
                      onClick={() => this.updateInformation()}
                      bsStyle="success"
                    >
                      <i className="fa fa-check"></i> Submit
                    </Button>
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
