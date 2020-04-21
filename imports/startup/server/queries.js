import { Meteor } from "meteor/meteor";
import { easara } from "../../database/localConnection.js";
import Future from "fibers/future";
import { check } from "meteor/check";
import { Random } from "meteor/random";

var moment = require("moment");
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  Pragma: "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
});

Meteor.method(
  "select-profiles",
  function () {
    var sql = `SELECT * FROM applicant_profiles ORDER BY id DESC`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-profiles",
    httpMethod: "post",
  }
);

Meteor.method(
  "select-applications",
  function () {
    var sql = `Select ap.id, ap.first_name, ap.last_name, ap.name_ext, ap.maiden_name, ap.middle_name, s.groupings, ap.contact_number,
     ap.birth_date, ap.address, s.date_from, s.date_to, a.date_applied
    FROM applicant_profiles ap
    INNER JOIN applications a ON ap.code = a.profile_code 
    INNER JOIN settings s ON s.id = a.groupings_id`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-applications",
    httpMethod: "post",
  }
);

Meteor.method(
  "select-applications-all",
  function () {
    var sql = `Select *
    FROM applications`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-applications-all",
    httpMethod: "post",
  }
);



Meteor.method(
  "select-settings",
  function () {
    var sql = `SELECT * FROM settings`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-settings",
    httpMethod: "post",
  }
);

// Meteor.method(
//   "select-ranking",
//   function () {
//     var sql = `
//       SELECT
//           *
//       FROM
//           applicants_ranking
//       INNER JOIN
//         applicants_profile on applicants_profile.id = applicants_ranking.applicant_profile_id
//     `;

//     var fut = new Future();

//     easara(sql, function (err, result) {
//       if (err) throw err;
//       fut.return(result);
//     });
//     return fut.wait();
//   },
//   {
//     url: "select-ranking",
//     httpMethod: "post",
//   }
// );

Meteor.method(
  "insert-new-applicant",
  function (applicantData) {
    check(applicantData, Object);
    function addslashes(str) {
      if (str == null) {
        return "";
      } else {
        return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
      }
    }
    let code = Random.id([17]);
    var sql = `
      INSERT INTO applicant_profiles
      (code, first_name, last_name, middle_name, maiden_name, name_ext, address, contact_number, political_district, congressional_district,
        birth_date, employee_number)
      VALUES ('${code}','${addslashes(applicantData.firstName)}', '${addslashes(
      applicantData.lastName
    )}', '${addslashes(applicantData.middleName)}',
        '${addslashes(applicantData.maidenName)}', '${addslashes(
      applicantData.nameExtension
    )}', '${addslashes(applicantData.address)}',
        '${addslashes(applicantData.cellNumber)}', '${addslashes(
      applicantData.politicalDistrict
    )}', '${addslashes(applicantData.congressionalDistrict)}', 
        '${moment(applicantData.birthDate).format("YYYY-MM-DD HH:mm:ss")}',
      '${addslashes(
        applicantData.employeeNumber === "000000"
          ? ""
          : applicantData.employeeNumber
      )}');`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) {
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "insert-new-applicant",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.applicantData];
    },
  }
);

Meteor.method(
  "insert-application",
  function (code) {
    check(code, String);

    var sql = `
    INSERT INTO applications (profile_code, groupings_id) VALUES ('${code}', (SELECT id FROM settings ORDER BY id DESC LIMIT 1));`;
    var fut = new Future();
    console.log(sql);
    easara(sql, function (err, result) {
      if (err) {
        console.log(err);
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "insert-application",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.code];
    },
  }
);

Meteor.method(
  "insert-new-applicant-application",
  function (applicantData) {
    check(applicantData, Object);
    function addslashes(str) {
      if (str == null) {
        return "";
      } else {
        return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
      }
    }
    let code = Random.id([17]);
    var sql = `
      INSERT INTO applicant_profiles
      (code, first_name, last_name, middle_name, maiden_name, name_ext, address, contact_number, political_district, congressional_district,
        birth_date, employee_number)
      VALUES ('${code}','${addslashes(applicantData.firstName)}', '${addslashes(
      applicantData.lastName
    )}', '${addslashes(applicantData.middleName)}',
        '${addslashes(applicantData.maidenName)}', '${addslashes(
      applicantData.nameExtension
    )}', '${addslashes(applicantData.address)}',
        '${addslashes(applicantData.cellNumber)}', '${addslashes(
      applicantData.politicalDistrict
    )}', '${addslashes(applicantData.congressionalDistrict)}', 
        '${moment(applicantData.birthDate).format("YYYY-MM-DD HH:mm:ss")}',
      '${addslashes(
        applicantData.employeeNumber === "000000"
          ? ""
          : applicantData.employeeNumber
      )}');
      INSERT INTO applications (profile_code, groupings_id) VALUES ('${code}', (SELECT id FROM settings ORDER BY id DESC LIMIT 1));`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) {
        console.log(err);
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "insert-new-applicant-application",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.applicantData];
    },
  }
);

Meteor.method(
  "insert-grouping",
  function (data) {
    check(data, Object);

    var sql = `
    INSERT INTO settings (groupings, date_from, date_to) VALUES ('${
      data.groupingName
    }', '${moment(data.dateFrom).format("YYYY-MM-DD")}', '${moment(
      data.dateTo
    ).format("YYYY-MM-DD")}');`;
    var fut = new Future();
    console.log(sql);
    easara(sql, function (err, result) {
      if (err) {
        console.log(err);
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "insert-grouping",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.data];
    },
  }
);

Meteor.method(
  "update-profile",
  function (applicantData) {
    check(applicantData, Object);
    function addslashes(str) {
      if (str == null) {
        return "";
      } else {
        return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
      }
    }
    var sql = `
    UPDATE applicant_profiles
    SET first_name = '${addslashes(
      applicantData.firstName
    )}', last_name = '${addslashes(
      applicantData.lastName
    )}', middle_name = '${addslashes(applicantData.middleName)}',
    maiden_name = '${addslashes(
      applicantData.maidenName
    )}', name_ext = '${addslashes(
      applicantData.nameExtension
    )}', address = '${addslashes(applicantData.address)}',
     contact_number = '${addslashes(
       applicantData.cellNumber
     )}', political_district = '${addslashes(applicantData.politicalDistrict)}',
    congressional_district =  '${addslashes(
      applicantData.congressionalDistrict
    )}',
    birth_date = '${moment(applicantData.birthDate).format(
      "YYYY-MM-DD HH:mm:ss"
    )}'
    WHERE id = ${applicantData.applicantProfileId}`;
    var fut = new Future();

    easara(sql, function (err, result) {
      if (err) {
        console.log(err);
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "update-profile",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.applicantData];
    },
  }
);

Meteor.method(
  "update-grouping",
  function (data) {
    check(data, Object);
    console.log(data);
    var sql = `UPDATE settings SET groupings='${
      data.groupings
    }', date_from='${moment(data.date_from).format(
      "YYYY-MM-DD"
    )}', date_to='${moment(data.date_to).format("YYYY-MM-DD")}' WHERE id = ${
      data.id
    };`;
    var fut = new Future();

    easara(sql, function (err, result) {
      if (err) {
        console.log(err);
        fut.return("bad");
      } else {
        fut.return("success");
      }
    });
    return fut.wait();
  },
  {
    url: "update-grouping",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.data];
    },
  }
);

// Meteor.method(
//   "insert-rank",
//   function (rankData) {
//     console.log(rankData);

//     var sql = `
//       INSERT INTO applications
//       (
//         applicant_profile_id,
//         rank_no
//       )
//       VALUES(
//         ${rankData.applicantProfileId},
//         ${rankData.rankNo}
//       );`;
//     var fut = new Future();

//     easara(sql, function (err, result) {
//       if (err) throw err;
//       fut.return("success");
//     });
//     return fut.wait();
//   },
//   {
//     url: "insert-rank",
//     httpMethod: "post",
//     getArgsFromRequest: function (request) {
//       var content = request.body;
//       return [content.rankData];
//     },
//   }
// );

// Meteor.method(
//   "truncate-rank",
//   function () {
//     var sql = `
//       TRUNCATE TABLE applicants_ranking;`;
//     var fut = new Future();

//     easara(sql, function (err, result) {
//       if (err) throw err;
//       fut.return("success");
//     });
//     return fut.wait();
//   },
//   {
//     url: "truncate-rank",
//     httpMethod: "post",
//     getArgsFromRequest: function (request) {
//       var content = request.body;
//       return [];
//     },
//   }
// );
