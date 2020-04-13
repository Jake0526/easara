import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../css/app.css';
import SideBar from '../sidebar/SideBar.js';
import AppHeader from '../../app/AppHeader.js';
import AppFooter from '../../app/app_footer.js';


import PreviousIcon from '../../react-table-custom-component/PreviousComponent';
import NextIcon from '../../react-table-custom-component/NextComponent';

var converter = require('number-to-words');
var Chart = require('chart.js');

var d3 = require('d3-scale-chromatic')
var moment = require('moment');

//Component

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props,
      dataPrevious: props,
      showAge: "",
      showApplication: "",
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
      totalRankingFilled: 0,
      progressBarRanking: 0.00,
      progressBarAugmentation: 0.00,
      progressBarRanking: 0.00,

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
    this.showAgeParticipation(chartData)
    this.showMainDashboardReport(chartData)
    this.showCongressionalDistrict(chartData)
    this.showPoliticalDistrict(chartData)
    this.showAugmentationRankingReport(chartData)
    //console.log("componentdidMount")
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.setState({
      data: nextProps,
      dataPrevious: prevProps,
      applicantsProfiles: nextProps,
    });


    this.showApplication(nextProps.state.applicantsProfiles)
    this.showMainDashboardReport(nextProps.state.applicantsProfiles)
    this.showAgeParticipation(nextProps.state.applicantsProfiles)
    this.showCongressionalDistrict(nextProps.state.applicantsProfiles)
    this.showPoliticalDistrict(nextProps.state.applicantsProfiles)
    this.showAugmentationRankingReport(nextProps.state.applicantsProfiles)
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

    // $(window).bind("resize", function () { myChart.resize() });
    // myChart.update()

  }
  destroyChart = (ctx, dataChart, typeChart, optionsChart) => {
    var myChart = new Chart(ctx, {
      type: typeChart,
      data: dataChart,
      options: optionsChart
    });
    myChart.destroy()

  }


  showApplication = (data) => {
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
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
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
          countNewData.push([moment(element.created_at).format("MMMM DD,YYYY"), element.existing])
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
    let empTotal = 400
    for (let i = 0; i < incrementalValue0.length; i++) {
      //empTotal-=
      resultLeft.push(400 - (incrementalValue0[i] + incrementalValue1[i]))
    }

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
        }, {
          label: 'Left',
          data: resultLeft,
          backgroundColor: randomColorResult[2]
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
        text: 'Test Incremental day Graph'
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
    console.log("niagi diri")
    let baseYear = new Date()
    baseYear = (baseYear.getFullYear())
    let male = 0
    let female = 0
    data.forEach(element => {
      element.sex == "Male" ? male += 1 : female += 1
    });
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
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
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
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
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
        this.destroyChart(ctx, dataChart, type, options)
        this.createChart(ctx, dataChart, type, options)
      }
      else {
      }
    }
  }
  showAugmentationRankingReport = (data)=>{

    var ctx = document.getElementById('showAugmentationRankingReport').getContext('2d');

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
          this.destroyChart(ctx, dataChart, type, options)
          this.createChart(ctx, dataChart, type, options)
        }
        else {
        }
      }
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
              <div className="col-sm-12 col-lg-4 col-xs-6">

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
              <div className="col-sm-12 col-lg-4 col-xs-6">
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

              <div className="col-sm-12 col-lg-4 col-xs-6">

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

              {/* <div className="col-sm-12 col-lg-3 col-xs-6">

                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>10</h3>

                    <p> Places Available</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-globe"></i>
                  </div>
                </div>
              </div> */}
            </div>




            <section className="main dashboard">

              <div className="row">

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h3 className="box-title">As of Today's EASARA Report</h3>

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
                          <canvas id="showMainDashBoardReport" className="chartjs" height="150" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                        </div>

                        <div className="col-lg-4">
                          <div className="progress-group">
                            <span className="progress-text">Total Ranking Left</span>
                            <span className="progress-number"><b>{(applicantsRanking.length)}</b>/100</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-blue" style={{ width: (((applicantsRanking.length)) / 100) * 100 + "%" }}></div>
                            </div>
                          </div>
                          <div className="progress-group">
                            <span className="progress-text">Total Augmentation Left</span>
                            <span className="progress-number"><b>{300 - (newEmployee + exisingEmployee)}</b>/300</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-yellow" style={{ width: (((newEmployee + exisingEmployee)) / 300) * 100 + "%" }}></div>
                            </div>
                          </div>

                          <div className="progress-group">
                            <span className="progress-text">Emoployee's Left</span>
                            <span className="progress-number"><b>{400 - (newEmployee + exisingEmployee)}</b>/400</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-red" style={{ width: (((newEmployee + exisingEmployee)) / 400) * 100 + "%" }}></div>
                            </div>
                          </div>
                          <div className="dashboardtable" id="dashboardIdtable">
                            <ReactTable
                              className="-striped -highlight"
                              data={this.props.state.applicantsProfiles}
                              columns={easaraMiniTable}
                              defaultPageSize={5}
                              PreviousComponent={PreviousIcon}
                              NextComponent={NextIcon}
                              showPageSizeOptions={false}
                              style={{
                                height: 260,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="box-footer">
                      <div className="row">
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            <h5 className="description-header text-green">{newEmployee + exisingEmployee}</h5>
                            <span className="description-text">As of Total </span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            {/* <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span> */}
                            <h5 className="description-header text-orange">{100 - (applicantsRanking.length)}</h5>
                            <span className="description-text">Left for Ranking </span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block border-right">
                            {/* <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span> */}
                            <h5 className="description-header text-red">{300 - (newEmployee + exisingEmployee)}</h5>
                            <span className="description-text">Left for Augmentation</span>
                          </div>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <div className="description-block">
                            {/* <span className="description-percentage text-red"><i className="fa fa-caret-down"></i> 18%</span> */}
                            <h5 className="description-header text-red">{400 - (newEmployee + exisingEmployee)}</h5>
                            <span className="description-text">Total Exmployee Left</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="AugmentationRankingReport" >
              <div className="row">

                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="box" style={{height: '80vh'}}>
                    <div className="box-header with-border" >
                      <h3 className="box-title">Augmentation & Ranking Report</h3>

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
                          <canvas id="showAugmentationRankingReport" className="chartjs" height="150" style={{ display: "block", width: "100 ", height: "100" }}></canvas>

                        </div>

                        {/* <div className="col-lg-4">
                          <div className="progress-group">
                            <span className="progress-text">Total Ranking Left</span>
                            <span className="progress-number"><b>{(applicantsRanking.length)}</b>/100</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-blue" style={{ width: (((applicantsRanking.length)) / 100) * 100 + "%" }}></div>
                            </div>
                          </div>
                          <div className="progress-group">
                            <span className="progress-text">Total Augmentation Left</span>
                            <span className="progress-number"><b>{300 - (newEmployee + exisingEmployee)}</b>/300</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-yellow" style={{ width: (((newEmployee + exisingEmployee)) / 300) * 100 + "%" }}></div>
                            </div>
                          </div>

                          <div className="progress-group">
                            <span className="progress-text">Emoployee's Left</span>
                            <span className="progress-number"><b>{400 - (newEmployee + exisingEmployee)}</b>/400</span>

                            <div className="progress sm">
                              <div className="progress-bar progress-bar-red" style={{ width: (((newEmployee + exisingEmployee)) / 400) * 100 + "%" }}></div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                      <div className="box-footer">
                      <div className="dashboardtable" id="dashboardIdtable">
                            <ReactTable
                              className="-striped -highlight"
                              data={this.props.state.applicantsProfiles}
                              columns={easaraMiniTable}
                              defaultPageSize={5}
                              PreviousComponent={PreviousIcon}
                              NextComponent={NextIcon}
                              showPageSizeOptions={false}
                              style={{
                                height: 260,
                              }}
                            />
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
                    {/* <div className="col-sm-12 col-md-6 col-lg-6" >
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
                    </div> */}

                    <div className="col-sm-12 col-md-6 col-lg-6" >
                      <div className="box box-primary">
                        <div className="box-header with-border">
                          <h4><label> Congressional District</label> <button className="btn btn-primary" onClick={this.showModalViewPoliticalDistrict}>Show More</button></h4>
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

            {/* <section className="content-header"  >
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
                  <h3><p className="text-center">
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
            </section> */}
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
