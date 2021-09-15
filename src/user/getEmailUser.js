import AWS from 'aws-sdk';

export async function getEmailUser({ email }) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'UsedEmails',
    Key: {
      email,
    },
  };

  return new Promise(
    (resolve, reject) => docClient.get(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Item);
    }),
  );
}
