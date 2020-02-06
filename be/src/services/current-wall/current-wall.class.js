
/* eslint-disable no-unused-vars */
const cache = {
  walls: [],
  votes: [],
};
exports.CurrentWall = class CurrentWall {
  constructor (options) {
    this.options = options || {};
    this.app = options.app;
  }

  async create(params) {
    console.dir(params);
    return {};
  }

  find(params) {
    const { walls } = cache;
    // lets keep the ongoing wall in cache
    if (
      walls.length > 0 //&&
      // walls[0].dataValues.endsAt > Date.now()
    ) {
      console.log('from cache');
      return Promise.resolve(walls);
    } else {
      console.log('from database');
      cache.walls = [];
      return this.app.service('walls').find({
        query: {
          startsAt: { $lte: new Date().toISOString() },
          // endsAt: { $gt: new Date().toISOString() },
          $limit: 1,
        },
      })
        .then((result) => {
          cache.walls = result;
          return result;
        });
    }
  }
};
