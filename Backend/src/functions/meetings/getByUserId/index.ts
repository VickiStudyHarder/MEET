//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'meeting/{userId}/user',
        //cors: true,
        // authorizer: {
        //   type: 'COGNITO_USER_POOLS',
        //   authorizerId: {
        //     Ref: 'UserPoolApiGatewayAuthorizer'
        //   }
        // }
      },
    },
  ],
};
