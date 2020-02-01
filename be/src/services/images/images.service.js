const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');

const multer = require('multer');

const multipartMiddleware = multer();

const hooks = require('./images.hooks');

// Upload Service
module.exports = function (app) {
  const options = {
    Model: blobStorage
  };

  app.use('/images',
    // parses file
    multipartMiddleware.single('uri'),
    // transfer the received file to feathers
    function (req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService(options)
  );

  const service = app.service('images');
  service.hooks(hooks);
};
