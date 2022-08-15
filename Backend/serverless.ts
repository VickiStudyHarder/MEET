import type { AWS } from '@serverless/typescript';

import {
  getAllMentors,
  getAllStudents,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  rateMentor,
} from '@functions/users';

import {
  create,
  remove,
  update,
  getById,
  getByUserId,
  removeNote,
  removeToDo,
  removeAgenda,
  removeRecording,
  removeMeetingAttendee
} from '@functions/meetings';

import {
  createGroup,
  joinGroup,
  leaveGroup,
  getGroupById,
  getAllGroups,
  sendMessage,
} from '@functions/groups';

import { createCalendarEvent } from '@functions/google';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    stage: 'development',
    region: 'ap-southeast-2',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // import the function via paths
  functions: {
    getAllMentors,
    getAllStudents,
    createUser,
    deleteUser,
    getUserById,
    updateUser,
    create,
    remove,
    update,
    getById,
    getByUserId,
    createCalendarEvent,
    createGroup,
    joinGroup,
    leaveGroup,
    getGroupById,
    getAllGroups,
    sendMessage,
    removeNote,
    removeToDo,
    removeAgenda,
    removeRecording,
    rateMentor,
    removeMeetingAttendee
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 4000,
    },
  },
  resources: {
    Resources: {
      UserPoolApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          AuthorizerResultTtlInSeconds: 300,
          Name: '${self:provider.stage}-user-pool-authorizer',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          IdentitySource: 'method.request.header.Authorization',
          Type: 'COGNITO_USER_POOLS',
          ProviderARNs: [
            {
              'Fn::Join': [
                '',
                [
                  'arn:aws:cognito-idp:',
                  {
                    Ref: 'AWS::Region',
                  },
                  ':',
                  {
                    Ref: 'AWS::AccountId',
                  },
                  ':userpool/',
                  {
                    Ref: 'CognitoUserPool',
                  },
                ],
              ],
            },
          ],
        },
      },
      CognitoUserPool: {
        Type: 'AWS::Cognito::UserPool',
        Properties: {
          UserPoolName: '${self:provider.stage}-user-pool',
          UsernameAttributes: ['email'],
          AutoVerifiedAttributes: ['email'],
        },
      },
      CognitoUserPoolClient: {
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: '${self:provider.stage}-user-pool-client',
          UserPoolId: {
            Ref: 'CognitoUserPool',
          },
          ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
          GenerateSecret: false,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
