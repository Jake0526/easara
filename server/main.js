import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/passport-setup.js';
import '../imports/startup/server/queries.js';
import './informationFilter.js'
Meteor.startup(() => {
  // code to run on server at startup
});
