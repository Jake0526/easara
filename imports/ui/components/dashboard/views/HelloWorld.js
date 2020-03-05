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


var Chart = require('chart.js');
//Component

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.users = [];
    // this.users = Meteor.users.find().fetch();
    // this.currentUser = Meteor.user();

    this.state = {
      test: 'This is a test',
      showAge: "",
      showApplication: "",
      showReligion: "",
      showGender: "",
      showPoliticalDistrict: "",
    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');
    this.showApplication()
    this.showGender()
    this.showReligion()
    this.showPoliticalDistrict()
  }

  getAllData = ()=>{
    let copyArray = []
    let copyObject = {}



  }



  switchChart = () => {
    // let test = document.getElementById("selectShowChart");
    // //test = test.options[test.selectedIndex].text;
    // console.log("test is " + test)



    // $('#selectShowChart').on("change",function(){
    //   var dataid = $("#selectShowChart option:selected").attr('data-id');
    //   console.log("data is " + dataid)
    // });

    // // target = target.toLowerCase()
    // // console.log("target is" + target)
    // var dataid = "default test"
    // switch (dataid){
    //   case "age":
    //     this.setState({
    //       showAge: true,
    //       showApplicant: false,
    //       showReligion:false,
    //       showGender: false,
    //     })
    //     break;

    //   case "application":
    //     this.setState({
    //       showAge: false,
    //       showApplicant: true,
    //       showReligion:false,
    //       showGender: false,
    //     })
    //     break;

    //   case "religion":
    //     this.setState({
    //       showAge: false,
    //       showApplicant: false,
    //       showReligion:true,
    //       showGender: false,
    //     })
    //     break;

    //   case "gender":
    //     this.setState({
    //       showAge: false,
    //       showApplicant: false,
    //       showReligion:false,
    //       showGender: true,
    //     })
    //     break;


    //   default:
    //       this.setState({
    //         showAge: false,
    //         showApplicant: true,
    //         showReligion:false,
    //         showGender: false,
    //       })
    //        break;
    // }

  }


  createChart = (ctx, dataChart, typeChart, optionsChart) => {
    var myChart = new Chart(ctx, {
      type: typeChart,
      data: dataChart,
      options: optionsChart
    });
    Chart.defaults.global.defaultFontSize = 16
    Chart.defaults.global.tooltips.titleFontSize = 12
    Chart.defaults.global.tooltips.titleFontColor = '#fff'
    
  }
  showApplication = () => {
    var ctx = document.getElementById('showApplication').getContext('2d');
    let dataChart = {
      labels: ['Newly Registered Applicants', 'Exising Employees'],
      datasets: [{
        label: '# of Employee',
        data: [100, 50],
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

  showGender = () => {
    var ctx = document.getElementById('showGender').getContext('2d');
    let dataChart = {
      labels: ['Male', 'Female'],
      datasets: [{
        label: '# of Male and Female',
        data: [10, 20],
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

  showReligion = () => {
    var ctx = document.getElementById('showReligion').getContext('2d');
    let dataChart = {
      labels: ['Roman-Catholic', 'Muslim', 'Evangelical', 'Iglesia ni Kristo', 'Aglipayan'],
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
  showPoliticalDistrict = () =>{

    var ctx = document.getElementById('showPoliticalDistrict').getContext('2d');
    let dataChart = {
      labels: ['District 1', 'District 2', 'District 3', 'District 4'],
      datasets: [{
        label: 'No. of District filtered',
        data: [10, 20,30,40],
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
            // defaultFontSize: 14,
            // fontColor: 'black'
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
                    <h3>44</h3>

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
                    <h3>44</h3>

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
                    <h3>44</h3>

                    <p>Total Employees</p>
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

                    <p>Places Available</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-globe"></i>
                  </div>
                </div>
              </div>
            </div>
          {/* 
                QUERY NEEDED FOR INFORMATIONS
                -- SELECT distinct * FROM easara.applicants_profile a where sex = "Male";
                  SELECT distinct * FROM easara.applicants_profile a where sex = "Female";
                  SELECT distinct * FROM easara.applicants_profile a where political_district = "District 1";
                  SELECT distinct * FROM easara.applicants_profile a where political_district = "District 2";
                  SELECT distinct * FROM easara.applicants_profile a where political_district = "District 3";   
                  
                  
                  
                     
                     */}

            <section className="Graph">

              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12" >
                  <div className="box">
                    <div className="box-header with-border"  >
                      <h3><label>Graph Report</label></h3>
                      <div className="box-tools pull-right">
                        <button type="button"  className="btn btn-box-tool" data-toggle="collapse" data-target="#collapseBorder" aria-expanded="true"><i class="fa fa-minus"></i>
                        </button>

                      </div>
                    </div>

                    
                    <div className="box-body collapse in" id="collapseBorder">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="text-center">
                          <h3> <strong>Application: Date From - Date To</strong></h3>
                          </p>
                        </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-6 col-lg-6 "style={{margin:"0 0 5em 0"}}>
                            <div className="chart">
                            <center><h3><label>Application</label></h3></center>
                              <canvas id="showApplication" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>

                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6" style={{margin:"0 0 5em 0"}}>
                            <div className="chart">
                            <center><h3><label>Gender</label></h3></center>
                              <canvas id="showGender" className="chartjs"width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>
                          </div>

                        </div>

                        <div className="row" >
                          <div className="col-sm-12 col-md-6 col-lg-6" style={{margin:"0 0 5em 0"}}>

                            <div className="chart">
                            <center><h3><label>Religion</label></h3></center>
                              <canvas id="showReligion" className="chartjs" width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
                            </div>


                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-6" style={{margin:"0 0 5em 0"}}>

                            <div className="chart">
                            <center><h3><label>District</label></h3></center>
                              <canvas id="showPoliticalDistrict" className="chartjs"width="100px" height="55px" style={{ display: "block", width: "100", height: "100" }}></canvas>
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
                <div className="col-sm-12 col-md-6 col-lg-6" style={{margin:"0 0 5em 0"}}>
                  <p className="text-center">
                    <h3><strong>Places Filled </strong></h3>
                  </p>

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

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-yellow" style={{ width: "50%" }}></div>
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
                  <p className="text-center">
                   <h3> <strong>Places Filled 2</strong></h3>
                  </p>

                  <div className="progress-group">
                    <h4><span className="progress-text">City Hall</span>
                    <span className="progress-number"><b>190</b>/200</span></h4>

                    <div class="progress sm">
                      <div class="progress-bar progress-bar-orange" style={{ width: "90%" }}></div>
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
