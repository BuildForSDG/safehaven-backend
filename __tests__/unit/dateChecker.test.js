import { expect } from 'chai';
import { checkExpiredToken } from '../../src/utils/dateChecker';


describe('Test token date checker', () => {
  const date = new Date('08/09/2019');
  it('Should return an integer', (done) => {
    const diff = checkExpiredToken(date);
    expect(diff).to.be.a('number');
    done();
  });
});
