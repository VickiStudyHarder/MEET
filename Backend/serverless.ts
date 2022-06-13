import type { AWS } from '@serverless/typescript';

import {endpoint1, endpoint2 } from '@functions/authentication';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
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
    },
  },
  // import the function via paths
  functions: { endpoint1, endpoint2 },
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
  },
  resources: {
    Resources: {
      UserPoolApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
            AuthorizerResultTtlInSeconds: 300,
            Name: '${self:provider.stage}-user-pool-authorizer', 
            RestApiId: {
              Ref: 'ApiGatewayRestApi'
            },
            IdentitySource: 'method.request.header.Authorization',
            Type: 'COGNITO_USER_POOLS',
            "ProviderARNs": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:aws:cognito-idp:",
                    {
                      "Ref": "AWS::Region"
                    },
                    ":",
                    {
                      "Ref": "AWS::AccountId"
                    },
                    ":userpool/",
                    {
                      "Ref": "CognitoUserPool"
                    },
                  ]
                ]
              }
            ],
        }
      },
      CognitoUserPool: { 
        Type: 'AWS::Cognito::UserPool',
        Properties : {
          UserPoolName: '${self:provider.stage}-user-pool',
          UsernameAttributes: ['email'],
          AutoVerifiedAttributes: ['email']
          }
      },
      CognitoUserPoolClient:{
        Type: 'AWS::Cognito::UserPoolClient',
        Properties: {
          ClientName: '${self:provider.stage}-user-pool-client',
            UserPoolId: {
              Ref: 'CognitoUserPool'
            },
            ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH'],
            GenerateSecret: false
        },
      },
    },
  }
};

module.exports = serverlessConfiguration;
