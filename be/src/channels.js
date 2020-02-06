module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    if(connection) {
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  // app.publish((data, hook) => {
  //   return app.channel('authenticated');
  // });

  // services to publish events to all authenticated users
  [
    app.service('seasons'),
    app.service('participants'),
    app.service('walls'),
    app.service('walls-participants'),
  ].forEach( service => service.publish( () => app.channel('authenticated') ) );

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
