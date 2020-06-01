import fs from 'fs';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src';
import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const { User, Consultant, AvailableTime } = model;

chai.use(chaiHttp);

describe('Consultant onboarding', async () => {
  const testConsultant = {
    uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacdc',
    surName: 'Ayooluwaaaa',
    firstName: 'Olosundeeee',
    middleName: 'lovisgodrr',
    email: 'susan.abioya@kodehauz.com',
    password: hashPassword('Password112'),
    phone: '07012221112',
    role: 'consultant',
    verified: true,
    gender: 'male',
    dateOfBirth: '05/06/1994',
    nationality: 'Nigerian',
    address: 'No 34B Ewet, Housing Estate',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  before(async () => {
    await User.destroy({ where: {}, force: true });
    await User.create(testConsultant);
    await Consultant.destroy({ where: {}, force: true });
    await AvailableTime.destroy({ where: {}, force: true });
  });

  describe('User can signup as consultant', () => {
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
  describe('consultant login and specify its consulting available time', () => {
    let token;
    it('Should sign in user with correct email and password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'susan.abioya@kodehauz.com',
          password: 'Password112'
        })
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.status).to.equal(200);
          expect(res.body.data).to.have.property('token');
          expect(token).to.be.eql(res.body.data.token);
          done();
        });
    });
    it('Should select available days and time', (done) => {
      chai.request(app)
        .post('/api/v1/select-available-time')
        .set('authorization', `Bearer ${token}`)
        .send({
          availableTime: ['THUR, 13:00pm', 'FRI, 14:00pm']
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.eql('operation successful');
          done();
        });
    });
    it('Should display available time for a particular consultant', (done) => {
      chai.request(app)
        .get('/api/v1/available-time')
        .query({
          consultantUuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacdc'
        })
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
  });
});
