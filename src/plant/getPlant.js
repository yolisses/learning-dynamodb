import AWS from 'aws-sdk';

export async function getPlant({ id }) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'Plants',
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
