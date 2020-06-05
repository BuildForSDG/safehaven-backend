import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../../src';
import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const io = require('socket.io-client');

const options = {
  transports: ['websocket']
};

const socketURL = 'http://0.0.0.0:9000';


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

const testUserDuplicate = {
  surName: 'Ayooluwa',
  firstName: 'Olosunde',
  middleName: 'lovisgod',
  email: 'susan@ab2ioye.com',
  password: hashPassword('Password111'),
  phone: '070122221001',
  role: 'patient',
  verified: true,
  gender: 'male',
  dateOfBirth: '05/06/1994',
  nationality: 'Nigerian',
  address: 'No 34B Ewet, Housing Estate'
};


describe('Socket connection and functions', async () => {
  let token = '';

  before(async () => { await User.destroy({ where: {}, force: true }); });
  before(async () => { await User.create(testUser); });
  before(async () => { await User.create(testUserDuplicate); });
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

  describe('Socket connection', () => {
    it('Should be able to connect with correct token', (done) => {
      const clientx = io.connect(socketURL, options);

      clientx.on('login_success', (response) => {
        console.log('this is here');
        expect(response.message).to.eql('connection successful');
      });
      // eslint-disable-next-line no-unused-vars
      clientx.on('connect', (data) => {
        clientx.emit('authenticate', { token });
      });
      done();
    });
  });
});
