import AWS from 'aws-sdk';

export function configureAWS() {
  AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
  });
}
