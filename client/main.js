import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Routes from '/imports/startup/client/Routes.js';

import './main.html';
import './lib/base/lib/admin-lte/dist/js/adminlte.min.js';
import './lib/compatibility/bootstrap.min.js';
import './lib/compatibility/gridforms.js'

import 'react-table/react-table.css';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('render-root'));
  $('body').addClass('skin-blue');
});