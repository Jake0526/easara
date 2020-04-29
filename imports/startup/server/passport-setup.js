/* eslint-disable */
import { WebApp } from 'meteor/webapp';
import { readFileSync } from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const request = require('request');

const app = express();
const host = Meteor.settings.ssoAdministrator.host;
const scope = Meteor.settings.ssoAdministrator.scope;

passport.use(
  'oauth2',
  new OAuth2Strategy(
    {
      authorizationURL: Meteor.settings.ssoAdministrator.authorizationURL,
      tokenURL: Meteor.settings.ssoAdministrator.tokenURL,
      clientID: Meteor.settings.ssoAdministrator.clientID,
      clientSecret: Meteor.settings.ssoAdministrator.clientSecret,
      callbackURL: Meteor.settings.ssoAdministrator.callbackURL,
      state: true,
      scope: 'openid ' + scope,
    },
    (accessToken, refreshToken, profile, cb) => cb(null, { accessToken, profile })
  )
);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app.use(bodyParser.json());

app.use(
  session({
    name: scope + '_name',
    secret: scope + '_secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/login',
  passport.authenticate('oauth2', {
    scope: ['openid', scope],
  })
);

app.use('/callback', passport.authenticate('oauth2'), (req, res, next) => {
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  var options = {
    url: Meteor.settings.ssoAdministrator.hydraAdmin + '/oauth2/introspect',
    method: 'POST',
    headers: headers,
    form: { token: req.user.accessToken },
  };
  request(options, (error, response, body) => {
    req.session.sub = JSON.parse(body).sub;

    res.redirect('/');
  });
});

app.post('/get-accessToken', function(req, res) {
  res.send(req.user.accessToken);
});

app.post('/is-login', function(req, res) {
  if (!req.user) {
    res.send({
      isLogin: false,
    });
  } else {
    var headers = {
      'Content-Type': 'x-www-form-urlencoded',
    };

    var options = {
      url: Meteor.settings.ssoAdministrator.loginProvider + '/is-login',
      method: 'POST',
      headers: headers,
      form: {
        access_token: req.user.accessToken,
        client: Meteor.settings.ssoAdministrator.clientName,
      },
    };
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    });
  }
});

app.get('/logout', function(req, res) {
  if (!req.user) {
    req.logout();
    res.redirect(
      Meteor.settings.ssoAdministrator.loginProvider +
        '/provider/logout?redirect_url=' +
        host +
        '/login'
    );
  } else {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    var options = {
      url: Meteor.settings.ssoAdministrator.loginProvider + '/logout-hydra',
      method: 'POST',
      headers: headers,
      form: {
        sub: req.session.sub,
      },
    };

    request(options, function(error, response, body) {
      req.logout();
      res.redirect(
        Meteor.settings.ssoAdministrator.loginProvider +
          '/provider/logout?redirect_url=' +
          host +
          '/login'
      );
    });
  }
});

app.post('/user-permission', function(req, res) {
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  var options = {
    url: Meteor.settings.ssoAdministrator.loginProvider + '/provider/user-permission',
    method: 'POST',
    headers: headers,
    form: {
      sub: req.body.sub,
      client: req.body.client,
      action: req.body.action,
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.get('/image-server/:type/:filename', function(req, res) {
  // var options = {
  //   url:
  //     'https://accounts.davaocity.gov.ph/image-server/' +
  //     req.params.type +
  //     '/' +
  //     encodeURIComponent(req.params.filename),
  //   method: 'GET',
  //   encoding: null,
  // };

  // request(options, function(error, response, body) {
  //   if (body.toString == '404') {
  //     res.set({ 'Content-Type': 'text/html' });
  //     res.send('404');
  //   } else {
  //     if (!error && response.statusCode == 200) {
  //       res.set({ 'Content-Type': 'image/jpg' });
  //       res.send(body);
  //     } else {
  //       res.set({ 'Content-Type': 'image/jpg' });
  //       res.send(body);
  //     }
  //   }
  // });

  res.set({ 'Content-Type': 'text/html' });
  res.send('404');
});

app.get('/signature-server/:type/:filename', function(req, res) {
  var headers = {
    Authorization: 'bearer ' + req.user.accessToken,
  };

  var options = {
    url:
      Meteor.settings.ssoAdministrator.apiProxy +
      '/photos/signature-server/' +
      req.params.type +
      '/' +
      req.params.filename,
    method: 'GET',
    headers: headers,
    encoding: null,
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.set({ 'Content-Type': 'image/jpg' });
      res.send(body);
    }
  });
});

app.post('/upload-image', function(req, res) {
  var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  var options = {
    url: 'https://accounts.davaocity.gov.ph/upload-image',
    method: 'POST',
    headers: headers,
    json: {
      data: req.body.data,
      name: req.body.name,
      type: req.body.type,
    },
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/upload-signature', function(req, res) {
  var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  var options = {
    url: 'https://accounts.davaocity.gov.ph/upload-signature',
    method: 'POST',
    headers: headers,
    json: {
      data: req.body.data,
      name: req.body.name,
      type: req.body.type,
    },
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/graphql', function(req, res) {
  var headers = {
    token: req.user.accessToken,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  var options = {
    url: 'https://accounts.davaocity.gov.ph/proxy/api',
    method: 'POST',
    headers: headers,
    json: {
      query: req.body.query,
    },
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/graphqlv2', function(req, res) {
  var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  var options = {
    url: 'http://111.125.114.29:13000/v2/graphql',
    method: 'POST',
    headers: headers,
    json: {
      query: req.body.query,
    },
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.get('/clear-sessions', function(req, res) {
  req.logout();
  res.redirect(
    Meteor.settings.ssoAdministrator.loginProvider + '/provider/logout?redirect_url=' + host
  );
});

WebApp.connectHandlers.use(app);
