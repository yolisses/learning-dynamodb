import AWS from 'aws-sdk';

export async function getUser({ id }) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'Users',
    Key: {
      id,
    },
  };

  return new Promise(
    (resolve, reject) => docClient.get(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Item);
    }),
  );
}
