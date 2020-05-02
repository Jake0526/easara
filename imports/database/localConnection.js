import { Meteor } from "meteor/meteor";
import mysql from "mysql";
import mysqlssh from "mysql-ssh";
// export const hrisnp = mysql.createConnection({
//   host: Meteor.settings.private.passport.db_host,
//   user: 'root',
//   password: 'secret',
//   database: 'hrisnp',
//   multipleStatements: true,
// });

export const easara = (sql, callback) => {
  const promise1 = new Promise(function (resolve, reject) {
    resolve(
      mysql.createConnection(
        // {
        //   host: "192.168.1.15",
        //   port: "1212",
        //   username: "hr_devtm",
        //   password: "d3vgrup@HR.m0",
        // }
        {
          host: "localhost",
          port: "3306",
          user: "root",
          password: "password",
          database: "easara",
          multipleStatements: true
        }
      )
    );
  });
  promise1
    .then((client) => {
      client.query(sql, (err, results, fields) => {
        callback(err, results);
        // mysqlssh.close();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
