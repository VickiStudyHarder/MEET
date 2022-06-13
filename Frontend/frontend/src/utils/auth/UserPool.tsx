import {CognitoUserPool} from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'ap-southeast-2_gWh7BF3l8',
    ClientId: '5f5e8roqtc1b19r98jha7096so'
}

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
