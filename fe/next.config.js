const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
  env: {
    RECAPTCHA_KEY: '6Lc1bdAUAAAAAJpZDL22jcVtljRchWWanaYPVqfi',
    SERVER_URL: 'http://localhost:3030',
  },
});
