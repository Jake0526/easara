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
    var sql = `
    SELECT 
      applications.id AS 'id',
      applicant_profiles.employee_number AS 'employee_number',
      applicant_profiles.code AS 'code',
      applicant_profiles.first_name AS 'first_name',
      applicant_profiles.last_name AS 'last_name',
      applicant_profiles.middle_name AS 'middle_name',
      applicant_profiles.name_ext AS 'name_ext',
      applicant_profiles.maiden_name AS 'maiden_name',
      applicant_profiles.address AS 'address',
      applicant_profiles.political_district AS 'political_district',
      applicant_profiles.congressional_district AS 'congressional_district',
      applicant_profiles.contact_number AS 'contact_number',
      applicant_profiles.birth_date AS 'birth_date',
      applications.groupings_id AS 'groupings_id'
    FROM
      applications
    INNER JOIN
      applicant_profiles ON applicant_profiles.code = applications.profile_code
    INNER JOIN
      settings ON settings.id = applications.groupings_id
    WHERE
      settings.is_active = 1;`;
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

Meteor.method(
  "active-settings",
  function () {
    var sql = `SELECT * FROM settings WHERE is_active = 1`;

    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "active-settings",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [];
    },
  }
);

Meteor.method(
  "select-application-history",
  function (code) {
    check(code, String);
    var sql = `SELECT s.groupings, a.date_applied FROM applications a INNER JOIN settings s ON a.groupings_id = s.id WHERE a.profile_code = '${code}'`;
    var fut = new Future();
    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-application-history",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.code];
    },
  }
);

Meteor.method(
  "select-ranking",
  function () {
    var sql = `
    SELECT 
      applications.id AS 'id',
      applications.ranking AS 'ranking',
      applicant_profiles.employee_number AS 'employee_number',
      applicant_profiles.first_name AS 'first_name',
      applicant_profiles.last_name AS 'last_name',
      applicant_profiles.middle_name AS 'middle_name',
      applications.category AS 'category',
      applications.remarks AS 'remarks',
      applications.groupings_id AS 'groupings_id'
    FROM
      applications
    INNER JOIN
      applicant_profiles ON applicant_profiles.code = applications.profile_code
    INNER JOIN
      settings ON settings.id = applications.groupings_id
    WHERE
      settings.is_active = 1;
    `;

    var fut = new Future();

    easara(sql, function (err, result) {
      if (err) throw err;
      fut.return(result);
    });
    return fut.wait();
  },
  {
    url: "select-ranking",
    httpMethod: "post",
  }
);

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
        birth_date, employee_number, date_from, date_to)
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
        ${
          applicantData.employeeNumber == "000000"
            ? null
            : "'" + addslashes(applicantData.employeeNumber) + "'"
        }, 
        ${
          applicantData.dateFrom != null
            ? "'" +
              moment(applicantData.dateFrom).format("YYYY-MM-DD HH:mm:ss") +
              "'"
            : null
        }, 
        ${
          applicantData.dateTo != null
            ? "'" +
              moment(applicantData.dateTo).format("YYYY-MM-DD HH:mm:ss") +
              "'"
            : null
        });`;
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
  "check-existing-application",
  function (code) {
    check(code, String);
    var fut = new Future();
    let checker = `Select profile_code FROM applications
      WHERE groupings_id = (SELECT id FROM settings ORDER BY id DESC LIMIT 1) AND profile_code = '${code}'`;
    easara(checker, function (err, result) {
      if (err) {
        fut.return("bad");
      } else {
        if (result.length != 0) {
          fut.return("exist");
        } else {
          fut.return("success");
        }
      }
    });
    return fut.wait();
  },
  {
    url: "check-existing-application",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.code];
    },
  }
);
Meteor.method(
  "insert-application",
  function (code) {
    check(code, String);

    var sql = `INSERT INTO applications (profile_code, groupings_id) VALUES ('${code}', (SELECT id FROM settings ORDER BY id DESC LIMIT 1));`;
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
        birth_date, employee_number, date_from, date_to)
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
      ${
        applicantData.employeeNumber == "000000"
          ? null
          : "'" + addslashes(applicantData.employeeNumber) + "'"
      }, 
      ${
        applicantData.dateFrom != null
          ? "'" +
            moment(applicantData.dateFrom).format("YYYY-MM-DD HH:mm:ss") +
            "'"
          : null
      }, 
      ${
        applicantData.dateTo != null
          ? "'" +
            moment(applicantData.dateTo).format("YYYY-MM-DD HH:mm:ss") +
            "'"
          : null
      });
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
    ).format("YYYY-MM-DD")}');
    SET SQL_SAFE_UPDATES = 0;
    UPDATE settings SET is_active = "0";
    SET SQL_SAFE_UPDATES = 1;
    UPDATE settings SET is_active = "1" WHERE id = last_insert_id();`;
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

Meteor.method(
  "insert-rank",
  function (rankData) {
    var sql = `
      UPDATE 
        applications
      SET 
        ranking = '${rankData.rankNo}',
        category = '${rankData.category}'
      WHERE
        id = ${rankData.applicationId}
          AND
        groupings_id = ${rankData.groupingsID};`;

    var fut = new Future();
    easara(sql, (err, result) => {
      if (err) throw err;
      fut.return("success");
    });
    return fut.wait();
  },
  {
    url: "insert-rank",
    httpMethod: "post",
    getArgsFromRequest: function (request) {
      var content = request.body;
      return [content.rankData];
    },
  }
);

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
