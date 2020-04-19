import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';
import DatePicker from "react-datepicker";
import {
  Tabs, Tab
} from "react-bootstrap";
import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';
import { element } from 'prop-types';

var converter = require('number-to-words');
var Chart = require('chart.js');

var d3 = require('d3-scale-chromatic')
var moment = require('moment');

//Component

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props,
      dataPrevious: props,
      showMainDashBoardReport: "",
      showApplication: "",
      showAgeParticipation: "",
      showPoliticalDistrict: "",
      showCongressionalDistrict: "",
      showAugmentationRankingReport: "",
      showAugmentationReport: "",
      showRankingReport: "",
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
      totalRankingFilled: 0,
      progressBarRanking: 0.00,
      progressBarAugmentation: 0.00,
      progressBarRanking: 0.00,
      stackedOptions: [],
      reactTableGroupings: [],
      fromDate: new Date(),
      toDate: new Date(),
      dateCounter: 0,
      booleanDateClose: false,
      updateData: "no",
      selectDefaultValue: "",
      groupRecord: [],
      dateRangeRecord: [],
      yearFiltered: [],
      yearDefaultLast: [],
      yearSelected: "",
      yeargraphSelected: "",
      onLoad: 0,
      baseGroupData: "",
      baseGroupDataNOTCHANGED: "",
      baseGroupDidMount: [],

    };
  }

  componentDidMount() {
    $('body').addClass('sidebar-mini');

    let chartData = this.state.data.state.applicantsProfiles
    let chartApplicationData = this.state.data.state.application
    let chartSettings = this.state.data.state.settings
    console.log(chartSettings[chartSettings.length - 1])
    let baseGroup = chartSettings[chartSettings.length - 1].id ? chartSettings[chartSettings.length - 1].id : ""
    let baseGroupName = chartSettings[chartSettings.length - 1].groupings ? chartSettings[chartSettings.length - 1].groupings : ""
   
    let baseData = []

    //groupname Basis
    chartApplicationData.forEach(element1 => {
      if (element1.groupings_id == baseGroup) {
        chartData.forEach(element2 => {
          if (element1.profile_code == element2.code) {
            baseData.push(element2)
          }
        })
      }

    })

    this.setState({
      baseGroupDataNOTCHANGED: baseGroupName,
      baseGroupData: baseGroup,
      baseGroupDidMount: baseData,
      baseGroupData: baseGroupName,
      
    });
    this.showApplication(baseData)
    this.showAgeParticipation(baseData)
    this.showMainDashboardReport(baseData)
    this.showAugmentationRankingReport(chartApplicationData)
    this.showCongressionalDistrict(baseData)
    this.showPoliticalDistrict(baseData)
  }

  componentWillReceiveProps(nextProps, prevProps) {

    let chartData = nextProps.state.applicantsProfiles
    let chartApplicationData = nextProps.state.application
    let chartSettings = nextProps.state.settings
    let baseGroup = chartSettings[chartSettings.length - 1].id
    let baseData = []
    let baseGroupName = chartSettings[chartSettings.length - 1].groupings ? chartSettings[chartSettings.length - 1].groupings : ""
   


    chartApplicationData.forEach(element1 => {
      if (element1.groupings_id == baseGroup) {
        chartData.forEach(element2 => {
          if (element1.profile_code == element2.code) {
            baseData.push(element2)
          }
        })
      }

    })
    this.setState({
      baseGroupDataNOTCHANGED: baseGroupName,
      data: nextProps,
      dataPrevious: prevProps,
      applicantsProfiles: nextProps,
      baseGroupData: baseGroupName,
      baseGroupDidMount: baseData
    });


    this.showApplication(baseData)
    this.showMainDashboardReport(baseData)
    this.showAugmentationRankingReport(nextProps.state.application)
    this.showAgeParticipation(baseData)
    this.showCongressionalDistrict(baseData)
    this.showPoliticalDistrict(baseData)

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
    myChart.destroy()

  }


  showApplication = (data, updateData) => {
    let currentlyEmployed = 0
    let notEmployed = 0
    data.forEach(element => {
      element.employee_number ? currentlyEmployed += 1 : notEmployed += 1
    });
    let dateApplication = []
    data.forEach(element => {
      element.created_at ? dateApplication.push(element.created_at) : ""
    });
    //console.log(dateApplication)
    this.setState({
      newEmployee: notEmployed,
      exisingEmployee: currentlyEmployed
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
        let chart = this.state.showApplication
        if (chart != "") {
          chart.data.datasets[0].data = [currentlyEmployed, notEmployed]
          chart.update()
        }
        else {
          var myChartpie = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showApplication: myChartpie
          })
          $(window).bind("resize", function () { myChartpie.resize() });
          myChartpie.update()
        }
      }
      else {
        let chart = this.state.showApplication
        if (chart != "") {
          chart.data.datasets[0].data = [currentlyEmployed, notEmployed]
          chart.update()
        }

      }
    }
  }
  showMainDashboardReport = (data) => {


    let daysDataDashboard = []
    daysDataDashboard.length = 0


    let uniqueDays = []
    data.forEach(element => {
      uniqueDays.push(moment(element.created_at).format("MMMM DD,YYYY"))
    })
    let unique = [...new Set(uniqueDays)]

    //Get first 5 (last) days
    let first5days = []
    for (let i = unique.length - 1, j = 1; ; i--, j++) {
      if (unique[i] == undefined) {
      }
      else {
        first5days.push(unique[i])
      }

      if (j == 5) {
        break
      }
    }
    let resultUnique = (first5days.reverse())

    let countUniqueData = []
    let countExistingData = []
    let countNewData = []


    //For PreExisting DATA
    for (let i = 0; i < resultUnique.length; i++) {
      data.forEach(element => {
        if (moment(element.created_at).format("MMMM DD,YYYY") == resultUnique[i]) {
          if (element.employee_number == null || element.employee_number == "") {
            countNewData.push([moment(element.created_at).format("MMMM DD,YYYY"), 0])
          }
          else {
            countNewData.push([moment(element.created_at).format("MMMM DD,YYYY"), 1])
          }

        }

      });
    }

    //TESTING VALUES STACKED BAR GRAPH
    let test = []
    let obj = []
    let uniqueArrays = []

    countNewData.forEach(val => {
      if (test.indexOf(val.toString()) == -1) {
        test.push(val.toString());
        obj[val.toString()] = 1;
        uniqueArrays.push(val);
      } else {
        obj[val.toString()] += 1;

      }

    })
    //let theCount = [Object.keys(obj),Object.values(obj)];

    let finalbase = []
    let finalvalue0 = []
    let finalvalue1 = []
    for (let [key, value] of Object.entries(obj)) {
      finalbase.push([key.slice(0, -2), key.slice(-1), value])
    }

    for (let i = 0; i < resultUnique.length; i++) {
      let repeat = 0
      for (let j = 0; j < finalbase.length; j++) {
        if (resultUnique[i] == finalbase[j][0]) {
          repeat += 1
          if (finalbase[j][1] == "0") {
            finalvalue0.push(finalbase[j][2])

          }
          else if (finalbase[j][1] == "1") {
            finalvalue1.push(finalbase[j][2])

          }
        }
      }
      if (repeat == 1) {
        if (finalvalue0.length < finalvalue1.length) {
          finalvalue0.push(0)
        }
        else if (finalvalue1.length < finalvalue0.length)
          finalvalue1.push(0)

      }
    }

    //The employee left finalvalue0 or finalvalue1 length

    //Increasing Total of finalValue 0 and 1
    let preExistingData = uniqueDays.length - countNewData.length
    let incrementalValue1 = []
    let incrementalValue0 = []
    let total0 = preExistingData
    let total1 = preExistingData

    for (let i = 0; i < finalvalue0.length; i++) {
      total0 += finalvalue0[i]
      total1 += finalvalue1[i]
      incrementalValue0.push(total0)
      incrementalValue1.push(total1)
    }
    let resultLeft = []
    // let empTotal = 400
    // for (let i = 0; i < incrementalValue0.length; i++) {
    //   //empTotal-=
    //   resultLeft.push(400 - (incrementalValue0[i] + incrementalValue1[i]))
    // }

    /* DEFAULT 5 DAYS  NO VALIDATION YET*/
    for (let i = 4; i >= 0; i--) {
      let parseResult = moment().subtract(i, 'days')
      parseResult = parseResult.format("MMMM DD,YYYY")
      // parseResult = parseResult
      daysDataDashboard.push(parseResult)
    }

    /* For Coloring Selecting at least 3 */
    let randomColorResult = []
    let floatStaticDashboard = 1.00
    for (let i = 0; i < 3; i++) {
      floatStaticDashboard -= 0.25
      var decider = d3.interpolateRainbow(floatStaticDashboard)
      randomColorResult.push(decider)
    }

    var ctx = document.getElementById('showMainDashBoardReport').getContext('2d');
    let dataChart = {

      labels: resultUnique,
      datasets: [
        {
          label: 'Newly Applicant',
          data: incrementalValue0,
          backgroundColor: randomColorResult[0]
        }, {
          label: 'Existing',
          data: incrementalValue1,
          backgroundColor: randomColorResult[1]
        }
      ]
    }
    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,tooltips: {
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },

      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,

          ticks: {
            beginAtZero: true,
            precision: 0,
            //suggestedMax: 400
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
        text: `Live Test Incremental 5 days Graph`
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

  showAgeParticipation = (data) => {
    let baseYear = new Date()
    baseYear = (baseYear.getFullYear())
    let male = 0
    let female = 0
    // data.forEach(element => {
    //   element.sex == "Male" ? male += 1 : female += 1
    // });
    let birthdates = []
    let category1 = 0
    let category2 = 0
    let category3 = 0
    let category4 = 0
    let category5 = 0
    let category6 = 0
    data.forEach(element => {
      let age_employee = baseYear - parseInt(moment(element.birth_date).format('YYYY'))

      if (age_employee >= 18 && age_employee <= 20) {
        category1 += 1
      }
      else if (age_employee >= 21 && age_employee <= 30) {
        category2 += 1
      }
      else if (age_employee >= 31 && age_employee <= 40) {
        category3 += 1
      }
      else if (age_employee >= 41 && age_employee <= 50) {
        category4 += 1
      }

      else if (age_employee >= 51 && age_employee <= 60) {
        category5 += 1
      }

      else if (age_employee >= 61) {
        category6 += 1
      }

    });
    let randomColorResult = []
    let floatStaticAge = 0.00
    for (let i = 0; i < 6; i++) {
      floatStaticAge += 0.144
      var decider = d3.interpolateRainbow(floatStaticAge)
      randomColorResult.push(decider)
    }

    let defaultlabels = ['18-20 years old', '21-30 years old', '31-40 years old', '41-50 years old', '51-60 years old', '61 years old & above']
    let defaultdata = [category1, category2, category3, category4, category5, category6]

    // let finalDataAge = []

    // for (let i = 0; i < 6; i++) {

    //   var newObj = {
    //     label: defaultlabels[i],
    //     data: defaultdata[i],
    //     backgroundColor: randomColorResult[i],
    //   }
    //     finalDataAge.push(newObj)
    // }
    // console.log(finalDataAge)
    // console.log(defaultdata)

    var ctx = document.getElementById('showAgeParticipation').getContext('2d');
    let dataChart = {
      labels: defaultlabels,
      fill: true,
      datasets: [{
        label: 'Found',
        data: defaultdata,
        backgroundColor: randomColorResult,
        borderColor: randomColorResult,
        borderWidth: 1,
        borderColor: '#fff'
      }]
    }
    let options = {
      legend: {
        display: false,
        labels: {
          // This more specific font property overrides the global property

          defaultFontSize: 14,
          fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0,
            suggestedMax: 10,
            // userCallback: function(label, index, labels){
            //   if(Math.floor(label) === label){
            //     return label
            //   }
            // }
          }
        }]
      },
      responsive: true,


    }
    let type = 'horizontalBar'

    if (this.state.data !== this.state.dataPrevious) {
    }
    else {
      if ((Array.isArray(data) && data.length)) {
        let chart = this.state.showAgeParticipation
        if (chart != "") {

          chart.data.datasets[0].data = defaultdata
          chart.update()
        }
        else {
          var myChartHorizontal = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showAgeParticipation: myChartHorizontal
          })
          $(window).bind("resize", function () { myChartHorizontal.resize() });
          myChartHorizontal.update()
        }

      }
      else {
        let chart = this.state.showAgeParticipation
        if (chart != "") {

          chart.data.datasets[0].data = defaultdata
          chart.update()
        }
      }
    }
  }

  showAugmentationRankingReport = (data, yearselected, load) => {
    let profilesData = this.state.data.state.applicantsProfiles
    let application_data = data
    let settingstYearData = []
    let yearThisFunction = []
    let filteredAllYear = []
    let yearFilteredThisFunction = ""
    let defaultYear = ""
    let settings_data = this.state.data.state.settings
    if (load != "yes") {
      // settings_data = this.state.data.state.settings

      //INITAL SHOWING last GROUP AND PRESENT YEAR through Settings based


      settings_data.forEach(element => {
        if (moment(new Date()).format("YYYY") == moment(element.created_at).format("YYYY")) {
          yearThisFunction.push(moment(element.created_at).format("YYYY"))
        }
        settingstYearData.push(moment(element.created_at).format("YYYY"))
      })

      filteredAllYear = [...new Set(settingstYearData)]

      yearFilteredThisFunction = [...new Set(yearThisFunction)]

      defaultYear = filteredAllYear[filteredAllYear.length - 1]

      this.setState({
        yearFiltered: filteredAllYear.reverse(),
        yearDefaultLast: defaultYear,
        yeargraphSelected: defaultYear,
      })
    }
    else if (load == "yes") {
      yearFilteredThisFunction = yearselected
    }

    let summaryApplication = []
    data.forEach(element => {
      if ((element.groupings_id !== null) && (element.groupings_id !== "")) {
        if (moment(element.created_at).format("YYYY") == yearFilteredThisFunction) {
          summaryApplication.push(element.groupings_id)
        }
      }

    });
    let finalGroup = []
    summaryApplication.forEach(element1 => {
      settings_data.forEach(element2 => {
        if (element1 == element2.id) {
          finalGroup.push(element2.groupings)
        }
      })
    })
    let filteredGroup = [...new Set(finalGroup)]
    let filteredApplication = [...new Set(summaryApplication)]
    let countFilteredRevolving = []
    let countFilteredAugmentation = []
    for (let i = 0; i < filteredApplication.length; i++) {
      data.forEach(element => {
        if (filteredApplication[i] == element.groupings_id && element.category == "Revolving") {
          countFilteredRevolving[element.groupings_id] = (countFilteredRevolving[element.groupings_id] || 0) + 1
        }
        else if (filteredApplication[i] == element.groupings_id && element.category == "Augmentation") {
          countFilteredAugmentation[element.groupings_id] = (countFilteredRevolving[element.groupings_id] || 0) + 1
        }
      })
    }


    let finalCountRevolving = []
    let finallabelRevolving = []
    for (let [key, value] of Object.entries(countFilteredRevolving)) {
      finallabelRevolving.push(key)
      finalCountRevolving.push(value)
    }
    let finalCountAugmentation = []
    let finallabelAugmentation = []

    for (let [key, value] of Object.entries(countFilteredAugmentation)) {
      finallabelAugmentation.push(key)
      finalCountAugmentation.push(value)
    }

    //CHECKING IF REVOLVING AND AUGMENTATION MONTHS HAS A VALUE OF NONE AND MUST BE REFILL

    for (let i = 0; i < filteredApplication.length; i++) {
      if (filteredApplication[i] != finallabelRevolving[i]) {
        finalCountRevolving.splice(i, 0, 0)
        finallabelRevolving.splice(i, 0, filteredApplication[i])
      }
      if (filteredApplication[i] != finallabelAugmentation[i]) {
        finalCountAugmentation.splice(i, 0, 0)
        finallabelAugmentation.splice(i, 0, filteredApplication[i])
      }
    }
   
    //THE FILERED APPLICATION RESULT SHOULD BE ADDED TO DROP DOWN SELECT ATTRIBUTE

    let randomColorResult = []
    let floatStaticRankingAugmentation = 0.00
    for (let i = 0; i < 3; i++) {
      floatStaticRankingAugmentation += 0.235
      var decider = d3.interpolateRainbow(floatStaticRankingAugmentation)
      randomColorResult.push(decider)
    }

    //SUMMARY DATA FOR THE REACTABLE FOR GROUPINGS 
    let tempReactData = []
    for (let i = 0; i < filteredApplication.length; i++) {

      let objData2 = {
        group: filteredGroup[i],
        name: "Augmentation",
        data: finalCountAugmentation[i]
      }
      tempReactData.push(objData2)

      let objData1 = {
        group: filteredGroup[i],
        name: "Revolving",
        data: finalCountRevolving[i],

      }
      tempReactData.push(objData1)
    }


    let lastFilteredData = filteredApplication[filteredApplication.length - 1]
    this.setState({
      stackedOptions: filteredApplication,
      selectDefaultValue: lastFilteredData,
      reactTableGroupings: tempReactData
    })

    //CALLING THE AUGMENTATION GRAPH REPORT AND RANKING GRAPH REPORT



    var ctx = document.getElementById('showAugmentationRankingReport').getContext('2d');
    let dataChart = {

      labels: filteredGroup,
      datasets: [
        {
          label: 'Total Augmentation Filtered',
          fill: false,
          data: finalCountAugmentation,
          backgroundColor: randomColorResult[1],
          borderColor: randomColorResult[1]
        }, {
          label: 'Total Revolving Filtered',
          fill: false,
          data: finalCountRevolving,
          backgroundColor: randomColorResult[0],
          borderColor: randomColorResult[0]
        },
      ]
    }
    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,tooltips: {
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },

      scales: {

        yAxes: [{


          ticks: {
            beginAtZero: true,
            precision: 0,
            //suggestedMax: 100
            //suggestedMax: 400
          }
        }]
      },
      legend: {
        display: true,
        position: 'top',
        onClick: (e) => e.stopPropagation(),
        labels: {
          defaultFontSize: 14,
          fontColor: 'black'
          //fontColor: 'rgb(255, 99, 132)'
        }
      },
      title: {
        display: true,
        text: 'Yearly Statistics Report'
      },
      responsive: true,

    }
    let type = 'line'
    if (this.state.data !== this.state.dataPrevious) {
      console.log("state data is not equal to data previous")
      //NEEDS TO BE OBSERVED IF IT CAUSES BUG ...
      //this.createChart(ctx, dataChart, type, options)
    }
    else {
      if ((Array.isArray(data) && data.length)) {
        this.showAugmentationReport(filteredGroup, finallabelAugmentation, finalCountAugmentation, randomColorResult[1])
        this.showRankingReport(filteredGroup, finallabelRevolving, finalCountRevolving, randomColorResult[0])


        let chart = this.state.showAugmentationRankingReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
        else {
          var myChartLine = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showAugmentationRankingReport: myChartLine
          })
          $(window).bind("resize", function () { myChartLine.resize() });
          myChartLine.update()
        }

      }
      else {
        let chart = this.state.showAugmentationRankingReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
      }
    }
  }

  showAugmentationReport = (filteredApplication, filteredAugmentationlabel, finalCountAugmentation, color) => {
    let randomColorResult = []
    let floatStaticAugmentation = 0.00
    for (let i = 0; i < 3; i++) {
      floatStaticAugmentation += 0.289
      var decider = d3.interpolateRainbow(floatStaticAugmentation)
      randomColorResult.push(decider)
    }
    var ctx = document.getElementById('showAugmentationReport').getContext('2d');
    let dataChart = {

      labels: filteredApplication,
      datasets: [
        // {
        //   label: 'Total Revolving Filtered',
        //   fill: false,
        //   data: finalCountRevolving,
        //   backgroundColor: randomColorResult[0],
        //   borderColor: randomColorResult[0]
        // }
        {
          label: 'Total Augmentation Filtered',
          fill: false,
          data: finalCountAugmentation,
          backgroundColor: color,
          borderColor: color
        }
      ]
    }
    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,tooltips: {
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0,
            //suggestedMax: 400
          }
        }]
      },
      legend: {
        display: true,
        onClick: (e) => e.stopPropagation(),
        labels: {
          defaultFontSize: 14,
          fontColor: 'black'
          //fontColor: 'rgb(255, 99, 132)'
        }
      },
      title: {
        display: true,
        text: 'Yearly Statistics Augmentation Report'
      },
      responsive: true,

    }
    let type = 'line'

    if (this.state.data !== this.state.dataPrevious) {
      console.log("state data is not equal to data previous")
      //NEEDS TO BE OBSERVED IF IT CAUSES BUG ...
      //this.createChart(ctx, dataChart, type, options)
    }
    else {
      if ((Array.isArray(finalCountAugmentation) && finalCountAugmentation.length)) {

        let chart = this.state.showAugmentationReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
        else {
          var myChartLineAugmentation = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showAugmentationReport: myChartLineAugmentation
          })
          $(window).bind("resize", function () { myChartLineAugmentation.resize() });
          myChartLineAugmentation.update()
        }
      }
      else {
        let chart = this.state.showAugmentationReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
      }
    }


  }


  showRankingReport = (filteredApplication, filteredRevolvinglabel, finalCountRevolving, color) => {
    var ctx = document.getElementById('showRankingReport').getContext('2d');
    let dataChart = {

      labels: filteredApplication,
      datasets: [
        {
          label: 'Total Revolving Filtered',
          fill: false,
          data: finalCountRevolving,
          backgroundColor: color,
          borderColor: color,
        }
      ]
    }
    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,tooltips: {
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0,
            //suggestedMax: 400
          }
        }]
      },
      legend: {
        display: true,
        onClick: (e) => e.stopPropagation(),
        labels: {
          defaultFontSize: 14,
          fontColor: 'black'
          //fontColor: 'rgb(255, 99, 132)'
        }
      },
      title: {
        display: true,
        text: 'Yearly Statistics Revolving Report'
      },
      responsive: true,
    }
    let type = 'line'

    if (this.state.data !== this.state.dataPrevious) {
      console.log("state data is not equal to data previous")
      //NEEDS TO BE OBSERVED IF IT CAUSES BUG ...
      // this.createChart(ctx, dataChart, type, options)
    }
    else {
      if ((Array.isArray(finalCountRevolving) && finalCountRevolving.length)) {
        let chart = this.state.showRankingReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
        else {
          var myChartLineRanking = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showRankingReport: myChartLineRanking
          })
          $(window).bind("resize", function () { myChartLineRanking.resize() });
          myChartLineRanking.update()
        }
      }
      else {
        let chart = this.state.showRankingReport
        if (chart != "") {
          chart.data = dataChart
          chart.update()
        }
      }
    }


  }



  // showReligion = (data) => {
  //   let religion = []
  //   data.forEach(element => {
  //     element.religion_code !== null && element.religion_code !== "" ? religion.push(element.religion_code) : ''
  //   });
  //   let fileterReligion = [...new Set(religion)]


  //   /*FINDING TOTAL DATA OF EACH RELIGION */
  //   let countsReligionUnique = []
  //   data.forEach(function (element) {
  //     element.religion_code !== null && element.religion_code !== "" ?
  //       countsReligionUnique[element.religion_code] = (countsReligionUnique[element.religion_code] || 0) + 1 : ''

  //   })

  //   // var filtered = countsReligionUnique.filter(function (item) {
  //   //   return !(parseInt(item) == item);
  //   // });

  //   var ctx = document.getElementById('showReligion').getContext('2d');

  //   /* Total length: filter  color: deciding../ */

  //   let randomColorResult = []
  //   let floatStaticReligion = 0.00
  //   for (let i = 0; i < fileterReligion.length; i++) {
  //     floatStaticReligion += 0.10
  //     var decider = d3.interpolateRainbow(floatStaticReligion)
  //     randomColorResult.push(decider)
  //   }

  //   let finalCountUniqueReligion = []
  //   for (let [key, value] of Object.entries(countsReligionUnique)) {
  //     finalCountUniqueReligion.push(value)
  //   }

  //   let dataChart = {
  //     labels: fileterReligion,
  //     fill: true,
  //     datasets: [{
  //       label: 'Religions',
  //       data: finalCountUniqueReligion,
  //       backgroundColor: randomColorResult,
  //       borderColor: randomColorResult,
  //       borderWidth: 2,
  //       borderColor: '#fff'
  //     }]
  //   }

  //   let options = {
  //     legend: {
  //       labels: {
  //         // This more specific font property overrides the global property
  //         defaultFontSize: 14,
  //         fontColor: 'black'
  //       }
  //     },
  //     responsive: true,

  //   }

  //   let type = 'polarArea'

  //   if (this.state.data !== this.state.dataPrevious) {
  //   }
  //   else {
  //     if ((Array.isArray(fileterReligion) && fileterReligion.length)) {
  //       this.destroyChart(ctx, dataChart, type, options)
  //       this.createChart(ctx, dataChart, type, options)
  //     }
  //     else {
  //     }
  //   }
  // }

  showCongressionalDistrict = (data) => {

    let congressional1 = 0
    let congressional2 = 0
    let congressional3 = 0

    data.forEach(element => {
      element.congressional_district == "1" ? congressional1 += 1 :
        element.congressional_district == "2" ? congressional2 += 1 :
          element.congressional_district == "3" ? congressional3 += 1 : ""

    });

    /* For Coloring Selecting at least 3 */
    let randomColorResult = []
    let floatStaticDashboard = 1.00
    for (let i = 0; i < 3; i++) {
      floatStaticDashboard -= 0.338
      var decider = d3.interpolateRainbow(floatStaticDashboard)
      randomColorResult.push(decider)
    }

    var ctx = document.getElementById('showCongressionalDistrict').getContext('2d');
    let dataChart = {
      labels: ['District 1', 'District 2', 'District 3'],
      datasets: [{
        label: 'No. of District filtered',
        data: [congressional1, congressional2, congressional3],
        backgroundColor: randomColorResult,
        borderColor: randomColorResult,
        borderWidth: 2,
        borderColor: '#fff'
      }]
    }

    let options = {

      legend: {
        display: false,
        labels: {

          // This more specific font property overrides the global property
          defaultFontSize: 14,
          fontColor: 'black'
        }
      },

      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0,
            // userCallback: function(label, index, labels){
            //   if(Math.floor(label) === label){
            //     return label
            //   }
            // }
          }
        }]
      },
      responsive: true,

    }
    let type = 'bar'
    if (this.state.data !== this.state.dataPrevious) {

    }
    else {
      if ((Array.isArray(data) && data.length)) {
        let chart = this.state.showCongressionalDistrict
        if (chart != "") {

          chart.data.datasets[0].data = [congressional1, congressional2, congressional3]
          chart.update()
        }
        else {
          var myChartbar = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showCongressionalDistrict: myChartbar
          })
          $(window).bind("resize", function () { myChartbar.resize() });
          myChartbar.update()
        }
      }
      else {
        let chart = this.state.showCongressionalDistrict
        if (chart != "") {

          chart.data.datasets[0].data = [congressional1, congressional2, congressional3]
          chart.update()
        }
      }
    }



  }
  showModalViewPoliticalDistrict = () => {
    $('#modal-show-politicalDistrict').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    })

  }
  showPoliticalDistrict = (data) => {

    let politicalDistrict1Container = []
    let politicalDistrict2Container = []
    let politicalDistrict3Container = []

    let politicalDistrict1Value = []
    let politicalDistrict2Value = []
    let politicalDistrict3Value = []

    let finalCountLength = politicalDistrict1Value.length + politicalDistrict2Value.length + politicalDistrict3Value.length

    let countsReligionUnique = []
    data.forEach(function (element) {
      element.religion_code !== null && element.religion_code !== "" ?
        countsReligionUnique[element.religion_code] = (countsReligionUnique[element.religion_code] || 0) + 1 : ''

    })
    let countPolicalDistrict1Unique = []

    let countPolicalDistrict2Unique = []

    let countPolicalDistrict3Unique = []
    data.forEach(element => {
      element.congressional_district == "1" ? countPolicalDistrict1Unique[element.political_district] = (countPolicalDistrict1Unique[element.political_district] || 0) + 1 :
        element.congressional_district == "2" ? countPolicalDistrict2Unique[element.political_district] = (countPolicalDistrict2Unique[element.political_district] || 0) + 1 :
          element.congressional_district == "3" ? countPolicalDistrict3Unique[element.political_district] = (countPolicalDistrict3Unique[element.political_district] || 0) + 1 : ""

    });


    data.forEach(element => {
      element.congressional_district == "1" ? politicalDistrict1Container.push(element.political_district) :
        element.congressional_district == "2" ? politicalDistrict2Container.push(element.political_district) :
          element.congressional_district == "3" ? politicalDistrict3Container.push(element.political_district) : ""

    });
    let filterPoliticalDistrict1 = [...new Set(politicalDistrict1Container)]

    let filterPoliticalDistrict2 = [...new Set(politicalDistrict2Container)]

    let filterPoliticalDistrict3 = [...new Set(politicalDistrict3Container)]

    let finalCountUniquePoliticalDistric1 = []

    let finalCountUniquePoliticalDistric2 = []

    let finalCountUniquePoliticalDistric3 = []
    for (let [key, value] of Object.entries(countPolicalDistrict1Unique)) {
      finalCountUniquePoliticalDistric1.push([value, 0, 0])
    }
    for (let [key, value] of Object.entries(countPolicalDistrict2Unique)) {
      finalCountUniquePoliticalDistric2.push([0, value, 0])
    }
    for (let [key, value] of Object.entries(countPolicalDistrict3Unique)) {
      finalCountUniquePoliticalDistric3.push([0, 0, value])
    }

    let combinedArray1 = finalCountUniquePoliticalDistric1.concat(finalCountUniquePoliticalDistric2)
    let combinedArray2 = combinedArray1.concat(finalCountUniquePoliticalDistric3)

    let combinedArrayLabel1 = filterPoliticalDistrict1.concat(filterPoliticalDistrict2)
    let combinedArrayLabel2 = combinedArrayLabel1.concat(filterPoliticalDistrict3)

    let randomColorResult = []
    let floatStaticDashboard = 0.000
    let counterAdd = 0.038
    for (let i = 0; i < 100; i++) {
      floatStaticDashboard += (0.040 + counterAdd)
      var decider = d3.interpolateRainbow(floatStaticDashboard)
      randomColorResult.push(decider)
    }

    let finalData = []
    if (combinedArray2.length != 0) {
      for (let i = 0; i < combinedArrayLabel2.length; i++) {

        var newObj = {
          label: combinedArrayLabel2[i],
          data: combinedArray2[i],
          backgroundColor: randomColorResult[i],
        }
        finalData.push(newObj)
      }
    }

    /* For Coloring Selecting at least 3 */


    // ANG MALI KAY WALA NA IMPLEMENT ANG POLITICAL DISTRICT
    var ctx = document.getElementById('showPoliticalDistrict').getContext('2d');
    let dataChart = {

      labels: ["District 1", "District 2", "District 3"],
      datasets: finalData,
      borderWidth: 2,
      borderColor: '#fff'
    }

    let options = {
      // rotation: 1 * Math.PI,
      // circumference: 1 * Math.PI,

      legend: {
        display: false,
        labels: {
          defaultFontSize: 14,
          fontColor: 'black'
          //fontColor: 'rgb(255, 99, 132)'
        }
      },

      scales: {
        // xAxes: [{
        //   stacked: true
        // }],
        yAxes: [{

          //stacked: true,
          ticks: {
            beginAtZero: true,
            precision: 0,
          }
        }]
      },
      title: {
        display: true,
        text: 'Political District'
      },
      responsive: true,

    }
    let type = 'bar'

    if (this.state.data !== this.state.dataPrevious) {
    }
    else {
      if ((Array.isArray(data) && data.length)) {
        let chart = this.state.showPoliticalDistrict
        if (chart != "") {

          chart.data.datasets = finalData
          chart.update()
        }
        else {
          var myChartbardynamic = new Chart(ctx, {
            type: type,
            data: dataChart,
            options: options
          });
          Chart.defaults.global.defaultFontSize = 16
          Chart.defaults.global.tooltips.titleFontSize = 12
          Chart.defaults.global.tooltips.titleFontColor = '#fff'
          this.setState({
            showPoliticalDistrict: myChartbardynamic
          })
          $(window).bind("resize", function () { myChartbardynamic.resize() });
          myChartbardynamic.update()
        }
      }
      else {
        let chart = this.state.showPoliticalDistrict
        if (chart != "") {

          chart.data.datasets = finalData
          chart.update()
        }
      }
    }
  }

  //OUT OF GRAPH

  buildOptions(data) {
    let arr = []; //this.state.stackedOptions

    let defaultData = ""
    data = this.state.yearDefaultLast

    let settingsData = this.state.data.state.settings
    let resultYearData = []
    settingsData.forEach(element => {
      if (moment(data).format("YYYY") == moment(element.created_at).format("YYYY")) {
        resultYearData.push(element.groupings)
      }


    })
    let copyState = resultYearData
    let defaultnone = ""
    for (let i = 0; i < copyState.length; i++) {
      // DIRI MAG  <option selected="selected"> </option> para default sa latest month makuha
      if(i == 0){
        arr.push(<option key={-1} value={""} ></option>)
      }

      if (i == copyState.length - 1) {
        arr.push(<option key={i} value={copyState[i]} >{copyState[i]}</option>)
        defaultData = copyState[i]

      }
      else {
        arr.push(<option key={i} value={copyState[i]}>{copyState[i]}</option>)
      }
    }
    // this.setState({
    //   selectDefaultValue: defaultData
    // }) cannot setState on return function///
    return arr;

  }
  buildYearOptions = () => {

    let result = [];
    let copyState = this.state.yearFiltered
    let defaultData = ""
    for (let i = 0; i < copyState.length; i++) {
      // DIRI MAG  <option selected="selected"> </option> para default sa latest month makuha


      if (i == copyState.length - 1) {
        result.push(<option key={i} value={copyState[i]} >{copyState[i]}</option>)

      }
      else {
        result.push(<option key={i} value={copyState[i]}>{copyState[i]}</option>)
      }
    }

    this.buildOptions(this.state.yearDefaultLast)
    //this.groupSelectedYear.bind(this)

    // this.setState({
    //   selectDefaultValue: defaultData
    // })
    return result;

  }




  groupSelectedYear = (e) => {
    let yearselected = (e.target.value)
    let settingsData = this.state.data.state.settings
    let data = this.state.data.state.application
    let resultYearData = []
    this.setState({
      yearDefaultLast: yearselected

    })
    settingsData.forEach(element => {
      if (yearselected == moment(element.created_at).format("YYYY")) {
        resultYearData.push(element.groupings)
      }


    })
    // showAugmentationRankingReport: "",
    // showAugmentationReport: "",
    // showRankingReport: "",

    this.buildOptions(this.state.yearDefaultLast)
    e.preventDefault()

  }
  setStartDate(date) {
    this.setState({
      fromDate: date,
    })
    let dateData = this.state.data.state.applicantsProfiles
    let dateDataResult = []

    dateData.forEach(element => {
      if ((moment(date).startOf('day').diff(moment(element.created_at).startOf('day'), 'days') <= 0)
        && (moment(this.state.toDate).startOf('day').diff(moment(element.created_at).startOf('day'), 'days') >= 0)) {
        dateDataResult.push(element)
      }
      else {
      }
    })
    // let updateStatus = "yes"
    //updates the graph of employee's information graph report

    this.setState({
      updateData: "yes"
    })

    this.showApplication(dateDataResult)
    this.showAgeParticipation(dateDataResult)
    this.showCongressionalDistrict(dateDataResult)
    this.showPoliticalDistrict(dateDataResult)

  }

  setEndDate = (date) => {
    this.setState({
      toDate: date,
      updateData: "yes"
    })

    let dateData = this.state.data.state.applicantsProfiles
    let dateDataResult = []

    dateData.forEach(element => {
      if ((moment(this.state.fromDate).startOf('day').diff(moment(element.created_at).startOf('day'), 'days') <= 0)
        && (moment(date).startOf('day').diff(moment(element.created_at).startOf('day'), 'days') >= 0)) {
        dateDataResult.push(element)
      }
      else {
      }
    })
    // let updateStatus = "yes"
    //updates the graph of employee's information graph report

    this.setState({
      updateData: "yes"
    })
    this.showApplication(dateDataResult)
    this.showAgeParticipation(dateDataResult)
    this.showCongressionalDistrict(dateDataResult)
    this.showPoliticalDistrict(dateDataResult)
  }
  groupSelected = (e) => {

    // groupEmployeeInformation
    //let getId = document.getElementById('groupEmployeeInformation');
    // let a = getId.options[getId.selectedIndex]
    // console.log(a)
    let groupDataSelected = e.target.value

    if (groupDataSelected) {
      groupDataSelected = e.target.value
    }

    this.setState({
      selectDefaultValue: groupDataSelected,
      baseGroupData: groupDataSelected
    })
    this.groupProcessGraph(groupDataSelected)
    e.preventDefault()
  }


  groupProcessGraph = (groupDataSelected) => {
    let dateData = this.state.data.state.applicantsProfiles
    let groupData = this.state.data.state.application
    let settingsData = this.state.data.state.settings
    let groupDataBasis = ""
    let groupDataResult = []


    settingsData.forEach(element => {
      element.groupings == groupDataSelected ?
        groupDataBasis = (element.id) : ''
    })

    groupData.forEach(element1 => {
      if (element1.groupings_id == groupDataBasis) {
        dateData.forEach(element2 => {
          if (element2.code == element1.profile_code) {
            groupDataResult.push(element2)
          }
        })
      }
    })

    //GRAPH SHOULD UPDATE THIS
    this.setState({
      updateData: "yes"
    })
    this.showApplication(groupDataResult)
    this.showAgeParticipation(groupDataResult)
    this.showCongressionalDistrict(groupDataResult)
    this.showPoliticalDistrict(groupDataResult)
  }

  augmentationRakingYear = (e) => {
    e.preventDefault()
    let yearselected = (e.target.value)
    let settingsData = this.state.data.state.settings
    let data = this.state.data.state.application
    let resultYearData = []
    let resultYearSettings = []
    this.setState({
      yeargraphSelected: yearselected,
      update: "yes"

    })

    settingsData.forEach(element=>{
      if (yearselected == moment(element.created_at).format("YYYY")) {
        resultYearSettings.push(element)
      }
    })
    resultYearSettings.forEach(element1=>{
      data.forEach(element2 => {
        if (element1.id == element2.groupings_id) {
          resultYearData.push(element2)
        }
      })
    })
   

    this.showAugmentationRankingReport(resultYearData, yearselected, "yes")
  }
  augmentationRakingYearBuild = () => {
    let result = [];
    let copyState = this.state.yearFiltered
    let defaultData = ""
    for (let i = 0; i < copyState.length; i++) {
      // DIRI MAG  <option selected="selected"> </option> para default sa latest month makuha


      if (i == copyState.length - 1) {
        result.push(<option key={i} value={copyState[i]} >{copyState[i]}</option>)

      }
      else {
        result.push(<option key={i} value={copyState[i]}>{copyState[i]}</option>)
      }
    }
    return result

  }


  render() {
    const { exisingEmployee, newEmployee } = this.state

    const { totalRankingFilled } = this.state

    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };

    const applicantsRanking = this.state.data.state.applicantsRanking

    /*For React Table */
    const easaraMiniTable = [

      {
        Header: 'History (Date Application Order)',
        className: 'center',
        columns: [{

          Header: 'Name',
          minWidth: 25,
          className: 'center',
          headerClassName: 'wordwrap',
          style: { whiteSpace: 'unset' },
          Cell: c => c.row._original.first_name + " " + c.row._original.last_name,
        }, {

          Header: 'Date Applied',
          minWidth: 25,
          className: 'center',
          headerClassName: 'wordwrap',
          style: { whiteSpace: 'unset' },
          Cell: c => moment(c.row._original.created_at).format("MMMM DD, YYYY hh:mm a"),
        },
        ],

        // minWidth: 50,
      }]
    const easaraGroupingTable = [

      {
        Header: 'Yearly Table Data',
        className: 'center',
        columns: [{

          Header: 'Group',
          minWidth: 25,
          className: 'center',
          headerClassName: 'wordwrap',
          style: { whiteSpace: 'unset' },
          accessor: "group",
        }, {

          Header: 'Type',
          minWidth: 25,
          className: 'center',
          headerClassName: 'wordwrap',
          style: { whiteSpace: 'unset' },
          accessor: "name",
        }, {

          Header: 'Data',
          minWidth: 25,
          className: 'center',
          headerClassName: 'wordwrap',
          style: { whiteSpace: 'unset' },
          accessor: "data",
        },
        ],

        // minWidth: 50,
      }]


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
              <div className="col-sm-12 col-lg-3 col-xs-6">

                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>{this.state.newEmployee}</h3>
                    <p>New Applicants</p>

                    <div className="icon">
                      <i className="fa fa-user-plus"></i>
                    </div>
                    <div className="small-box footer"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-3 col-xs-6">
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{this.state.exisingEmployee}</h3>
                    <p>Total Existing Employees</p>

                    <div className="icon">
                      <i className="fa fa-users"></i>
                    </div>
                    <div className="small-box footer"></div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-lg-3 col-xs-6">

                <div className="small-box bg-blue">
                  <div className="inner">
                    <h3>{this.state.newEmployee + this.state.exisingEmployee}</h3>

                    <p> Total Employees</p>

                    <div className="icon">
                      <i className="fa fa-group"></i>
                    </div>

                    <div className="small-box footer"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">As of Today's EASARA Report </h3>
                  </div>
                  <div className="box-body">
                    <div className="row">
                      <div className="col-lg-8">
                        <canvas id="showMainDashBoardReport" className="chartjs" height="150" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                      </div>

                      <div className="col-lg-4">
                        {/* <div className="progress-group">
                            <span className="progress-text">Required Applicants on Ranking</span>
                            <span className="progress-number">
                              <b>{(newEmployee + exisingEmployee) >= 100 ?
                                100 : (newEmployee + exisingEmployee)}</b>/100</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-blue"
                                style={{
                                  width: ((newEmployee + exisingEmployee) <= 100 ?
                                    ((newEmployee + exisingEmployee) / 100) * 100 + "%" : 0 + "%")
                                }}></div>
                            </div>
                          </div>
                          <div className="progress-group">
                            <span className="progress-text">Required Applicants on Augmentation</span>
                            <span className="progress-number">
                              <b>{(newEmployee + exisingEmployee) >= 100 ?
                                (newEmployee + exisingEmployee) : 0}</b>/300</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-yellow"
                                style={{
                                  width: ((newEmployee + exisingEmployee) >= 100 ?
                                    (newEmployee + exisingEmployee) <= 300 ?
                                      ((newEmployee + exisingEmployee) / 300) * 100 + "%" : 0 + "%" : 0 + "%")
                                }}></div>
                            </div>
                          </div> */}
                        {/*
                          <div className="progress-group">
                            <span className="progress-text">Emoployee's Left</span>
                            <span className="progress-number">
                              <b>{400 - (newEmployee + exisingEmployee)}</b>/400</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-red"
                                style={{ width: (((newEmployee + exisingEmployee)) / 400) * 100 + "%" }}></div>
                            </div>
                          </div> */}
                        <div className="dashboardtable" id="dashboardIdtable">
                          <ReactTable
                            className="-striped -highlight"
                            data={this.state.baseGroupDidMount.reverse()}
                            columns={easaraMiniTable}
                            defaultPageSize={10}
                            PreviousComponent={PreviousIcon}
                            NextComponent={NextIcon}
                            showPageSizeOptions={false}
                            style={{
                              minheight: 55 + "%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="box-footer">
                    <div className="row">
                      <div className="col-sm-6 col-xs-6">
                        <div className="description-block border-right">
                          <h5 className="description-header text-green">{newEmployee + exisingEmployee}</h5>
                          <span className="description-text">As of Total </span>
                        </div>
                      </div>
                      {/* <div className="col-sm-4 col-xs-6">
                          <div className="description-block border-right">
                             <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span> 
                            <h5 className="description-header text-orange">{100 - (applicantsRanking.length)}</h5>
                            <span className="description-text"> </span>
                          </div>
                        </div> */}
                      <div className="col-sm-6 col-xs-6">
                        <div className="description-block border-right">
                          <h5 className="description-header text-red">{this.state.baseGroupDataNOTCHANGED}</h5>
                          <span className="description-text">GROUP NAME</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="AugmentationRankingReport"style={{height:"100%"}} >
              <div className="row">

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="box" >
                    <div className="box-header with-border" >


                      <select className="form-control"
                        id="augmentationRankingYear"
                        style={{ width: "auto", float: "right" }}
                        value={this.state.yeargraphSelected}
                        onChange={this.augmentationRakingYear.bind(this)}
                      >
                        {this.augmentationRakingYearBuild(this.state.yeargraphSelected)}
                      </select>
                      {/* <h3 className="box-title"></h3> */}
                      <Tabs defaultActiveKey="s1" transition={"false"}  id="noanim-tab-example">
                        <Tab eventKey="s1"  style={{height:"100vh"}} title="Augmentation & Ranking">
                          <canvas id="showAugmentationRankingReport" className="chartjs" height="110" style={{ display: "block", width: "100 ", height: "100" }}></canvas>
                          <div className="dashboardtable">
                            <ReactTable
                              className="-striped -highlight"
                              data={this.state.reactTableGroupings}
                              columns={easaraGroupingTable}
                              defaultPageSize={5}
                              PreviousComponent={PreviousIcon}
                              NextComponent={NextIcon}
                              showPageSizeOptions={false}
                              // style={{
                              //   height: 260,
                              // }}
                            />
                          </div>
                        </Tab>
                        <Tab eventKey="s2" style={{height:"68vh"}} title="Augmentation">
                          <canvas id="showAugmentationReport" className="chartjs" height="110" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                        </Tab>
                        <Tab eventKey="s3" style={{height:"68vh"}} title="Revolving" >
                          <canvas id="showRankingReport" className="chartjs" height="110" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                        </Tab>
                      </Tabs>


                    </div>
                    {/* <div className="box-footer" >
                    </div> */}
                  </div>
                </div>
              </div>
            </section>

            <section className="graph">
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12" >
                  <div className="row">
                    <div className="col-md-12">
                      <h3>
                        <p className="text-center">
                          <strong>Employee's Information Report ({this.state.baseGroupData})</strong>

                        </p>
                        <div className="pull-right">
                          <select className="form-control"
                            id="groupEmployeeInformation"
                            style={{ width: "auto", float: "right" }}
                            value={this.state.selectDefaultValue}
                            onChange={this.groupSelected.bind(this)}
                          >
                            {this.buildOptions()}
                          </select>

                          <select className="form-control"
                            id="groupYearSelect"
                            style={{ width: "auto" }}
                            value={this.state.yearDefaultLast}
                            onChange={this.groupSelectedYear.bind(this)}
                          >
                            {this.buildYearOptions(this.state.yearDefaultLast)}
                          </select>
                        </div>
                      </h3>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 center" style={{ display: "block",width:"50%",}} >


                      <div style={{ paddingTop: "10px" ,paddingLeft:"10%",float:"left"}}>
                        <DatePicker
                          selected={this.state.fromDate}
                          onChange={(date) => this.setStartDate(date)}
                          showMonthDropdown
                          showYearDropdown
                          selectsStart
                          style={{
                           
                          }}
                          dropdownMode="select"
                          popperPlacement="auto"
                          startDate={this.state.fromDate}
                          endDate={this.state.toDate}
                          dateFormat="📅 MMMM dd yyyy"
                        />
                      </div>

                      <div style={{  paddingTop: "50px",float:"left",width:"50%", paddingTop: "10px" }}>
                        <DatePicker
                          selected={this.state.toDate}
                          onChange={(date) => this.setEndDate(date)}
                          showMonthDropdown
                          showYearDropdown
                          selectsEnd
                          style={{
                           
                          }}
                          dropdownMode="select"
                          popperPlacement="bottom"
                          startDate={this.state.toDate}
                          endDate={this.state.toDate}
                          dateFormat="📅 MMMM dd yyyy"
                          minDate={this.state.fromDate}

                        />
                      </div>
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
                          <h4><label> Age Participation</label></h4>
                        </div>
                        <div className="box-body no-padding">
                          <canvas id="showAgeParticipation" className="chartjs" style={{ display: "block", width: "100", height: "100" }}></canvas>
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
                          <h4><label> Congressional District</label> <button className="btn btn-info" onClick={this.showModalViewPoliticalDistrict}>Show More</button></h4>
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
          </section>
        </div>

        <AppFooter />
        {/* MODAL FOR POLITICAL DISTRICT */}
        <section className="modalShowingAllDetails">

          <div className="modal fade" id="modal-show-politicalDistrict" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header cus-modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <canvas id="showPoliticalDistrict" className="chartjs" height="150" style={{ display: "block", width: "100 ", height: "100" }}></canvas>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-default" data-dismiss="modal">CLOSE</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    );
  }
}
