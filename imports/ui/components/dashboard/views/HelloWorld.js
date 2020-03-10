import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactModal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SimpleSchema from 'simpl-schema';
import {
  AutoForm,
  AutoField,
  TextField,
  LongTextField,
  RadioField,
  SubmitField,
  ErrorsField,
} from 'uniforms-bootstrap4';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';

import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import LoadingComponent from '../../app/CustomTableLoader.js';
//import Future from 'fibers/future';


var Chart = require('chart.js');

//Component

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.users = [];
    // this.users = Meteor.users.find().fetch();
    // this.currentUser = Meteor.user();

    this.state = {
      data: props,
      test: 'This is a test',
      showAge: "",
      showApplication: "",
      showReligion: "",
      showGender: "",
      showPoliticalDistrict: "",
      exisingEmployee: 0,
      newEmployee: 0,
      totalEmployee: 0,
      applicantsProfiles: []
    };
    this.selectApplicantsProfile()
  }
  selectApplicantsProfile = () => {
    HTTP.post("/select-profiles", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

    }, (err, result) => {
      if (!err) {
        this.setState({
          applicantsProfiles: result.data,
        });
        let chartData = result.data
        this.showApplication(chartData)
        this.showGender(chartData)
        this.showReligion(chartData)
        this.showCongressionalDistrict(chartData)
      }
    })


  };


  componentDidMount() {
    $('body').addClass('sidebar-mini');

  }


  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps, applicantsProfiles: nextProps });
    this.showApplication(nextProps.state.applicantsProfiles)
    this.showGender(nextProps.state.applicantsProfiles)
    this.showReligion(nextProps.state.applicantsProfiles)
    this.showCongressionalDistrict(nextProps.state.applicantsProfiles)

  }





  // componentDidUpdate(nextProps) {
  //   if (nextProps.state.applicantsProfiles != this.props.state.applicantsProfiles) {
  //     console.log("result1")
  //     console.log(nextProps)
  //     console.log("result2")
  //     console.log(this.props.state.applicantsProfiles)

  //     this.setState({ data: this.props.state.applicantsProfiles });
  //     nextProps.state.applicantsProfiles = this.props.state.applicantsProfiles
  //     console.log("the new state is ")
  //     console.log(this.state.data.state.applicantsProfiles)
  //     this.getAllData(this.state.data.state.applicantsProfiles)
  //     this.showApplication(this.state.data.state.applicantsProfiles)
  //     this.showGender(this.state.data.state.applicantsProfiles)
  //     this.showReligion(this.state.data.state.applicantsProfiles)
  //     this.showPoliticalDistrict(this.state.data.state.applicantsProfiles)
  //   }
  //   else {
  //     console.log("wala diri")
  //   }
  // }



  createChart = (ctx, dataChart, typeChart, optionsChart) => {
    var myChart = new Chart(ctx, {
      type: typeChart,
      data: dataChart,
      options: optionsChart
    });
    Chart.defaults.global.defaultFontSize = 16
    Chart.defaults.global.tooltips.titleFontSize = 12
    Chart.defaults.global.tooltips.titleFontColor = '#fff'

    $(window).bind("resize", function () { myChart.resize() });
    myChart.update()

  }
  // extractTotal = object => {
  //   for (let [key, value] of Object.entries(object)) {
  //     currentlyEmployed.push(value.male);
  //     notEmployed.push(value.female);
  //   }

  //   return [currentlyEmployed, notEmployed];
  // };

  showApplication = (data) => {


    let currentlyEmployed = 0
    let notEmployed = 0
    data.forEach(element => {
      element.employee_number ? currentlyEmployed += 1 : notEmployed += 1
    });
    this.setState({
      newEmployee: currentlyEmployed,
      exisingEmployee: notEmployed
    })

    var ctx = document.getElementById('showApplication').getContext('2d');
    let dataChart = {
      labels: ['Newly Registered Applicants', 'Exising Employees'],
      datasets: [{
        label: '# of Employee',
        data: [currentlyEmployed, notEmployed],
        backgroundColor: [
          '#58508d',
          '#2f4b7c',
        ],
        borderColor: [
          '#58508d',
          '#2f4b7c',
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }
    let options = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: 'black',
          FontSize: 14
        }
      },
      responsive: true,
    }
    let type = 'pie'
    this.createChart(ctx, dataChart, type, options)

  }


  showGender = (data) => {

    let male = 0
    let female = 0
    data.forEach(element => {
      element.sex == "male" ? male += 1 : female += 1
    });


    var ctx = document.getElementById('showGender').getContext('2d');
    let dataChart = {
      labels: ['Male', 'Female'],
      datasets: [{
        label: '# of Male and Female',
        data: [male, female],
        backgroundColor: [
          '#003f5c',
          '#d45087',
        ],
        borderColor: [
          '#003f5c',
          '#d45087',
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }
    let options = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          defaultFontSize: 14,
          fontColor: 'black'
        }
      },
      responsive: true,

    }
    let type = 'doughnut'
    this.createChart(ctx, dataChart, type, options)

  }


  showReligion = (data) => {
    let religion = []
    // const distinct = (value,index,self)=>{
    //   return self.indexOf(value) === index
    // }
    data.forEach(element => {
      element.religion_code !== null && element.religion_code !== "" ? religion.push(element.religion_code) : ''
    });
    let fileterReligion = [...new Set(religion)]
    let answer = (fileterReligion.join('" ,"'));

    var ctx = document.getElementById('showReligion').getContext('2d');
    //NAAY MALI sa SHOW RELIGION LABEL
    let dataChart = {
      labels: fileterReligion,
      fill: true,
      datasets: [{
        label: 'Religions',
        data: [70, 50, 40, 50, 40],
        backgroundColor: [
          '#003f5c',
          '#58508d',
          '#bc5090',
          '#ff6361',
          '#ffa600',
        ],
        borderColor: [
          '#003f5c',
          '#58508d',
          '#bc5090',
          '#ff6361',
          '#ffa600',
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }

    let options = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          defaultFontSize: 14,
          fontColor: 'black'
        }
      },
      responsive: true,

    }


    let type = 'polarArea'
    this.createChart(ctx, dataChart, type, options)

  }

  showCongressionalDistrict = (data) => {

    let congressional1 = 0
    let congressional2 = 0
    let congressional3 = 0

    data.forEach(element => {
      element.congressional_district == "1" ? congressional1 += 1 :
        element.congressional_district == "2" ? congressional2 += 1 :
          element.congressional_district == "3" ? congressional3 += 1 : ""

    });

    var ctx = document.getElementById('showCongressionalDistrict').getContext('2d');
    let dataChart = {
      labels: ['District 1', 'District 2', 'District 3'],
      datasets: [{
        label: 'No. of District filtered',
        data: [congressional1, congressional2, congressional3],
        backgroundColor: [
          '#003f5c',
          '#d45087',
          '#003f5c',
          '#d45087',
        ],
        borderColor: [
          '#003f5c',
          '#d45087',
          '#003f5c',
          '#d45087',
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }

    let options = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          defaultFontSize: 14,
          fontColor: 'black'
        }
      },

      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      responsive: true,

    }
    let type = 'bar'
    this.createChart(ctx, dataChart, type, options)

  }


  render() {

    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };

    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="dashboard" />

        <div className="content-wrapper" style={contentMinHeight}>

          <section className="content-header">
            <h1>Dashboard</h1>
          </section>

          <section className="content body">

            <div className="row">
              <div className="col-lg-3 col-xs-6">

                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>{this.state.newEmployee}</h3>

                    <p>New Applicants</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-user-plus"></i>
                  </div>

                </div>
              </div>
              <div className="col-lg-3 col-xs-6">

                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{this.state.exisingEmployee}</h3>

                    <p>Total Existing Employees</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-users"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">

                <div className="small-box bg-blue">
                  <div className="inner">
                    <h3>{this.state.newEmployee + this.state.exisingEmployee}</h3>

                    <p> Total Employees</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-group"></i>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-xs-6">

                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>10</h3>

                    <p> Places Available</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-globe"></i>
                  </div>
                </div>
              </div>
            </div>
  
            <section className="Graph">

              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12" >
        
                  {/* style={{ margin: "0 0 5em 0" }} */}

                  <div className="box-body collapse in" id="collapseBorderApplication">
                    <div className="row">
                      <div className="col-md-12">
                        <h3>
                          <p className="text-center">
                            <strong>Application: Date From - Date To</strong>
                          </p>
                        </h3>
                      </div>
                    </div>
                    <div className="row">

                      <div className="col-sm-12 col-md-6 col-lg-6 " >

                        <div className="box box-primary">
                          <div className="box-header with-border"  >

                            <div className="chart tab-pane active ">
                              <div className="box-header with-border">
                                <h3 className="box-title">   <label> Application</label></h3>
                              </div>
                              <canvas id="showApplication" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="box box-primary">
                          <div className="box-header with-border">
                            <div className="chart tab-pane active">
                              <div className="box-header with-border">
                                <h3 className="box-title">   <label> Gender</label></h3>
                              </div>
                              <canvas id="showGender" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="row" >
                      <div className="col-sm-12 col-md-6 col-lg-6" >
                        <div className="box box-primary">
                          <div className="box-header with-border"  >

                            <div className="chart">
                              <div className="box-header with-border">
                                <h3 className="box-title">   <label> Religion</label></h3>
                              </div>
                              <canvas id="showReligion" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>
                          </div>
                        </div>


                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-6" >
                        <div className="box box-primary">
                          <div className="box-header with-border"  >

                            <div className="chart">
                              <div className="box-header with-border">
                                <h3 className="box-title">   <label> Congressional District</label></h3>
                              </div>
                              <canvas id="showCongressionalDistrict" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>


                </div>
              </div>


            </section>

            <section className="content-header"  >

              <div className="row" >
                <div className="col-sm-12 col-md-6 col-lg-6" style={{ margin: "0 0 5em 0" }}>
                  <h3> <p className="text-center">
                    <strong>Places Filled </strong>
                  </p></h3>

                  <div className="progress-group">
                    <h4><span className="progress-text">MA-A (90%)</span>
                      <span className="progress-number"><b>190</b>/200</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-aqua" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="progress-group">
                    <h4><span className="progress-text">Matina</span>
                      <span className="progress-number"><b>310</b>/400</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-red" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  <div className="progress-group">
                    <h4> <span className="progress-text">Lanang</span>
                      <span className="progress-number"><b>480</b>/800</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-green" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="progress-group">
                    <h4> <span className="progress-text">Laverna</span>
                      <span className="progress-number"><b>250</b>/500</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-yellow" style={{ width: "50%" }}></div>
                    </div>
                  </div>

                  <div className="progress-group">
                    <h4> <span className="progress-text">San Pedro</span>
                      <span className="progress-number"><b>190</b>/200</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-blue" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                </div>

                <div className="col-sm-12 col-md-6 col-lg-6" >
                  <h3>  <p className="text-center">
                    <strong>Places Filled 2</strong>
                  </p></h3>

                  <div className="progress-group">
                    <h4><span className="progress-text">City Hall</span>
                      <span className="progress-number"><b>190</b>/200</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-orange" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="progress-group">
                    <h4> <span className="progress-text">Sanggunian Panglungsod</span>
                      <span className="progress-number"><b>310</b>/400</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-aqua" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  <div className="progress-group">
                    <h4> <span className="progress-text">Buhangin</span>
                      <span className="progress-number"><b>480</b>/800</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-red" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="progress-group">
                    <h4><span className="progress-text">Boulevard</span>
                      <span className="progress-number"><b>250</b>/500</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-yellow" style={{ width: "50%" }}></div>
                    </div>
                  </div>

                  <div className="progress-group">
                    <h4><span className="progress-text">Roxas</span>
                      <span className="progress-number"><b>190</b>/200</span></h4>

                    <div className="progress sm">
                      <div className="progress-bar progress-bar-pink" style={{ width: "90%" }}></div>
                    </div>
                  </div>


                </div>
              </div>
            </section>



          </section>

        </div>

        <AppFooter />
        <div className="control-sidebar-bg"></div>
      </div>
    );

  }
}
