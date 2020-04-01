import { Meteor } from 'meteor/meteor';
import { easara } from '../../database/localConnection.js';
import Future from 'fibers/future';
import { check } from 'meteor/check';
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
  'select-ranking',
  function() {
    var sql = `
      SELECT 
          *
      FROM
          applicants_ranking
      INNER JOIN
        applicants_profile on applicants_profile.id = applicants_ranking.applicant_profile_id
    `;
    
    var fut = new Future();

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: 'select-ranking',
    httpMethod: 'post',
  }
);

Meteor.method(
  'insert-new-applicant',
  function(applicantData) {
    check(applicantData, Object);
    function addslashes(str) {
      if (str == null) {
        return '';
      } else {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
      }
    }

    var sql = `
      INSERT INTO applicants_profile
      (religion_code, first_name, last_name, middle_name, maiden_name, name_ext, address, phone_number, cell_number, political_district, congressional_district,
        citizenship, birth_date, birth_place, blood_type, height, sex, civil_status, tin, phil_health, sss, is_licensed,
        emergency_name, emergency_relation, emergency_address, emergency_contact_number, employee_number, existing ${
          applicantData.beginDate === '' ? '' : ', last_begin_date'
        })
      VALUES ('${addslashes(applicantData.religionCode)}' ,'${addslashes(
      applicantData.firstName
    )}', '${addslashes(applicantData.lastName)}', '${addslashes(applicantData.middleName)}',
      '${addslashes(applicantData.maidenName)}', '${addslashes(
      applicantData.nameExtension
    )}', '${addslashes(applicantData.address)}', '${addslashes(applicantData.phoneNumber)}', 
      '${addslashes(applicantData.cellNumber)}', '${addslashes(
      applicantData.politicalDistrict
    )}', '${addslashes(applicantData.congressionalDistrict)}', '${addslashes(
      applicantData.citizenship
    )}', 
      '${moment(applicantData.birthDate).format('YYYY-MM-DD HH:mm:ss')}', '${addslashes(
      applicantData.birthPlace
    )}', '${addslashes(applicantData.bloodType)}', '${addslashes(
      applicantData.height
    )}', '${addslashes(applicantData.sex)}', 
      '${addslashes(applicantData.civilStatus)}', '${addslashes(applicantData.tin)}', '${addslashes(
      applicantData.philHealth
    )}','${addslashes(applicantData.sss)}',
      '${addslashes(applicantData.isLicensed)}', '${addslashes(
      applicantData.emergencyName
    )}', '${addslashes(applicantData.emergencyRelation)}', '${addslashes(
      applicantData.emergencyAddress
    )}', '${addslashes(applicantData.emergencyNumber)}', '${addslashes(
      applicantData.employeeNumber === '000000' ? '' : applicantData.employeeNumber
    )}', ${applicantData.existing} ${
      applicantData.beginDate === ''
        ? ''
        : ', "' + moment(applicantData.beginDate).format('YYYY-MM-DD HH:mm:ss') + '"'
    });`;
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

Meteor.method(
  'update-profile',
  function(applicantData) {
    check(applicantData, Object);
    function addslashes(str) {
      if (str == null) {
        return '';
      } else {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
      }
    }

    var sql = `
    UPDATE applicants_profile
    SET religion_code = '${addslashes(applicantData.religionCode)}', first_name = '${addslashes(
      applicantData.firstName
    )}', last_name = '${addslashes(applicantData.lastName)}', middle_name = '${addslashes(
      applicantData.middleName
    )}',
    maiden_name = '${addslashes(applicantData.maidenName)}', name_ext = '${addslashes(
      applicantData.nameExtension
    )}', address = '${addslashes(applicantData.address)}',
    phone_number = '${addslashes(applicantData.phoneNumber)}', cell_number = '${addslashes(
      applicantData.cellNumber
    )}', political_district = '${addslashes(applicantData.politicalDistrict)}',
    congressional_district =  '${addslashes(
      applicantData.congressionalDistrict
    )}', citizenship = '${addslashes(applicantData.citizenship)}',
    birth_date = '${moment(applicantData.birthDate).format(
      'YYYY-MM-DD HH:mm:ss'
    )}', birth_place = '${addslashes(applicantData.birthPlace)}',
    blood_type = '${addslashes(applicantData.bloodType)}', height = '${addslashes(
      applicantData.height
    )}', sex = '${addslashes(applicantData.sex)}', 
    civil_status = '${addslashes(applicantData.civilStatus)}', tin =  '${addslashes(
      applicantData.tin
    )}', phil_health = '${addslashes(applicantData.philHealth)}',
    sss = '${addslashes(applicantData.sss)}', is_licensed = '${addslashes(
      applicantData.isLicensed
    )}', emergency_name = '${addslashes(applicantData.emergencyName)}',
    emergency_relation = '${addslashes(
      applicantData.emergencyRelation
    )}', emergency_address = '${addslashes(applicantData.emergencyAddress)}',     
    emergency_contact_number = '${addslashes(applicantData.emergencyNumber)}'
    ${
      applicantData.beginDate === ''
        ? ''
        : ',last_begin_date = "' +
          moment(applicantData.beginDate).format('YYYY-MM-DD HH:mm:ss') +
          '"'
    }
    WHERE id = ${applicantData.applicantProfileId}`;
    var fut = new Future();

    console.log(sql);

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return('success');
    });
    return fut.wait();
  },
  {
    url: 'update-profile',
    httpMethod: 'post',
    getArgsFromRequest: function(request) {
      var content = request.body;
      return [content.applicantData];
    },
  }
);

Meteor.method(
  'insert-rank',
  function(rankData) {
    console.log(rankData);

    var sql = `
      INSERT INTO applicants_ranking
      (
        applicant_profile_id, 
        rank_no
      )
      VALUES(
        ${rankData.applicantProfileId},
        ${rankData.rankNo}
      );`;
    var fut = new Future();

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return('success');
    });
    return fut.wait();
  },
  {
    url: 'insert-rank',
    httpMethod: 'post',
    getArgsFromRequest: function(request) {
      var content = request.body;
      return [content.rankData];
    },
  }
);

Meteor.method(
  'truncate-rank',
  function() {
    var sql = `
      TRUNCATE TABLE applicants_ranking;`;
    var fut = new Future();

    easara(sql, function(err, result) {
      if (err) throw err;
      fut.return('success');
    });
    return fut.wait();
  },
  {
    url: 'truncate-rank',
    httpMethod: 'post',
    getArgsFromRequest: function(request) {
      var content = request.body;
      return [];
    },
  }
);