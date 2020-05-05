/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import nodemailerMock from 'nodemailer-mock';
import { options } from '../../src/config/nodemailer-config';

const transport = nodemailerMock.createTransport(options);

chai.should();

/* Test the nodemailer module */
describe('email sender test', () => {
  it('it should send an emial', (done) => {
    transport.sendMail('this is a sample mail', (err, info) => {
      if (err) {
        console.log(err);
      }
      info.response.should.equal('nodemailer-mock success');
    });
    done();
  });
});
