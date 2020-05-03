module.exports = {
  servers: {
    hrmo: {
      host: '122.2.5.187',
      username: 'marvin',
      password: 'maskg1976',
      opts: {
        port: 1215
      }
    }
  },

  app: {
    // TODO: change app name and path
    name: 'easara',
    path: '../',
    type: 'meteor',

    servers: {
      hrmo: {},
    },

    buildOptions: {
      serverOnly: true,
      debug: false,
      buildLocation: '/home/jake/Documents/builds/easara',
    },

    env: {
      // ROOT_URL: 'http://conferencerooms.hrmis.davaocity.gov.ph',
      ROOT_URL: 'http://192.168.1.15',
      PORT: 8900,
      // MONGO_URL: 'mongodb://mongodb:27017/hrmis-portal',
    },

    docker: {
      image: 'abernix/meteord:node-8.4.0-base',
      args: ['--net=sso_intranet', '--ip=172.28.0.17', '--link=auth-server-mysql:mysqld']
    },

    deployCheckWaitTime: 60,
    enableUploadProgressBar: true
  },
};
