import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../../src';

chai.use(chaiHttp);

describe('Booking appointments', async () => {
  let token = '';

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'olifedayo94@gmail.com',
        password: 'Password111'
      })
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });

  describe('Patients can book appointments', () => {
    it('Should be able to book appointments with valid token', (done) => {
      chai.request(app)
        .post(`/api/v1/appointments/${token}`)
        .field('dateTime', '2020-06-15 12:34:14')
        .field('consultant_uuid', 'f75795cf-845a-4f94-823c-261717d661be')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.equal('Appointment booking successful');
          done();
        });
    });

    it('Should not be able to book with invalid token', (done) => {
      chai.request(app)
        .patch(`/api/v1/profile/${token}akjkjkja`)
        .field('dateTime', '2020-06-15 12:34:14')
        .field('consultant_uuid', 'f75795cf-845a-4f94-823c-261717d661be')
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          done();
        });
    });

    it('Should not be able to book appointment with empty request body', (done) => {
      chai.request(app)
        .patch(`/api/v1/profile/${token}`)
        .field('dateTime', '')
        .field('consultant_uuid', '')
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          done();
        });
    });

    it('Should be able to check booked appointments with valid token', (done) => {
      chai.request(app)
        .get(`/api/v1/appointments/${token}`)
        .end((err, res) => {
          console.log('res.body.data.consultant ::::::: ');
          console.log(res.body.data);
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          done();
        });
    });

    it('Should not be able to check booked appointments with invalid token', (done) => {
      chai.request(app)
        .get(`/api/v1/profile/${token}akjkjkja`)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.status).to.eql('error');
          done();
        });
    });
  });
});
