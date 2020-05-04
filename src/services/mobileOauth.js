const { OAuth2Client } = require('google-auth-library');
const dotEnv = require('dotenv');
const rp = require('request-promise');

dotEnv.config();
const CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
const client = new OAuth2Client(CLIENT_ID);
const verifyGoogle = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
    const { email } = payload;
    const name = `${payload.given_name} ${payload.family_name}`;
    const image = payload.picture;
    // eslint-disable-next-line prefer-object-spread
    const user = Object.assign({}, {
      userid, email, name, image,
    });
    return user;
  } catch (error) {
    console.log(error);
    return 'Error';
  }
};

const verifyFacebook = async (accessToken) => {
  let user;
  try {
    const options = {
      uri: 'https://graph.facebook.com/me?fields=name,email',
      qs: {
        access_token: accessToken,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    await rp(options)
      .then((res) => {
        user = res;
      });
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { verifyGoogle, verifyFacebook };
