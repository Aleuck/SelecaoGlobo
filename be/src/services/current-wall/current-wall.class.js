const { Unavailable } = require('@feathersjs/errors');
const { Op } = require('sequelize');
/* eslint-disable no-unused-vars */

const cache = {
  walls: [], // cache wall data so we don't need to query database as often
  votes: [], // will hold votes before inserting them into database in bulk
};

// wall results are arbitrarily available for 7 days after wall ends.
const availableDurationAfterWallEnds = 1000 * 60 * 60 * 24 * 7;

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
    }, 10 * 1000);
  }

  normalizeWall(wall) {
    const data = wall.dataValues;
    console.log('data',data.participants[0].dataValues);
    return {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      participants: data.participants.map(p => ({
        id: p.dataValues.walls_participants.dataValues.id,
        name: p.dataValues.name,
        image: p.dataValues.image,
        callNumber: p.dataValues.walls_participants.dataValues.callNumber,
        smsNumber: p.dataValues.walls_participants.dataValues.smsNumber,
      }))
    };
  }

  getCurrentWall() {
    const { walls } = cache;
    // lets keep the ongoing wall in cache
    if (
      walls.length > 0 &&
      walls[0].endsAt + (availableDurationAfterWallEnds) <= Date.now()
    ) {
      return Promise.resolve(walls);
    } else {
      cache.walls = [];
      return this.app.service('walls').find({
        query: {
          startsAt: { $lte: new Date().toISOString() },
          endsAt: { $gt: new Date(Date.now() - (availableDurationAfterWallEnds)).toISOString() },
          $sort: {
            startsAt: -1, // descending
          },
          $limit: 1,
        },
      })
        .then((result) => {
          const normalizedResult = result.map(this.normalizeWall);
          cache.walls = normalizedResult;
          return normalizedResult;
        });
    }
  }

  async create(data, params) {
    return Promise.resolve()
      .then(() => this.getCurrentWall())
      .then(currentWall => {
        if (
          currentWall[0] &&
          currentWall[0].endsAt > Date.now()
        ) {
          if (currentWall[0].participants.find(
            (participant) => participant.id === data.vote
          )) {
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

  // we will get cached wall data if possible
  // but always live vote count
  find(params) {
    return this.getCurrentWall()
      .then(walls => {
        const currentWall = walls[0];
        if (currentWall) {
          const Votes = this.app.service('votes').Model;

          return Votes.count({
            attributes: ['vote'],
            group: 'vote',
            where: {
              vote: {
                [Op.in]: currentWall.participants.map(
                  p => p.id
                )
              }
            },
          }).then(votes => {
            currentWall.participants.forEach((participant, index) => {
              const voteCount = votes.find(v => participant.id === v.vote);
              participant.votes = voteCount ? voteCount.count : 0;
            });
            return walls;
          });
        } else {
          return walls;
        }
      });
  }
};
