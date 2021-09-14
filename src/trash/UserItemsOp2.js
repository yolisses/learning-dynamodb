import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

const table = 'Users';

const id = 'quale';

const params = {
  TableName: table,
  Key: {
    id,
  },
};

docClient.get(params, (err, data) => {
  if (err) {
    console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
  }
});
