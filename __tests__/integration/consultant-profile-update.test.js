import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../../src';
import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const { User } = model;

chai.use(chaiHttp);

const testUser = {
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

describe('Consultant profile update', async () => {
  let token = '';

  before(async () => User.destroy({ where: { email: 'susan.abioye@kodehauz.com' } }));
  before(async () => User.destroy({ where: { email: 'kk@kodeqz.com' } }));
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

  describe('User can update personal profile', () => {
    it('Should be able to update profile with valid token', (done) => {
      chai.request(app)
        .patch(`/api/v1/consultants/profile/${token}`)
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'kk@kodeqz.com')
        .field('phone', '0701527121')
        .field('specialization', 'Psychologist')
        .field('gender', 'male')
        .attach('avatar', '')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.equal('Account Succesfully updated');
          done();
        });
    });

    it('Should not be able to update profile with invalid token', (done) => {
      chai.request(app)
        .patch(`/api/v1/consultants/profile/${token}akjkjkja`)
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'kk@kodehassqz.com')
        .field('phone', '07015271191')
        .field('specialization', 'Psychologist')
        .field('gender', 'male')
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          done();
        });
    });

    it('Should not be able to update with existing users email', (done) => {
      chai.request(app)
        .patch(`/api/v1/consultants/profile/${token}`)
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'jabathehuth@gmail.com')
        .field('phone', '070122661912')
        .field('specialization', 'Psychologist')
        .field('gender', 'male')
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.msg).to.eql('E-mail already in use');
          expect(res.body.error.param).to.eql('email');
          done();
        });
    });

    it('Should be prompted to input correct email format on incorrect email format', (done) => {
      chai.request(app)
        .patch(`/api/v1/consultants/profile/${token}`)
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'kkkodehauz.com')
        .field('phone', '070132298411')
        .field('specialization', 'Psychologist')
        .field('gender', 'male')
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.msg).to.eql('Invalid value');
          expect(res.body.error.param).to.eql('email');
          done();
        });
    });

  });
});
