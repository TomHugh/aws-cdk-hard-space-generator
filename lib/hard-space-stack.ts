import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HardSpaceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'HardSpaceApi', {
      restApiName: "Hard Space API",
    });

    const hardSpaceLambda = new NodejsFunction(this, 'HardSpaceLambda', {
      entry: './src/hardSpace.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_18_X,
    });

    const processText = api.root.addResource('process');
    const processTextIntegration = new LambdaIntegration(hardSpaceLambda);

    processText.addMethod('POST', processTextIntegration);
  }
}
