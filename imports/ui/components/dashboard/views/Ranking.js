import React, { Component } from "react";
import ReactTable from "react-table";
import { Button } from "react-bootstrap";
import SideBar from "../sidebar/SideBar.js";
import AppHeader from "../../app/AppHeader.js";
import AppFooter from "../../app/app_footer.js";
import PreviousIcon from "../../react-table-custom-component/PreviousComponent";
import NextIcon from "../../react-table-custom-component/NextComponent";
import Swal from "sweetalert2";
//COMPONENTS
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../css/app.css";

var moment = require("moment");
export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.state = {
      data: props,
      updateData: null,
      rankedApplicants: [],
      rankingStatus: 0,
      rankingLength: 0,
    };
  }

  componentDidMount() {
    $("body").addClass("sidebar-mini");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });
  }

  generateNewRanking = () => {
    let applicants = this.state.data.state.activeApplications;
    let activeSettings = this.state.data.state.activeSettings;
    let prioApplicants = [];
    let lessPrioApplicants3months = [];
    let lessPrioApplicantsLess3months = [];
    let lessPrioApplicants = [];
    let rankedApplicants = [];

    let recursionLoop = () => {
      if (this.state.rankingStatus < rankedApplicants.length) {
        Meteor.call(
          "insert-rank",
          rankedApplicants[this.state.rankingStatus],
          (error, result) => {
            if (!error) {
              if (result === "success") {
                this.setState({
                  rankingStatus: this.state.rankingStatus + 1,
                });

                recursionLoop();
              }
            }
          }
        );
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New ranks updated",
          showConfirmButton: false,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          },
          timer: 2500,
        });

        this.props.getRanking();

        this.setState({
          rankingStatus: 0,
        });

        $("#modal-loading").modal("hide");
      }
    };

    if (applicants.length == 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No applicants recorded",
        showConfirmButton: false,
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        timer: 2500,
      });
    } else {
      let rankNum = 1;
      let remainingRevolvingSlot = activeSettings[0].number_of_revolving;
      let remainingAugmentationSlot = activeSettings[0].number_of_augmentation;

      //Rank the priority and separate the ramaining less priority
      for (let x = 0; x < applicants.length; x += 1) {
        
        let dateDiff = 0;

        if(applicants[x].date_to) {
          let dateTo = moment(applicants[x].date_to);
          let todayDate = moment(new Date());

          dateDiff = (todayDate.diff(dateTo, 'days')/30);
        }

        if (!applicants[x].employee_number) {
          prioApplicants.push({
            applicationId: applicants[x].id,
            rankNo: "",
            groupingsID: applicants[x].groupings_id,
            category: ""
          });
        } else {

          if (dateDiff > 3) {
            lessPrioApplicants3months.push({
              applicationId: applicants[x].id,
              rankNo: "",
              groupingsID: applicants[x].groupings_id,
              category: ""
            });
          }else {
            lessPrioApplicantsLess3months.push({
              applicationId: applicants[x].id,
              rankNo: "",
              groupingsID: applicants[x].groupings_id,
              category: ""
            });
          }
        }

        rankNum++;
        if (x == applicants.length - 1) {
          rankedApplicants = prioApplicants;
          rankedApplicants = rankedApplicants.concat(lessPrioApplicants3months);
          rankedApplicants = rankedApplicants.concat(lessPrioApplicantsLess3months);

          this.setState({
            rankingLength: rankedApplicants.length,
          });

          for (let x = 0; x < rankedApplicants.length; x += 1) {
            rankedApplicants[x].rankNo = x+1;

            if(remainingRevolvingSlot > 0) {
              rankedApplicants[x].category = "Revolving";

              remainingRevolvingSlot-=1;
            }else {
              if(remainingAugmentationSlot > 0) {
                rankedApplicants[x].category = "Augmentation";

                remainingAugmentationSlot-=1;
              }else {
                rankedApplicants[x].category = "";
              }
            }
          }

          console.log(rankedApplicants);

          $("#modal-loading").modal({
            backdrop: "static",
            keyboard: false,
            show: true,
          });

          Meteor.call(
            "remove-ranking",
            {
              'groupingsID': activeSettings[0].id
            },
            (error, result) => {
              if (!error) {
                if (result === "success") {
                  recursionLoop();
                }
              }
            }
          );
        }
      }
    }
  };
  
  render() {
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };
    let reactTablePageSize = Math.floor(window.innerHeight - 330) * 0.0232;
    let applicantsColumn = [
      {
        Header: (
          <div>
            <h4>Ranking</h4>
          </div>
        ),
        width: 1000,
        columns: [
          {
            Header: "Rank",
            accessor: "ranking",
            minWidth: 15,
            className: "center",
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
            Header: "First Name",
            accessor: "first_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Middle Name",
            accessor: "middle_name",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Category",
            accessor: "category",
            minWidth: 50,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
          {
            Header: "Remarks",
            accessor: "remarks",
            minWidth: 120,
            headerClassName: "wordwrap",
            style: { whiteSpace: "unset" },
          },
        ],
      },
    ];
    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="ranking" />

        <div className="content-wrapper" style={contentMinHeight}>
          <div className="plantilla-content" id="content-area">
            <section className="content-header">
              <h1 style={{ color: "rgb(63,57,51)", fontSize: "20px" }}>
                <i className="fa fa-list"></i> Generate Ranking of Applicants
              </h1>
            </section>

            <section className="content">
              <div className="box box-primary">
                <div className="box-body" style={{ padding: "0px" }}>
                  <ReactTable
                    className="-striped -highlight"
                    data={this.state.data.state.applicantsRanking}
                    columns={applicantsColumn}
                    defaultPageSize={reactTablePageSize}
                    PreviousComponent={PreviousIcon}
                    NextComponent={NextIcon}
                    showPageSizeOptions={false}
                    style={{
                      height: window.innerHeight - 202,
                    }}
                    defaultSorted={[
                      {
                        id: "ranking",
                        desc: false
                      }
                    ]}
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
                onClick={() => this.generateNewRanking()}
              >
                <i className="fa fa-pencil" aria-hidden="true"></i> Generate New
                Ranking
              </Button>
            </section>
          </div>
        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>

        <div className="modal fade" id="modal-loading">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body" style={{ paddingBottom: "1px" }}>
                <div className="progress-group">
                  <span className="progress-text">Ranking Applicants</span>
                  <span className="progress-number">
                    <b>{this.state.rankingStatus}</b>/{this.state.rankingLength}
                  </span>

                  <div className="progress sm">
                    <div
                      className="progress-bar progress-bar-aqua"
                      style={{
                        width:
                          (this.state.rankingStatus /
                            this.state.rankingLength) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
