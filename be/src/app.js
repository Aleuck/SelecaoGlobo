const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

app.on('sequelizeSync', () => {
  // Create default user
  app.service('users').create(app.get('defaultUser'))
    .then(() => {
      logger.info('Default user created.');

      Promise.resolve()
        .then(() => {
          logger.info('Creating initial data:');
          logger.info(' - season');
          return app.service('seasons').create({
            title: '2020',
            startsAt: new Date('2020-01-21T12:00:00.000-03:00').toISOString(),
            endsAt: new Date('2020-12-18T23:00:00.000-03:00').toISOString(),
          });
        })
        .then(season => {
          logger.info(' - participants');
          return Promise.all([
            app.service('participants').create({
              seasonId: season.id,
              name: 'Participante 1',
              image: '2887b6af8175a6e20880c0dde8f1c9ae9cf0cbb9b79b7ec1f5910313daa8693d.png',
            }),
            app.service('participants').create({
              seasonId: season.id,
              name: 'Participante 2',
              image: '4bb3630816c607757a12af214da0c8aa417766ccce3d5b6255ea9a18f853144a.png',
            }),
          ])
            .then(participants => {
              logger.info(' - wall');
              const startsAt = new Date();
              startsAt.setUTCHours(23, 0, 0, 0);
              const endsAt = new Date();
              endsAt.setUTCHours(3, 0, 0, 0);
              endsAt.setUTCDate(startsAt.getUTCDate() + 1);

              return app.service('walls').create({
                title: 'Paredão 1',
                seasonId: season.id,
                startsAt: startsAt.toISOString(),
                endsAt: endsAt.toISOString(),
              }).then(wall => {
                logger.info(' - wall participants');
                return Promise.all([
                  app.service('walls-participants').create({
                    participantId: participants[0].id,
                    wallId: wall.id,
                    callNumber: '0800-123-01',
                    smsNumber: '8001',
                  }),
                  app.service('walls-participants').create({
                    participantId: participants[1].id,
                    wallId: wall.id,
                    callNumber: '0800-123-02',
                    smsNumber: '8002',
                  }),
                ]);
              });
            });
        })
        .catch(reason => {
          console.log('Failed to create initial data:', reason);
        });
    })
    .catch(() => {
      // Default user already exists
    });
});

module.exports = app;
