import { StackContext } from '@serverless-stack/resources';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

export function Network({ stack, app }: StackContext) {
  const vpc = new Vpc(stack, app.logicalPrefixedName('net'), { natGateways: 1 });
  // const vpc = Vpc.fromLookup(stack, "vpc-08a1dceaa4a56c61b", { vpcId: 'vpc-08a1dceaa4a56c61b' })
  const defaultLambdaSecurityGroup = new SecurityGroup(stack, 'DefaultLambda', {
    vpc,
    description: 'Default security group for lambda functions',
  });
  app.setDefaultFunctionProps({
    vpc,
    securityGroups: [defaultLambdaSecurityGroup],
  });

  return { vpc, defaultLambdaSecurityGroup };
}
