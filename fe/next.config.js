const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
  env: {
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY || '6Lc1bdAUAAAAAJpZDL22jcVtljRchWWanaYPVqfi',
    API_URL: process.env.API_URL || 'http://localhost:3030',
  },
});
