const { Unavailable } = require('@feathersjs/errors');
/* eslint-disable no-unused-vars */
const cache = {
  walls: [],
  votes: [],
};
exports.CurrentWall = class CurrentWall {
  constructor (options) {
    this.options = options || {};
    this.app = options.app;

    setInterval(() => {
      if (cache.votes.length > 0) {
        const start = Date.now();
        this.app.service('votes').create(cache.votes);
        cache.votes = [];
        console.log('duration:', Date.now() - start);
      }
    }, 30 * 1000);
  }

  getCurrentWall() {
    const { walls } = cache;
    // lets keep the ongoing wall in cache
    if (
      walls.length > 0
      // walls[0].dataValues.endsAt > Date.now()
    ) {
      return Promise.resolve(walls);
    } else {
      cache.walls = [];
      return this.app.service('walls').find({
        query: {
          startsAt: { $lte: new Date().toISOString() },
          // endsAt: { $gt: new Date().toISOString() },
          $sort: {
            startsAt: -1, // descending
          },
          $limit: 1,
        },
      })
        .then((result) => {
          cache.walls = result;
          return result;
        });
    }
  }

  async create(data, params) {
    // this.checkCaptcha(data)
    return Promise.resolve()
      .then(() => this.getCurrentWall())
      .then(currentWall => {
        if (
          currentWall[0] &&
          currentWall[0].dataValues.endsAt > Date.now()
        ) {
          if (currentWall[0].dataValues.participants.find(
            (participant) => participant.walls_participants.id === data.vote
          )) {
            console.log('enqueued');
            cache.votes.push({
              vote: data.vote,
              createdAt: new Date(),
            });
            return {
              success: true,
            };
          }
        }
        else {
          throw new Unavailable('Nenhum parerdão em andamento.');
        }
      });
  }

  find(params) {
    return this.getCurrentWall();
  }
};
