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
      revolving: 0,
      augmentation: 0,
      personnelNewSlide: 0
    };
  }

  componentDidMount() {
    $("body").addClass("sidebar-mini");

    $('#personnelNewForm').carousel('pause');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps });

    if(nextProps.state.activeSettings.length != 0) {
      this.setState({
        revolving: nextProps.state.activeSettings[0].revolving,
        augmentation: nextProps.state.activeSettings[0].augmentation
      })
    }
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

        this.props.refreshData();

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
      let remainingRevolvingSlot = activeSettings[0].revolving;
      let remainingAugmentationSlot = activeSettings[0].augmentation;

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
            category: "",
            remarks: "No Employment Record | Date Applied: " + moment(applicants[x].datetime_applied).format('LLLL')
          });
        } else {

          if (dateDiff > 3) {
            lessPrioApplicants3months.push({
              applicationId: applicants[x].id,
              rankNo: "",
              groupingsID: applicants[x].groupings_id,
              category: "",
              remarks: "More than three months ago | Date Applied : " + moment(applicants[x].datetime_applied).format('LLLL')
            });
          }else {
            lessPrioApplicantsLess3months.push({
              applicationId: applicants[x].id,
              rankNo: "",
              groupingsID: applicants[x].groupings_id,
              category: "",
              remarks: "Employed Less than 3 months ago | Date Applied: " + moment(applicants[x].datetime_applied).format('LLLL')
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
  
  personnelNew = () => {
    $("#modal-personnelnew").modal("show");
  }
  
  slideNext = () => {
    let personnelNewSlide = this.state.personnelNewSlide + 1;

    this.setState({
      personnelNewSlide
    });

    $("#personnelNewForm").carousel(personnelNewSlide);
  }

  slideBack = () => {
    let personnelNewSlide = this.state.personnelNewSlide - 1;

    this.setState({
      personnelNewSlide
    });

    $("#personnelNewForm").carousel(personnelNewSlide);
  }

  forwardToPersonnelNew = () => {
    let personnelNewSlide = this.state.personnelNewSlide + 1;

    this.setState({
      personnelNewSlide
    });
  }

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
                  <div className="alert alert-info alert-dismissible">
                    <h4><i className="icon fa fa-info"></i> Number of Slots</h4>
                    <ul className="margin-bottom-none padding-left-lg">
                      <li>Revolving: {this.state.revolving}</li>
                      <li>Augmentation: {this.state.augmentation}</li>
                    </ul>
                  </div>

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

              <div className="btn-group pull-right">
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => this.personnelNew()}>
                    <i className="fa fa-pencil" aria-hidden="true"></i> 
                    Add as new personnel
                </button>
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={() => this.generateNewRanking()}>
                    <i className="fa fa-pencil" aria-hidden="true"></i> 
                    Process to personnel ranking
                </button>
              </div>
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

        {/* Forward to personnelnew */}
        <div className="modal fade" id="modal-personnelnew">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body" style={{ padding: "0px" }}>
                <div id="personnelNewForm" className="carousel slide">
                  {/* <ol className="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1" className=""></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2" className=""></li>
                  </ol> */}
                  <div className="progress progress-xxs carousel-indicators">
                    <div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" style={{ width: ((this.state.personnelNewSlide) * 33.33)+"%"}}>
                      {/* <span className="sr-only">{this.state.personnelNewSlide}</span> */}
                    </div>
                  </div>
                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="box box-primary">
                        <div className="box-body" style={{paddingBottom: "50px"}}>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Position</label>
                            <input type="email" className="form-control" placeholder="Search Position"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Begin Date</label>
                            <input type="email" className="form-control" placeholder="mm/dd/yyyy"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Office</label>
                            <input type="email" className="form-control" placeholder="Search Office"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Program</label>
                            <input type="email" className="form-control" placeholder="Search Program"/>
                          </div>

                          <button 
                            type="button" 
                            className="btn btn-primary pull-right" 
                            style={{marginTop: "10px"}}
                            onClick={() => this.slideNext()}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> 
                              Next
                          </button>
                        </div>
                      </div>

                      <div className="carousel-caption" style={{color: "black"}}>
                        Revolving
                      </div>
                    </div>
                    <div className="item">
                      <div className="box box-primary">
                        <div className="box-body" style={{paddingBottom: "50px"}}>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Position</label>
                            <input type="email" className="form-control" placeholder="Search Position"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Begin Date</label>
                            <input type="email" className="form-control" placeholder="mm/dd/yyyy"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Office</label>
                            <input type="email" className="form-control" placeholder="Search Office"/>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Program</label>
                            <input type="email" className="form-control" placeholder="Search Program"/>
                          </div>

                          <button 
                            type="button" 
                            className="btn btn-primary pull-left" 
                            style={{marginTop: "10px"}}
                            onClick={() => this.slideBack()}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> 
                              Back
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-primary pull-right" 
                            style={{marginTop: "10px"}}
                            onClick={() => this.slideNext()}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> 
                              Next
                          </button>
                        </div>
                      </div>

                      <div className="carousel-caption" style={{color: "black"}}>
                        Augmentation
                      </div>
                    </div>
                    <div className="item">
                      <div className="box box-primary">
                        <div className="box-body" style={{paddingBottom: "50px"}}>
                          <div className="progress-group">
                            <span className="progress-text">Forwarding Applicants</span>
                            <span className="progress-number">
                              <b>0</b>/10
                            </span>

                            <div className="progress sm">
                              <div
                                className="progress-bar progress-bar-aqua"
                                style={{
                                  width:
                                    "80%",
                                }}
                              ></div>
                            </div>

                            <button 
                              type="button" 
                              className="btn btn-primary pull-left" 
                              onClick={() => this.slideBack()}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> 
                                Back
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-primary pull-right" 
                              style={{marginTop: "10px"}}
                              onClick={() => this.forwardToPersonnelNew()}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> 
                                Forward as new personnel
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-caption" style={{color: "black"}}>
                        Forward
                      </div>
                    </div>
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
