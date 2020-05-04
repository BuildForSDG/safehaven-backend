const rp = require('request-promise');
const dotEnv = require('dotenv');

dotEnv.config();

const apiUrl = 'https://api.paystack.co';

const getBanks = async () => {
  try {
    const options = {
      method: 'GET',
      uri: `${apiUrl}/bank`,
      json: true,
    };
    const { data } = await rp(options);
    const banks = data.map(x => ({ name: x.name, code: x.code }));
    return banks;
  } catch (e) {
    console.log(e.message);
  }
};

const verifyAccount = async (accountNumber, code) => {
  try {
    const options = {
      method: 'GET',
      uri: `${apiUrl}/bank/resolve`,
      qs: {
        account_number: accountNumber,
        bank_code: code,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
        'Cache-Control': 'no-cache',
      },
      json: true,
    };
    const { data } = await rp(options);
    return data;
  } catch (e) {
    console.log(e.error.message);
    return { account_number: 'null', account_name: e.error.message, bank_id: 'null' };
  }
};

const createRecipient = async (type, name, description, account_number, bank_code, currency) => {
  try {
    const options = {
      method: 'POST',
      uri: `${apiUrl}/transferrecipient`,
      body: {
        type,
        name,
        description,
        account_number,
        bank_code,
        currency,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    return data.recipient_code;
  } catch (e) {
    console.log(e.error);
    return 'error';
  }
};

const tokenize = async (card, email) => {
  try {
    const {
      cvv, expiry_month, expiry_year, number,
    } = card;
    const options = {
      method: 'POST',
      uri: `${apiUrl}/charge/tokenize`,
      body: {
        card: {
          cvv,
          expiry_month,
          expiry_year,
          number,
        },
        email,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    if (data) return data.authorization_code;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const charge = async (amount, email, authorization_code, name, pin) => {
  try {
    const metadata = {
      custom_fields: [
        {
          value: 'MediaMall',
          display_name: `Wallet loading by ${name}`,
          variable_name: `Wallet loading by ${name}`,
        },
      ],
    };
    const options = {
      method: 'POST',
      uri: `${apiUrl}/charge`,
      body: {
        email,
        amount: parseInt(amount, 10) * 100,
        metadata,
        pin,
        authorization_code,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    console.log(data);
    console.log(`status -> ${data.status}`, `message -> ${data.message}`);
    if (data) return { status: data.status, message: data.display_text, ref:data.reference || '' };
  } catch (e) {
    console.log(e.error);
    return { status: 'error', message: e.error.data.message };
  }
};
 // submit otp sent to the user for completing a transaction
 const sendOtp = async (otp, reference) => {
  try {
    const options = {
      method: 'POST',
      uri: `${apiUrl}/charge/submit_otp`,
      body: {
       otp,
       reference
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    console.log(data);
    console.log(`status -> ${data.status}`, `message -> ${data.message}`);
    if (data) return { status: data.status, message: data.message || 'Successful' };
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const transfer = async (amount, recipient) => {
  try {
    const source = 'balance';
    const reason = 'withdrawer';
    const currency = 'NGN';
    const options = {
      method: 'POST',
      uri: `${apiUrl}/transfer`,
      body: {
        amount: parseInt(amount, 10) * 100,
        source,
        reason,
        currency,
        recipient,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    // console.log(data);
    console.log(`status -> ${data.status}`, `message -> ${data.message}`);
    if (data) return { status: 'success', message: 'success' };
  } catch (e) {
    console.log(e.error);
    return { status: 'error', message: e.error.message };
  }
};

const updateRecipient = async (name, email, reference_id) => {
  try {
    const options = {
      method: 'PUT',
      uri: `${apiUrl}/transferrecipient/${reference_id}`,
      body: {
        name,
        email,
      },
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_CODE}`,
      },
      json: true,
    };
    const { data } = await rp(options);
    return data.recipient_code;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

module.exports = {
  getBanks, verifyAccount, createRecipient, tokenize, charge, transfer, updateRecipient, sendOtp
};
