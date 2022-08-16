//import schema from './schema';
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "GET",
        path: "user/{id}",
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
