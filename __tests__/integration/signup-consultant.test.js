import fs from 'fs';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';
import model from '../../src/models';

const { User, Consultant } = model;

chai.use(chaiHttp);

describe('Consultant onboarding', async () => {
  before(async () => {
    User.destroy({ where: {}, force: true });
    Consultant.destroy({ where: {}, force: true });
  });

  describe('User can signup as patient or consultant', () => {
    it('Should be able to sign up with correct input format', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup-consultant')
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('email', 'kk@kodehauqz.com')
        .field('password', 'Pas1sdsds')
        .field('phone', '070122271191')
        .field('specialization', 'psychologist')
        .field('gender', 'male')
        .attach('validCertificate', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('validIdCard', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('avatar', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.equal('User account succesfully created');
          done();
        });
    });

    it('Should not be able to sign up with existing phone number', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup-consultant')
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('email', 'kk@kodehauze.com')
        .field('password', 'Passw1sdsds')
        .field('phone', '070122271191')
        .field('specialization', 'psychologist')
        .field('gender', 'male')
        .attach('validCertificate', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('validIdCard', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('avatar', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.msg).to.eql('Phone already in use');
          expect(res.body.error.param).to.eql('phone');
          done();
        });
    });


    it('Should not be able to sign up with existing email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup-consultant')
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('email', 'kk@kodehauqz.com')
        .field('password', 'Passw1sdsds')
        .field('phone', '070122911912')
        .field('specialization', 'psychologist')
        .field('gender', 'male')
        .attach('validCertificate', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('validIdCard', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('avatar', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
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
        .post('/api/v1/auth/signup-consultant')
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'kkkodehauz.com')
        .field('password', 'Password111')
        .field('phone', '07013229811')
        .field('specialization', 'psychologist')
        .field('gender', 'male')
        .attach('validCertificate', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('validIdCard', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('avatar', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.msg).to.eql('Invalid value');
          expect(res.body.error.param).to.eql('email');
          done();
        });
    });

    it('Should prompted user to input password of 8 or more characters on user input 7 characters or less', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup-consultant')
        .field('surName', 'Olaf')
        .field('firstName', 'Jeremy')
        .field('middleName', 'Mason')
        .field('email', 'kk@koajwdehauz.com')
        .field('password', 'Passw1')
        .field('phone', '070122297111')
        .field('specialization', 'psychologist')
        .field('gender', 'male')
        .attach('validCertificate', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('validIdCard', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .attach('avatar', fs.readFileSync(`${__dirname}//ayo.jpg`), `${__dirname}//ayo.jpg`)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.msg).to.eql('Invalid value');
          expect(res.body.error.param).to.eql('password');
          done();
        });
    });
  });
});
