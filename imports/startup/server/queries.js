import { Meteor } from 'meteor/meteor';
import { easara } from '../../database/connections.js';
import Future from 'fibers/future';

const request = require('request');
var moment = require('moment');
JsonRoutes.setResponseHeaders({
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
});

Meteor.method(
  'select-profiles',
  function() {
    var sql = `SELECT * FROM applicants_profile`;
    var fut = new Future();

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: 'select-profiles',
    httpMethod: 'post',
  }
);

Meteor.method(
  'insert-new-applicant',
  function(applicantData) {
    var sql = `
      INSERT INTO applicants_profile
      (religion_code, first_name, last_name, middle_name, maiden_name, name_ext, address, phone_number, cell_number, political_district, congressional_district,
        citizenship, birth_date, birth_place, blood_type, height, sex, civil_status, tin, phil_health, sss, is_licensed,
        emergency_name, emergency_relation, emergency_address, emergency_contact_number)
      VALUES ('${applicantData.religionCode}' ,'${applicantData.firstName}', '${applicantData.lastName}', '${applicantData.middleName}',
      '${applicantData.maidenName}', '${applicantData.nameExtension}', '${applicantData.address}', '${applicantData.phoneNumber}', 
      '${applicantData.cellNumber}', '${applicantData.politicalDistrict}', '${applicantData.congressionalDistrict}', '${applicantData.citizenship}', 
      '${moment(applicantData.birthDate).format("YYYY-MM-DD HH:mm:ss")}', '${applicantData.birthPlace}', '${applicantData.bloodType}', '${applicantData.height}', '${applicantData.sex}', 
      '${applicantData.civilStatus}', '${applicantData.tin}', '${applicantData.philHealth}','${applicantData.sss}',
      '${applicantData.isLicensed}', '${applicantData.emergencyName}', '${applicantData.emergencyRelation}', '${applicantData.emergencyAddress}', '${applicantData.emergencyNumber}');`;
    var fut = new Future();

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return('success');
    });
    return fut.wait();
  },
  {
    url: 'insert-new-applicant',
    httpMethod: 'post',
    getArgsFromRequest: function(request) {
      var content = request.body;
      return [content.applicantData];
    },
  }
);
