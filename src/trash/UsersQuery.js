import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Users',
  ExpressionAttributeNames: {
      ''
  },
  ExpressionAttributeValues: {
      ''
  },
};

docClient.query(params, (err, data) => {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
  } else {
    console.log('Query succeeded.');
    data.Items.forEach((item) => {
      console.log(' -', `${item.year}: ${item.title}`);
    });
  }
});
