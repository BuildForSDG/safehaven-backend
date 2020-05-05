import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { createToken, verifyToken } from '../../src/utils/processToken';

chai.use(chaiHttp);

describe('Process token', () => {
  const email = 'johndoe@email.com';
  const token = createToken({ email });
  const verifiedToken = verifyToken(token);

  it('Should return a generated token string', (done) => {
    expect(token).to.be.a('string');
    done();
  });

  it('Should return the value of decoded token', (done) => {
    expect(verifiedToken).to.be.an('object');
    expect(verifiedToken).to.have.property('email').eql('johndoe@email.com');
    done();
  });
});
