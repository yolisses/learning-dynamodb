import AWS from 'aws-sdk';

export async function getAllPlants() {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'Plants',
  };

  return new Promise(
    (resolve, reject) => docClient.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Items);
    }),
  );
}
