import AWS from 'aws-sdk';

export async function setEmailUser({ email, id }) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'UsedEmails',
    Item: { email, id },
  };

  return new Promise(
    (resolve, reject) => docClient.put(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(params.Item);
      }
    }),
  );
}
