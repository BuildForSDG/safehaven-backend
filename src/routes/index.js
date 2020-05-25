import express from 'express';
import auth from './auth';
import patients from './patients';
import consultants from './consultants';

export default (app) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to safeHaven API'
  }));

  app.use('/api/v1/auth', [
    auth
  ]);

  app.use('/api/v1/patients', [
    patients
  ]);

  app.use('/api/v1/consultants', [
    consultants
  ]);

  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));

  app.use((error, req, res) => {
    // don't print stack traces in production environment
    if (app.get('env') !== 'production') console.log(error.stack);
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: 'Internal Server Error'
    });
  });
};
