/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';
import { createToken } from '../../src/utils/processToken';

const { User } = model;


chai.use(chaiHttp);

describe('User Auth', () => {
  const testUser = {
    uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacda',
    surName: 'Ayooluwa',
    firstName: 'Olosunde',
    middleName: 'lovisgod',
    email: 'susan.abioye@kodehauz.com',
    password: hashPassword('Password111'),
    phone: '07012221111',
    role: 'patient',
    verified: true,
    gender: 'male',
    dateOfBirth: '05/06/1994',
    nationality: 'Nigerian',
    address: 'No 34B Ewet, Housing Estate',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  before(async () => User.destroy({ where: {}, force: true }));
  before(async () => { await User.create(testUser); });
  after(async () => User.destroy({ where: {}, force: true }));

  describe('User Login API', () => {
    it('Should sign in user with correct email and password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'susan.abioye@kodehauz.com',
          password: 'Password111'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('token');
          done();
        });
    });

    it('Should not sign in unregistered user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'rebecca.jerome@alp.com',
          password: 'Password1113'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql('error');
          done();
        });
    });

    it('Should not sign in a user with incorrect password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'susan.abioye@kodehauz.com',
          password: 'Password'
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(400);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });

  describe('User verify API', () => {
    it('Should not verify incorrect token', (done) => {
      chai.request(app)
        .get('/api/v1/auth/verification/jkkdfjkdkfjkakjfkdfkdkfkdjfkfkdjfkdkfkjdkfjkfj.jdkf/email@email.com')
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });
});
