/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';

import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const { User } = model;

chai.use(chaiHttp);

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

let token = '';

describe('users should be able to view profile(s)', () => {
  before(async () => User.destroy({ where: { email: 'susan.abioye@kodehauz.com' } }));
  before(async () => { await User.create(testUser); });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'susan.abioye@kodehauz.com',
        password: 'Password111'
      })
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  describe('Patient profile access', () => {
    it('Should not be accessible by empty endpoint', (done) => {
      const end = '';
      chai.request(app)
        .get(`/api/v1/profile/${end}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Should access profile with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/profile/${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('Should access profile with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/profile/${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('Should access all patient profiles with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/patients/${token}`)
        .end((err, res) => {
          console.log('res.body.data[0]');
          console.log(res.body.data[0]);
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.above(0);
          done();
        });
    });

    it('Should not access profile with incorrect token', (done) => {
      chai.request(app)
        .get(`/api/v1/patients/${`${token}iiiiiii`}`)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });

  testUser.role = 'consultant';
  before(async () => User.destroy({ where: { email: 'susan.abioye@kodehauz.com' } }));
  before(async () => { await User.create(testUser); });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'susan.abioye@kodehauz.com',
        password: 'Password111'
      })
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });

  describe('Consultant profile access', () => {
    it('Should not be accessible by empty endpoint', (done) => {
      const endpoint = '';
      chai.request(app)
        .get(`/api/v1/profile/${endpoint}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('Should access profile with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/profile/${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('Should access profiles with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/consultants/${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0]).to.have.property('email');
          done();
        });
    });

    it('Should access profile with correct token', (done) => {
      chai.request(app)
        .get(`/api/v1/profile/${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('email');
          done();
        });
    });
  });
});
