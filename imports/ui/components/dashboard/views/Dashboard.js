import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';

var converter = require('number-to-words');
var Chart = require('chart.js');

var d3 = require('d3-scale-chromatic')
//Component

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props,
      dataPrevious: props,
      showAge: "",
      showApplication: "",
      showReligion: "",
      showGender: "",
      showPoliticalDistrict: "",
      exisingEmployee: 0,
      newEmployee: 0,
      totalEmployee: 0,
      applicantsProfiles: [],
      colorAvailGraph: [],
      colorsAvailApplication: [],
      colorsAvailGender: [],
      colorsAvailReligion: [],
      colorsAvailCongressionalDistrict: [],
      update: 0,
      randomNumberGenerate: [],
    };
  }

  generateRandomNumber = () => {
    return (Math.random() * (1 - 0.0) + 0.0).toFixed(3)
    /* INITIATE FIND A GOOD NUMBER THAT MATCHES THE COLOR ITSELF */
  }


  componentDidMount() {
    $('body').addClass('sidebar-mini');

    let chartData = this.state.data.state.applicantsProfiles
    this.showApplication(chartData)
    this.showMainDashboardReport(chartData)
    this.showGender(chartData)
    this.showReligion(chartData)
    this.showCongressionalDistrict(chartData)
    console.log("mounmt")

  }

  componentWillReceiveProps(nextProps, prevProps) {
    console.log(prevProps)
    console.log(nextProps)

    this.setState({
      data: nextProps,
      dataPrevious: prevProps,
      applicantsProfiles: nextProps,
    });

    this.showApplication(nextProps.state.applicantsProfiles)
    this.showMainDashboardReport(nextProps.state.applicantsProfiles)
    this.showGender(nextProps.state.applicantsProfiles)
    this.showReligion(nextProps.state.applicantsProfiles)
    this.showCongressionalDistrict(nextProps.state.applicantsProfiles)

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

    $(window).bind("resize", function () { myChart.resize() });
    myChart.update()

  }
  destroyChart = (ctx, dataChart, typeChart, optionsChart) => {
    var myChart = new Chart(ctx, {
      type: typeChart,
      data: dataChart,
      options: optionsChart
    });
    Chart.defaults.global.defaultFontSize = 16
    Chart.defaults.global.tooltips.titleFontSize = 12
    Chart.defaults.global.tooltips.titleFontColor = '#fff'


    myChart.destroy()

  }


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
    let randomColorResultApplication = []
    randomColorResultApplication.length = 0
    let floatStaticApplication = 0.00

    floatStaticApplication += 0.10
    var decider = d3.interpolateRdBu(floatStaticApplication)
    randomColorResultApplication.push(decider)

    floatStaticApplication += 0.80
    var decider = d3.interpolateRdBu(floatStaticApplication)
    randomColorResultApplication.push(decider)


    var ctx = document.getElementById('showApplication').getContext('2d');
    let dataChart = {
      labels: ['Exising Employees', 'Newly Registered Applicants'],
      datasets: [{
        label: '# of Employee',
        data: [currentlyEmployed, notEmployed],
        backgroundColor: randomColorResultApplication,
        borderColor: randomColorResultApplication,
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


    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(data) && data.length)) {
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }

    }

  }
  showMainDashboardReport = (data) => {
    let male = 0
    let female = 0
    data.forEach(element => {
      element.sex == "Male" ? male += 1 : female += 1
    });

    /* For getting 1st 15 days of the Month */
    var getDateResult = new Date();
    
    let daysDataDashboard = []
    daysDataDashboard.length=0
    //let addDays = 1
    for (let i = 1; i <= 5; i++) {
      let parseResult = new Date(getDateResult.setDate(getDateResult.getDay() + i))
      parseResult = parseResult.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      daysDataDashboard.push(parseResult)
    }


  /* For Coloring Selecting at least 3 */
  let randomColorResult = []
  let floatStaticReligion = 0.00
  for (let i = 0; i < 3; i++) {
    floatStaticReligion += 0.253
    var decider = d3.interpolateRainbow(floatStaticReligion)
    randomColorResult.push(decider)
  }
   
    var ctx = document.getElementById('showMainDashBoardReport').getContext('2d');
    let dataChart = {

      labels: daysDataDashboard,
      datasets: [
        {
          label: 'Existing',
          data: [10, 8,20,10,20,10],
          backgroundColor: randomColorResult[0]
       }, {
          label: 'NewEmployee',
          data: [10, 30,40,50,20,10],
          backgroundColor: randomColorResult[1]
       }, {
          label: 'Left',
          data: [40, 5,20,70,20,10],
          backgroundColor: randomColorResult[2]
       }
      ]

     
    }
    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,

      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
        
          ticks:{
            beginAtZero:true,
            suggestedMax: 400
          }
        }]
      },
      legend: {
        display: true,
        labels: {
          defaultFontSize: 14,
          fontColor: 'black'
          //fontColor: 'rgb(255, 99, 132)'
        }
      },
      title: {
        display: true,
        text: 'Test Graph'
      },
      responsive: true,

    }
    let type = 'bar'

    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(data) && data.length)) {
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }

    }



  }



  showGender = (data) => {
    let male = 0
    let female = 0
    data.forEach(element => {
      element.sex == "Male" ? male += 1 : female += 1
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

    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(data) && data.length)) {
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }

    }



  }


  showReligion = (data) => {
    let religion = []
    data.forEach(element => {
      element.religion_code !== null && element.religion_code !== "" ? religion.push(element.religion_code) : ''
    });
    let fileterReligion = [...new Set(religion)]


    /*FINDING TOTAL DATA OF EACH RELIGION */
    let countsReligionUnique = []
    data.forEach(function (element) {
      element.religion_code !== null && element.religion_code !== "" ?
        countsReligionUnique[element.religion_code] = (countsReligionUnique[element.religion_code] || 0) + 1 : ''

    })

    // var filtered = countsReligionUnique.filter(function (item) {
    //   return !(parseInt(item) == item);
    // });

    console.log(countsReligionUnique.join(","))

    var ctx = document.getElementById('showReligion').getContext('2d');

    /* Total length: filter  color: deciding../ */

    let randomColorResult = []
    let floatStaticReligion = 0.00
    for (let i = 0; i < fileterReligion.length; i++) {
      floatStaticReligion += 0.10
      var decider = d3.interpolateRainbow(floatStaticReligion)
      randomColorResult.push(decider)
    }

    let finalCountUniqueReligion = []
    for (let [key, value] of Object.entries(countsReligionUnique)) {
      finalCountUniqueReligion.push(value)
    }

    let dataChart = {
      labels: fileterReligion,
      fill: true,
      datasets: [{
        label: 'Religions',
        data: finalCountUniqueReligion,
        backgroundColor: randomColorResult,
        borderColor: randomColorResult,
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


    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(fileterReligion) && fileterReligion.length)) {
        console.log("niagi diri")
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }

    }


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
    console.log(data)
    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(data) && data.length)) {
        console.log("niagi diri")
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }

    }



  }


  render() {
    const { exisingEmployee, newEmployee } = this.state
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };

    return (
      <div className="wrapper">
        <AppHeader middleware={this.props.state} history={this.props.history} />
        <SideBar middleware={this.props.state} page="dashboard" />
        <div className="content-wrapper" style={contentMinHeight}>
          <section className="content-header">
            <h1 style={{ color: 'rgb(63,57,51)', fontSize: '20px' }}>
              <i className="fa fa-bar-chart"></i> Dashboard
              </h1>
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

              <div className="col-sm-12 col-lg-3 col-xs-6">

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

              <div className="col-sm-12 col-lg-3 col-xs-6">

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




            <section className="main dashboard">

              <div className="row">

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h3 className="box-title">As of Today Report</h3>

                      {/* <div className="box-tools pull-right">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                        </button>
                        <div className="btn-group">
                          <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-wrench"></i></button>
                          <ul className="dropdown-menu" role="menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                          </ul>
                        </div>
                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                      </div> */}
                    </div>



                    <div className="box-body">
                      <div className="row">
                        <div className="col-lg-8">
                          <canvas id="showMainDashBoardReport" className="chartjs" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                        </div>

                        <div className="col-lg-4">
                          <div className="progress-group">
                            <span className="progress-text">Total Ranking Left</span>
                            <span className="progress-number"><b>{100 - (newEmployee + exisingEmployee)}</b>/100</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-orange" style={{ width: "90%" }}></div>
                            </div>
                          </div>
                          <div className="progress-group">
                            <span className="progress-text">Total Augmentation Left</span>
                            <span className="progress-number"><b>{300 - (newEmployee + exisingEmployee)}</b>/300</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-aqua" style={{ width: "80%" }}></div>
                            </div>
                          </div>

                          <div className="progress-group">
                            <span className="progress-text">Emoployee's Left</span>
                            <span className="progress-number"><b>{400 - (newEmployee + exisingEmployee)}</b>/400</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-red" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                        </div>

                      </div>



                    </div>




                    <div className="box-footer">
                      <div className="row">
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            <h5 className="description-header">{newEmployee + exisingEmployee}</h5>
                            <span className="description-text">As of Total </span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            {/* <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span> */}
                            <h5 className="description-header">{newEmployee + exisingEmployee}</h5>
                            <span className="description-text">Left for Ranking </span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            {/* <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span> */}
                            <h5 className="description-header">{300 - (newEmployee + exisingEmployee)}</h5>
                            <span className="description-text">Left for Augmentation</span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block">
                            {/* <span className="description-percentage text-red"><i className="fa fa-caret-down"></i> 18%</span> */}
                            <h5 className="description-header">{400 - (newEmployee + exisingEmployee)}</h5>
                            <span className="description-text">Total Exmployee Left</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>

              </div>





            </section>














            <section className="Graph">
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12" >
                  <div className="row">
                    <div className="col-md-12">
                      <h3>
                        <p className="text-center">
                          <strong>Employee's Information Report</strong>
                        </p>
                      </h3>
                    </div>
                  </div>
                  <div className="row">

                    <div className="col-sm-12 col-md-6 col-lg-6 " >

                      <div className="box box-primary">
                        <div className="box-header with-border"  >
                          <h4><label>Application</label></h4>
                        </div>
                        <div className="box-body no-padding">
                          <canvas id="showApplication" className="chartjs" style={{ display: "block", width: "100 ", height: "100" }}></canvas>
                        </div>
                        <div className="box-footer">
                          <label>Total:<span style={{ color: "green" }}> {exisingEmployee + newEmployee + " " + converter.toWords(exisingEmployee + newEmployee)}</span></label>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="box box-primary">
                        <div className="box-header with-border">
                          <h4><label> Gender</label></h4>
                        </div>
                        <div className="box-body no-padding">
                          <canvas id="showGender" className="chartjs" style={{ display: "block", width: "100", height: "100" }}></canvas>
                        </div>
                        <div className="box-footer">

                          <label>Total:<span style={{ color: "green" }}> {exisingEmployee + newEmployee + " " + converter.toWords(exisingEmployee + newEmployee)}</span></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" >
                    <div className="col-sm-12 col-md-6 col-lg-6" >
                      <div className="box box-primary">
                        <div className="box-header with-border">
                          <h4><label> Religion</label></h4>
                        </div>
                        <div className="box-body no-padding">
                          <canvas id="showReligion" className="chartjs" style={{ display: "block", width: "100", height: "100" }}></canvas>
                        </div>
                        <div className="box-footer">
                          <label>Total:<span style={{ color: "green" }}> {exisingEmployee + newEmployee + " " + converter.toWords(exisingEmployee + newEmployee)}</span></label>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6" >
                      <div className="box box-primary">
                        <div className="box-header with-border">
                          <h4><label> Congressional District</label> <button className="btn btn-primary">Show More</button></h4>
                        </div>

                        <div className="box-body no-padding">
                          <canvas id="showCongressionalDistrict" className="chartjs" style={{ display: "block", width: "100", height: "100" }}></canvas>
                        </div>
                        <div className="box-footer">
                          <label>Total:<span style={{ color: "green" }}> {exisingEmployee + newEmployee + " " + converter.toWords(exisingEmployee + newEmployee)}</span></label>
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

        {/* MODAL FOR POLITICAL DISTRICT */}













      </div >
    );

  }
}
