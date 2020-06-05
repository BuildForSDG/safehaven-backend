import { describe, it } from 'mocha';
import { expect } from 'chai';
import 'chai/register-should';
import auth from '../../src/database/input-validator/auth';
import model from '../../src/models';
import { hashPassword } from '../../src/utils/passwordHash';

const { User } = model;

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

describe('Test contact duplicate validation module', () => {
  describe(' Test true', () => {
    let emailIsTaken = false;
    let numberIsTaken = false;
    let notOwnNumber = false;

    before(async () => User.destroy({ where: { email: 'susan.abioye@kodehauz.com' } }));
    before(async () => {
      try {
        await User.create(testUser);
        emailIsTaken = await auth.emailIsTaken('susan.abioye@kodehauz.com');
        numberIsTaken = await auth.numberIsTaken('07012221111');
        notOwnNumber = await auth.notOwnNumber('070122211110', 'susan.abioye@kodehauz.com');
        expect(emailIsTaken).to.be.a('boolean');
        expect(numberIsTaken).to.be.a('boolean');
        expect(notOwnNumber).to.be.a('boolean');
      } catch (error) {
        console.log('Auth unit test data seed error error');
        console.log(error);
      }
    });

    it('Should return true for number taken', () => {
      expect(emailIsTaken).to.be.a('boolean');
      expect(emailIsTaken).to.eql(true);
    });

    it('Should return true for email taken', () => {
      expect(numberIsTaken).to.be.a('boolean');
      expect(numberIsTaken).to.eql(true);
    });

    it('Should return true for number is user\'s', () => {
      expect(notOwnNumber).to.be.a('boolean');
      expect(notOwnNumber).to.eql(true);
    });
  });

  describe(' Test false', () => {
    let emailIsTaken = true;
    let numberIsTaken = true;
    let notOwnNumber = true;

    before(async () => User.destroy({ where: { email: 'susan.abioye@kodehauz.com' } }));
    before(async () => {
      try {
        await User.create(testUser);
        emailIsTaken = await auth.emailIsTaken('susan.abioye13@kodehauz.com');
        numberIsTaken = await auth.numberIsTaken('9070121111');
        notOwnNumber = await auth.notOwnNumber('07012221111', 'susan.abioye@kodehauz.com');
        expect(emailIsTaken).to.be.a('boolean');
        expect(numberIsTaken).to.be.a('boolean');
        expect(notOwnNumber).to.be.a('boolean');
      } catch (error) {
        console.log('Auth unit test data seed error error');
        console.log(error);
      }
    });

    it('Should return false for email not taken', () => {
      expect(emailIsTaken).to.be.a('boolean');
      expect(emailIsTaken).to.eql(false);
    });

    it('Should return false for number not taken', () => {
      expect(numberIsTaken).to.be.a('boolean');
      expect(numberIsTaken).to.eql(false);
    });

    it('Should return false for number not user\'s', () => {
      expect(notOwnNumber).to.be.a('boolean');
      expect(notOwnNumber).to.eql(false);
    });
  });
});
