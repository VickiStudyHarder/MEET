import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-southeast-2_80AEsZTHQ',
  ClientId: '1ptalnb3vg17foe3la0d5aujrn',
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
