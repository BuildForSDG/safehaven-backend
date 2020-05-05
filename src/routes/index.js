import express from 'express';
import auth from './auth';

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to safeHaven API'
  }));

  app.use('/api/v1', [
    auth
  ]);

  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    // don't print stack traces in production environment
    // eslint-disable-next-line no-console
    if (app.get('env') !== 'production') console.log(error.stack);
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: 'Internal Server Error'
    });
  });
};
