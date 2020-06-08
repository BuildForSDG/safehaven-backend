import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../../src';
import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const { User, Consultant } = model;

chai.use(chaiHttp);

const testUser = {
  surName: 'Ayooluwaa',
  firstName: 'Olosundea',
  middleName: 'lovisgodd',
  email: 'olifedayo94@gmail.com',
  password: hashPassword('Password111'),
  phone: '07012221111',
  role: 'admin',
  verified: true,
  gender: 'male',
  dateOfBirth: '05/06/1994',
  nationality: 'Nigerian',
  address: 'No 34B Ewet, Housing Estate',
  createdAt: new Date(),
  updatedAt: new Date()
};

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

const consultantDetails = {
  uuid: '46204aae-fb3b-4d73-b9dd-725d70078191',
  user_uuid: 'b38fcf44-b77f-4149-8d66-454d7a5eacdc',
  specialization: 'psychologist',
  certificate: 'demo_url',
  validIdCard: 'demo_url',
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('Admin validate consultant', async () => {
  let adminToken = '';
  let userToken = '';

  before(async () => { await User.destroy({ where: {}, force: true }); });
  before(async () => { await Consultant.destroy({ where: {}, force: true }); });
  before(async () => { await User.create(testUser); });
  before(async () => { await User.create(testConsultant); });
  before(async () => { await Consultant.create(consultantDetails); });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'olifedayo94@gmail.com',
        password: 'Password111'
      })
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'susan.abioya@kodehauz.com',
        password: 'Password112'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });

  describe('Admin can validate a consultant', () => {
    it('Should be able to validate a consultant when the role is admin', (done) => {
      chai.request(app)
        .put(`/api/v1/admin/validate-consultant-credentials/${testConsultant.uuid}`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.equal('Consultant has been verified successfully');
          done();
        });
    });

    it('Should not be able to validate consultant when the role is not admin', (done) => {
      chai.request(app)
        .put(`/api/v1/admin/validate-consultant-credentials/${testConsultant.uuid}`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.equal('error');
          expect(res.body.error).to.equal('Access denied');
          done();
        });
    });
  });
});
