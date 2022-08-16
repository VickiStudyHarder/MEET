import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-2_NZu9NL9II",
  ClientId: "4lular3csgpm8dfa8t634r5fch",
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
