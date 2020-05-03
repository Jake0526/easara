import { Meteor } from 'meteor/meteor';
import mysql from 'mysql';
import mysqlssh from 'mysql-ssh';

// export const hrisnp = mysql.createConnection({
//   host: Meteor.settings.private.passport.db_host,
//   user: 'root',
//   password: 'secret',
//   database: 'hrisnp',
//   multipleStatements: true,
// });

export const easara = (sql, callback) => {
  mysqlssh
    .connect(
      {
        host: '192.168.1.15',
        port: '1212',
        username: 'hr_devtm',
        password: 'd3vgrup@HR.m0',
      },
      {
        host: '172.28.0.2',
        user: 'root',
        password: 'secret',
        database: 'easara',
        multipleStatements: true
      }
    )
    .then(client => {
      client.query(sql, (err, results, fields) => {
        callback(err, results);
        // mysqlssh.close();
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// hrisnp.connect();
