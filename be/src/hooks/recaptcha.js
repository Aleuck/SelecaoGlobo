const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const { TooManyRequests } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return context => {
    const params = new URLSearchParams();
    params.append('secret', context.app.get('recaptchaSecretKey'));
    params.append('response', context.data.captcha);
    return fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    })
      .then(res => {
        console.log('recaptcha response size', res.size);
        return res.json();
      })
      .then(res => {
        console.log(res);
        if (res.success === true) {
          return context;
        } else {
          throw new TooManyRequests('reCaptcha validation failed');
        }
      });
    // return context;
  };
};
