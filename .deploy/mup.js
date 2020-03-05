module.exports = {
  servers: {
    hrmo: {
      host: '192.168.1.15',
      username: 'hr_devtm',
      password: 'd3vgrup@HR.m0',
      opts: {
        port: 1212
      }
    }
  },

  app: {
    // TODO: change app name and path
    name: 'easara',
    path: '/home/jake/Documents/meteor_apps/easara',
    type: 'meteor',

    servers: {
      hrmo: {},
    },

    buildOptions: {
      serverOnly: true,
      debug: false,
      buildLocation: '/home/jake/Documents/meteor_apps/builds',
    },

    env: {
      // ROOT_URL: 'http://conferencerooms.hrmis.davaocity.gov.ph',
      ROOT_URL: 'http://192.168.1.15',
      PORT: 8900,
      // MONGO_URL: 'mongodb://mongodb:27017/hrmis-portal',
    },

    docker: {
      image: 'abernix/meteord:node-8.4.0-base',
      args: ['--net=sso_intranet', '--ip=172.28.0.14', '--link=auth-server-mysql:mysqld']
    },

    deployCheckWaitTime: 60,
    enableUploadProgressBar: true
  },
};
