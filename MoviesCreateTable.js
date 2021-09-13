import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
});

const dynamodb = new AWS.DynamoDB();

function createMovies() {
  const params = {
    TableName: 'Movies',
    KeySchema: [
      { AttributeName: 'year', KeyType: 'HASH' },
      { AttributeName: 'title', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'year', AttributeType: 'N' },
      { AttributeName: 'title', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.log(`${'Unable to create table: ' + '\n'}${JSON.stringify(err, undefined, 2)}`);
    } else {
      console.log(`${'Created table: ' + '\n'}${JSON.stringify(data, undefined, 2)}`);
    }
  });
}

createMovies();
