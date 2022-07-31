const GOOGLE_CLIENT_ID =
  '782858661732-0gqlc5n856gk2b943tpl3ebarpcdhfdg.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
);

export default oauth2Client;