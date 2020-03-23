import { Meteor } from 'meteor/meteor';
import mysql from 'mysql';

export const easara = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "password",
  database: "easara",
  multipleStatements: true
});

easara.connect();