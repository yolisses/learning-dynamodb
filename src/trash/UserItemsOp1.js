import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
});

const docClient = new AWS.DynamoDB.DocumentClient();

function createItem() {
  const params = {
    TableName: 'Users',
    Item: {
      id: 'quale',
      name: 'Ulisses',
      email: 'm.stunik@gmail.com',
    },
  };
  docClient.put(params, (err, data) => {
    if (err) {
      console.error(`${'Unable to add item: ' + '\n'}${JSON.stringify(err, undefined, 2)}`);
    } else {
      console.log(`${'PutItem succeeded: ' + '\n'}${JSON.stringify(data, undefined, 2)}`);
    }
  });
}

createItem();
